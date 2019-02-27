<template>
<div>
    <!-- <Button type="info" ghost>添加话题</Button> -->
    <Button type="info" ghost @click="judgeLanding()" >添加话题</Button>
    <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="topicData" label-width:80px >
            <FormItem prop="topic_name" label="标题">
                <Input type="text" v-model="topicData.topic_name" placeholder="标题">
                </Input>
            </FormItem>
            <FormItem prop="topic_content" label="内容">
                <Input type="textarea" v-model="topicData.topic_content"  placeholder="内容"></Input>
            </FormItem>
        </Form>
    </Modal>
    <!-- @on-row-click="rowClick" -->
    <Table :columns="columns10" :data="data9" :style="{height:'100%',overflow: 'hidden'}"  ></Table>
</div>
</template>
<script>
    import expandRow from './table-expand.vue';
    export default {
        components: { expandRow },
        data () {
            return {
                nickname:'',
                columns10: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '标题',
                        key: 'topic_name'
                    },
                    {
                        title: '博主',
                        key: 'posted_name'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width:100,
                        align:'center',
                        render:(h,params) =>{
                            return h('div',[
                                h('Button',{
                                    props:{
                                        type:'primary',
                                        size:'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click: () => {
                                            this.rowClick(params.row)
                                        }
                                    }
                                },'查看')
                            ])
                        }
                    },
                ],
                data9: [],
                modal1: false,
                topicData:{}
            }
        },
        methods:{
            getTableData(){
                this.$http.get('/api/topicAll')
                .then((res)=>{
                    if (res.data.err_code==0) {
                        alert(res.data.message)
                    }if (res.data.err_code==1) {
                        this.data9=res.data.data
                    }
                })
            },
            ok () {
                if (!this.$route.query.nickname) {
                    this.$Message.info('请登录后发表评论！');
                }else if (this.$route.query.nickname) {
                    this.topicData.posted_name=this.$route.query.nickname
                    var myDate = new Date();
                    var time = myDate.toLocaleDateString().replace(/\//g,"-")+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()
                    this.topicData.posted_time =time
                    this.$http.post('/api/insertTopic',this.topicData)
                    .then((res)=>{
                        location. reload()
                    })   
                }
                
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            rowClick (data) {
                console.log(data)
                this.$router.push({name:'comment',params:data,query:this.$route.query.nickname})
            },
            judgeLanding (){
                if (!this.$route.query.nickname) {
                    console.log(this.$route.query.nickname)
                    this.$Message.info('请登录后再发表话题');
                }else if(this.$route.query.nickname){
                    modal1 = true
                }
            }

        },
        mounted(){
            this.getTableData()
        }
    }
</script>
<style scoped>

</style>

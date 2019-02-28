<template>
<div>
    <Button type="info" ghost @click="modal1 = true;getStatus(1)" >添加话题</Button>
    <Modal
        v-model="modal1"
        title="话题"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="topicData" label-width:80px >
            <FormItem prop="topic_name" label="标题">
                <Input type="text" v-model="topicData.topic_name" :prop="topicData.topic_name" placeholder="标题">
                </Input>
            </FormItem>
            <FormItem prop="topic_content" label="内容">
                <Input type="textarea" v-model="topicData.topic_content" :prop="topicData.topic_content"  placeholder="内容"></Input>
            </FormItem>
        </Form>
    </Modal>
    <Table :columns="columns10" :data="data9" :style="{height:'100%',overflow: 'hidden'}"></Table>
</div>
</template>
<script>
    import expandRow from './table-expand.vue';
    import mixinJs from '../mixins/mixinsJs'
    export default {
        mixins:[mixinJs],
        components: { expandRow },
        data () {
            return {
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
                        title: '时间',
                        key: 'posted_time'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.getStatus(2)
                                            this.topicData.posted_name =this.data9[params.index].posted_name
                                            this.topicData.topic_name = this.data9[params.index].topic_name
                                            this.topicData.topic_content = this.data9[params.index].topic_content
                                            this.modal1 = true;
                                            this.getRow(params.row.topic_id,params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style:{
                                       marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.topic_id,params.index)
                                        }
                                    }
                                }, '删除'),
                                h('Button',{
                                    props:{
                                        type:'primary',
                                        size:'small'
                                    },
                                    style:{
                                       marginRight: '5px'
                                    },
                                    on:{
                                        click: () => {
                                            this.rowClick(params.row)
                                        }
                                    }
                                },'查看')
                            ]);
                        }
                    }
                ],
                data9: [],
                modal1: false,
                status: 0,
                topicData:{
                    topic_name:'',
                    topic_content:'',
                    posted_name:'',
                    posted_time:''
                },
                nickname:'',
                edit_id:'',
                edit_no:Number,
                topic_id:Number
            }
        },
        methods:{
            getRow(topic_id,index) {
                this.edit_no = index
                this.topic_id = topic_id
            },
            getStatus(index) {
                this.status =index
            },
            getTableData(){
              this.$http.post('/api/topicByNickname',{nickname:this.nickname})
              .then((res)=>{
                if (res.data.err_code==0) {
                  alert(res.data.message)
                }if (res.data.err_code==1) {
                  this.data9=res.data.data
                }
              })
            },
            ok () {
                if (this.status==1) {
                    this.$Message.info('Clicked ok');
                    this.topicData.posted_name=this.$route.query.nickname
                    this.topicData.posted_time =this.getDateTime()
                    this.$http.post('/api/insertTopic',this.topicData)
                    .then((res)=>{
                        location. reload()
                    })
                }else if (this.status==2) {
                    this.edit()
                }
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            remove (id,index) {
                this.$http.post('/api/deleteById',{id})
                .then((res) => {
                    if (res.data.err_code==0) {
                        this.$Message.info('Clicked cancel');
                    } else if(res.data.err_code==1) {
                        this.$Message.info('删除成功');
                        this.data9.splice(index, 1);
                    }
                })

            },
            edit () {
                var editData = this.topicData
                editData.topic_id = this.topic_id
                this.topicData.posted_time = this.getDateTime()
                this.$http.post('/api/editById',editData)
                .then((res) => {
                    if (res.err_code == 0) {
                        this.$Message.info(res.data.message)
                    } else if (res.err_code == 1) {
                        location. reload()
                        this.data9.slice(index,1)
                        console.log(this.data9)
                        this.$Message.info(res.data.message)
                    }
                })
            },
            rowClick (data) {
                this.$router.push({name:'comment',params:data,query:this.$route.query.nickname})
            },
            // judgeLanding (){
            //     if (!this.$route.query.nickname) {
            //         this.$Message.info('请先登陆,再查看个人话题');
            //         this.$router.push('/login')     
            //     }
            //     if (this.$route.query.nickname) {
            //         this.getTableData()
            //     }
            // }

        },
        mounted(){ 
          this.nickname= this.$route.query.nickname      
          this.judgeLanding(this.nickname,this.getTableData)
        }
    }
</script>
<style scoped>

</style>

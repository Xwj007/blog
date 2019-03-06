<template>
<div id="box">
  <Row type="flex" justify="center" class="code-row-bg">
    <Col >
      <h1>{{topicData.topic_name}}</h1>
    </Col>
    <Col span="24">
      <div style="float:right;">
        <span>作者：{{topicData.posted_name}}</span><br>
        <span>时间：{{topicData.posted_time}}</span>          
      </div>
    </Col>
  </Row>
  <Row  type="flex" justify="center" class="code-row-bg">
    <Col span="18">
    <br>
      {{topicData.topic_content}}
    </Col>
  </Row> 
  <Row  type="flex" justify="center" class="code-row-bg">
    <Col span="18">
    <br>
    <ul>
      <li id="comment" v-for="(item,index) in commentList"  :key="index">
        <span >` {{item.nickname}} ` ：</span><span>{{item.content}}</span><span style="float:right">{{item.time}}</span><br>
      </li>
    </ul>
    </Col>
  </Row>
  <Row  type="flex" justify="center" class="code-row-bg">
    <Col span="18">
    <br>
      <Form label-position="left" inline>
        <FormItem v-if="false">
          <Input type="text" v-model="commentData.nickname" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem  v-if="false">
          <Input type="text" v-model="commentData.time" placeholder="请输入时间"></Input>
        </FormItem>
          <FormItem>
          <Input style="width:600px" type="text" v-model="commentData.content" placeholder="请输入评论"></Input>
        </FormItem>
        <FormItem>
          <Button type="info" ghost style="float:left" @click="addComment">发表评论</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
  
</div>

</template>
<script>
import mixinJs from '../mixins/mixinsJs'
export default {
  mixins:[mixinJs],
  data () {
    return {
      topicData:{},
      commentList:[],
      commentData:{
        nickname:'',
        content:'',
        time:'',
        topic_no:''
      }
    }
  },
  methods:{
    getTopicNo() {
      this.topicData = this.$route.params
    },
    getComments () {
      var topic_no = this.topicData.topic_id
      this.$http.get('/api/getComentsById',{params:{topic_no:topic_no}})
      .then((res)=>{
        if (res.data.err_code==0) {
          this.$Message.error('获取失败')
        }if (res.data.err_code==1) {
          this.$Message.success('获取成功')
          this.commentList = res.data.data
        }
      })
    },
    addComment () {
      if (!this.$route.query) {
        alert(this.$route.query)
        this.$Message.info('请登录后发表评论！')
      }else if(this.$route.query){       
        this.commentData.nickname = this.$route.query
        console.log(this.$route.query.nickname)
        this.getDataTime()
        this.commentData.topic_no = this.topicData.topic_id
        console.log(this.commentData)
        this.$http.post('/api/addComment',this.commentData)
        .then((res)=>{
          if (res.data.err_code==0) {
            this.$Message.error('获取失败')
          }if (res.data.err_code==1) {
            this.$Message.success('获取成功')
            location. reload()
          }
        })
      }

    },
    getDataTime() {
      var myDate = new Date();
      this.commentData.time = myDate.toLocaleDateString().replace(/\//g,"-")+" "+myDate.getHours()+":"+myDate.getMinutes()
    }
  },
  mounted() {
    this.getTopicNo()
    this.getComments()
  }
}
</script>
<style lang="scss">
#box{
  #comment{
    border: 1px solid 	#F8F8F8;
    margin: 8px;
    padding: 5px;
    box-shadow: 2px 2px 9px #E8E8E8;
  }
  ul li{
    list-style-type:none;
  }

}
</style>

<template>
<div>
<Row type="flex" justify="center" class="code-row-bg">
  <Col :span="8">
      <router-link to="/main/topic">首页</router-link>
      <router-link to="/login">登陆</router-link>
  </Col>
</Row>
<Row type="flex" justify="center" class="code-row-bg">
  <Col span="3"> <h1>注册 </h1></Col>
</Row>
  <Row type="flex" justify="center" class="code-row-bg">
    <Col span="8">
      <Form ref="formLeft" :model="formLeft" label-position="left" :rules="ruleInline" :label-width="100">
        <FormItem prop="email" label="邮箱">
          <Input v-model="formLeft.email">  </Input>
        </FormItem>
        <FormItem prop="nickname" label="昵称">
          <Input v-model="formLeft.nickname"> </Input>
        </FormItem>
        <FormItem prop="password1" label="密码">
          <Input type="password" v-model="formLeft.password1"></Input>
        </FormItem>
        <FormItem prop="password2" label="确认密码">
          <Input type="password" v-model="formLeft.password2"></Input>
        </FormItem>
        <FormItem prop="created_time" v-if="false">
          <Input type="password" v-model="formLeft.created_time"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formLeft')">提交</Button>
          <Button @click="handleReset('formLeft')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>  
</div>
</template>
<script>
export default {
  data () {
    return {
      formLeft: {
        email: '',
        nickname:'',
        password1: '',
        psaaword2: '',
        created_time:''
      },
      ruleInline:{
        email: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],        
        password1: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 4, message: 'The password length cannot be less than 4 bits', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 4, message: 'The password length cannot be less than 4 bits', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formLeft.password1!= this.formLeft.password2) {
            this.$Message.error('密码不一致')
          }else{
            this.getDataTime()
            this.$http.post('/api/register', {email:this.formLeft.email,nickname:this.formLeft.nickname,password:this.formLeft.password2,created_time:this.formLeft.created_time})
            .then((res)=>{
              if (res.data.err_code == 0) {
                this.$Message.error('邮箱已存在')
              }else if(res.data.err_code == 3){
                this.$Message.error('昵称已存在')
              }else if(res.data.err_code == 1){
                this.$Message.success('注册成功')
                this.$router.push({name:'Main',query:{nickname:res.data.session}});
              }
            })
          }
        } else {
            this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    getDataTime() {
      var myDate = new Date();
      this.formLeft.created_time = myDate.toLocaleDateString().replace(/\//g,"-")+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()
    }
  },
}
</script>
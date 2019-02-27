<template>
<div>
    <Row type="flex" justify="center" class="code-row-bg">
        <Col :span="8">
            <router-link to="/main">首页</router-link>
            <router-link to="/register">注册</router-link>
        </Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg">
        <Col span="" style="text-align:center"> <h1>登陆 </h1></Col>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg" id="login">
        <Col span="8">
        <!-- <input type="text" v-model="datas"> -->
          <Form ref="formInline" :model="formInline" :rules="ruleInline"  label-position="right" :label-width="100">
              <FormItem prop="email">
                  <Input type="text" v-model="formInline.email" placeholder="email">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem prop="password">
                  <Input type="password" v-model="formInline.password" placeholder="Password">
                      <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
              </FormItem>
              <FormItem style="text-align:center">
                  <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
              </FormItem>
          </Form>
        </Col>
    </Row>    
</div>
</template>
<script>
// import axios from 'axios';
    export default {
        data () {
            return {
                datas:'',
                formInline: {
                    email: '',
                    password: ''
                },
                ruleInline: {
                    email: [
                        { required: true, message: 'Please fill in the email', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 4, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {                       
                         this.$http.post('/api/login',this.formInline
                         )
                            .then( (res) => {
                            if(res.data.err_code==0){
                                alert(res.data.message)
                            }else if(res.data.err_code==1){
                                this.$Message.success('Success!');
                                console.log(res.data.info.nickname)
                                this.$router.push({path:'/main',query:{nickname:res.data.info.nickname}});
                            }       
                            })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
        }
    }
</script>
<style scoped>
#login{
  margin-top: 10%
}
</style>

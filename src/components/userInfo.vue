<template>
  <div>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="20">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="id" prop="id" v-if="false">
              <Input v-model="formValidate.id" placeholder="Enter your nickname"></Input>
            </FormItem>
            <FormItem label="头像" prop="avatar" v-if="false">
              <Input v-model="formValidate.avatar" placeholder="Enter your nickname"></Input>
            </FormItem>
            <FormItem label="昵称" prop="nickname">
              <Input v-model="formValidate.nickname" placeholder="Enter your nickname"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input v-model="formValidate.email" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem label="性别" prop="gender">
                <RadioGroup v-model="formValidate.gender">
                    <Radio label="1">Male</Radio>
                    <Radio label="0">Female</Radio>
                </RadioGroup>
            </FormItem>            
            <FormItem label="生日">
                <Row>
                    <Col span="11">
                        <FormItem prop="birthday">
                            <!-- <DatePicker type="text" placeholder="Select date" v-model="formValidate.birthday"></DatePicker> -->
                            <!-- <Input type="text" placeholder="Select date" v-model="formValidate.birthday"></Input> -->
                            <DatePicker type="date" placeholder="Select date" format="yyyy-MM-dd"  @on-change="formValidate.birthday=$event"  v-model="formValidate.birthday" style="width: 200px"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="创建时间" prop="created_time">
              <Input v-model="formValidate.created_time" placeholder="你的创建时间" disabled></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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
                formValidate: {
                    email: '',
                    nickname: '',
                    password:'',
                    created_time:'',
                    avatar:'', 
                    gender: '',
                    birthday: '',
                    status:'',
                    bio:'',
                    id: '', 
                },
                ruleValidate: {
                  nickname: [
                      { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                  ],
                  email: [
                      { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                      { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                  ],
                  gender: [
                      { required: true, message: 'Please select gender', trigger: 'change' }
                  ],
                  birthday: [
                      // { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                  ],
                },
                nickname:''
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.changeInfo()
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            getInfo () {
              var nickname=this.nickname
              console.log(this.formValidate.birthday)
              this.$http.get('/api/getInfo',{params: {
                nickname:nickname
                }})
              .then((res)=>{
                    if (res.data.err_code==0) {
                        this.$Message.error('获取失败')
                    }if (res.data.err_code==1) {
                      this.$Message.success('获取成功')
                      this.formValidate.id=res.data.data.id
                      this.formValidate.avatar=res.data.data.avatar
                      this.formValidate.nickname=res.data.data.nickname
                      this.formValidate.email=res.data.data.email
                      this.formValidate.password =res.data.data.password
                      this.formValidate.created_time=res.data.data.created_time
                      this.formValidate.gender=res.data.data.gender
                      this.formValidate.birthday=res.data.data.birthday            
                      this.formValidate.status =res.data.data.status
                      this.formValidate.bio =res.data.data.bio
                      console.log(res.data.data)
                    }
                })
            },
            changeInfo() {
                console.log(this.formValidate.birthday)
              this.$http.post('/api/changeInfo',this.formValidate)
              .then((res)=>{
                console.log(res)
              })
            }
        },
        mounted(){
            this.nickname=this.$route.query.nickname
            this.judgeLanding(this.nickname,this.getInfo)
        //   this.nickname=this.$route.query.nickname
        //   if (!this.nickname) {
        //       this.$Message.info('兄弟登陆先')
        //       this.$router.push('/login')
        //   }else if(this.nickname){
        //         this.getInfo()
        //   }
          
        }
    }
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    a{
        color: rgba(255,255,255,.7);
    }
    a:hover,a:focus{
        color: #fff
    }
    .atitle{
        color: #2d8cf0!important
    }
    /* .menuitems{
        width:'200px';
    } */
</style>
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                       <Icon type="ios-menu" />
                        话题
                    </template>
                    <MenuItem name='1-1'><router-link :to="{path:'/main/topic',query:{nickname:nickname}}" ><div class="menuitems" >查看全部话题</div></router-link></MenuItem>
                    <MenuItem name="1-2"><router-link :to="{path:'/main/myTopic',query:{nickname:nickname}}" @click="getNickname"><div class="menuitems" > 查看我的话题 </div></router-link></MenuItem>                   
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                         <Icon type="ios-contact" />
                        我的                       
                    </template>
                    <MenuItem name="2-2"><router-link :to="{path:'/main/userInfo',query:{nickname:nickname}}" ><div class="menuitems" > 修改个人资料 </div></router-link></MenuItem>
                </Submenu>                
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="md-settings" />
                        系统
                    </template>
                    <MenuItem name="3-1"><div class="menuitems" @click="logout">注销账号 </div></MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',float:'right'}" v-show="disabled">
                <router-link  class="atitle"  to="/login">登陆</router-link>
                <router-link  class="atitle"  to="/register">注册 </router-link>
            </Header>
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}" v-show="!disabled">
                <h3 :style="{float:'right'}">`欢迎：{{nickname}} 访问!`</h3>
            </Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <!-- <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem> -->
                </Breadcrumb>
                <Card>
                    <div style="height:600px">
                       <router-view></router-view>
                    </div>                    
                </Card>                
            </Content>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return{
                disabled:true,
                nickname:'',
                disabled:true,
                nickname:''
            }
        },
        mounted(){     
            this.getSession()      
            this.nickname = this.$route.query.nickname
            this.$router.push({path:'/main/topic', query:{nickname:this.nickname}})                      
        },
        
        methods:{
            getNickname(){
                this.$router.push({path:'/main/myTopic', query:{nickname:this.nickname}}) 
            },
            getSession () { 
                if (this.$route.query.nickname) {
                    this.nickname = this.$route.params.nickname
                    this.disabled = false
                }
                // console.log(this.$route.params)
                // if (this.$route.params.nickname) {
                //     this.nickname = this.$route.params.nickname
                //     this.disabled = false
                // }
            },
            logout() {
                this.$http.get('/api/logout')
                .then((res)=> {
                    console.log(res.data.message)
                    this.$router.push('/login')                 
                })
            }       
        }       
    }
</script>
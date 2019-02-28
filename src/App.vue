<template>
<div id="app" style="margin:0;padding:0">
  <router-view></router-view>
</div>
    
</template>
<script>
export default {
  name: 'App',
  methods:{
    routerPushPage: function (routeName) {
      this.$router.push(routeName)
    }
  },
  mounted(){
    this.$http.get('/api/login')
    .then((res)=>{
      if (res.data.err_code ==1) {
        this.$router.push({path:'/main',query:{nickname:res.data.session}})
        // this.$router.push({path:'/main',params:{nickname:res.data.session}})
      }else if(res.data.err_code ==0){
        this.$Message.info('兄弟登陆先')
        this.routerPushPage('/login')
      }
    })
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>

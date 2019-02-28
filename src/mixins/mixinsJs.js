export default {
  methods: {
    getDateTime () {
      var myDate = new Date();
      var dateTime = myDate.toLocaleDateString().replace(/\//g,"-")+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()
      return dateTime
    },
    judgeLanding (nickname,fn) {
      var data = this.$route.query.nickname
       if (!data) {
         this.$Message.info('请登陆后再进行此操作')
         this.$router.push('/login')  
       }else if (data) {
        fn()
       }
    }
  },
}
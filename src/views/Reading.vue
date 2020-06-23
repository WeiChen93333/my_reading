<template>
  <div id="reading">
    <div id="header">    
        <div class="personal-center">
          <span class="username"
            @click="toggleMenu">{{username}}</span> 
          <ul class="menu" v-show="menuVisible">
            <!-- <li>资料夹</li> -->
            <li @click="enterSentenceCollection">句集</li>
            <li @click="logout">退出</li>
          </ul>
        </div>    
    </div>    
    <div id="desktop">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name:'MyReading',  
  data(){
    return {
      registerVisible: false,
      loginVisible: false,
      username: '',
      menuVisible: false
    }
  }, 
  created(){
    this.getUsername()
  },
  methods: {
    //获取用户名
    async getUsername(){
      const userId = window.sessionStorage.getItem('userId')
      if(userId){        
        const {data} = await this.$http('GET', '/userInfo', {params: {userId: userId}})
        this.username = data.username
      }
    },   
    //显示/隐藏个人中心菜单
    toggleMenu(){
      this.menuVisible = !this.menuVisible
    },
    //进入句集界面
    enterSentenceCollection(){
      this.$router.push('/sentence')
      this.toggleMenu()
    },
    //登出
    logout(){
      this.username = ''
      window.sessionStorage.removeItem('userId')
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#reading  
  #header  
    display flex
    justify-content flex-end
    height 40px
    padding 0 10%
    background-color lightgray
    text-align right
    .personal-center
      position relative
      width 60px
      height 100% 
      text-align center  
      .username 
        width 100%
        line-height 40px   
        color blue
        cursor pointer     
      .menu
        position absolute
        width 100%
        padding 2px 0   
        background-color white         
        li 
          height 24px
          padding 5px 10px     
          line-height 14px  
          text-align center
          cursor pointer
          &:hover
            background-color lightgray
  #desktop
    width 60%
    min-width 880px
    padding 20px
    color green  
    background-color lightblue  
    margin 0 auto 
    margin-top 5%

</style>
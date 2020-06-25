<template>
  <div id="reading">
    <div id="header">   
      <div class="manual">使用说明</div>   
      <div class="background-music">
        <iframe class="iframe"
          name="music" 
          src="http://192.168.0.107:8081/#/music"          
          frameborder="0" 
          scrolling="no"
          sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts" 
        ></iframe>
      </div>
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
import BackgourndMusic from './BackgourndMusic'
export default {
  name:'Reading',  
  data(){
    return {
      registerVisible: false,
      loginVisible: false,
      username: '',
      menuVisible: false
    }
  },
  components: {
    BackgourndMusic
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
    justify-content space-between   
    height 46px
    padding 0 10%
    background-color lightgray
    text-align center   
    .manual
      width 70px
      line-height 46px
    .background-music    
      position relative
      width 375px      
      .iframe
        position absolute
        left 0        
        bottom 0    
        width 375px
        height 677px
    .personal-center
      position relative
      width 70px      
      text-align center  
      .username 
        width 100%
        line-height 46px   
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
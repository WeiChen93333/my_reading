<template>
  <div id="my-reading">
    <div id="header">
      <span class="register"        
        @click="showRegister">注册</span>
      <div class="login">
        <span v-if="!username"       
          @click="showLogin">登录</span>
        <div class="personal-center" v-else>
          <span class="username"
            @click="toggleMenu">{{username}}</span> 
          <ul class="menu" v-show="menuVisible">
            <li>资料夹</li>
            <li @click="showSentenceCollection">句集</li>
            <li @click="logout">退出</li>
          </ul>
        </div>       
      </div>
    </div>    
  <!-- 用户注册区 -->
    <register v-if="registerVisible"       
      @hideForm="hideForm">        
    </register>
    <!-- 用户登录区 -->
    <login v-if="loginVisible"       
      @hideForm="hideForm"
      @loggedIn="loggedIn">        
    </login>
    <div id="desktop">
      <router-view/>
    </div>
    
  </div>
</template>

<script>
import Register from 'components/Register'
import Login from 'components/Login'

export default {
  name:'MyReading',
  components: {     
    Register,
    Login
  },
  data(){
    return {
      registerVisible: false,
      loginVisible: false,
      username: '',
      menuVisible: false
    }
  }, 
  created(){
    this.isLoggedIn()
  },
  methods: {
    //刷新页面后查询用户是否已经登录
    async isLoggedIn(){
      const userId = window.sessionStorage.getItem('userId')
      if(userId){        
        const {data} = await this.$http('GET', '/userInfo', {params: {userId: userId}})
        this.username = data.username
      }
    },
    //显示注册登录表单
    showRegister(){
      this.registerVisible = true     
    },     
    showLogin(){
      this.loginVisible = true        
    },
    //隐藏表单
    hideForm(){
      this.registerVisible = false
      this.loginVisible = false
    },
    //登录成功, 改变显示
    loggedIn(username){      
      this.username = username
    },
    toggleMenu(){
      this.menuVisible = !this.menuVisible
    },
    showSentenceCollection(){
      this.$router.push('/sentence')
    },
    logout(){
      this.username = ''
      window.sessionStorage.removeItem('userId')
      this.toggleMenu()
    }
  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#my-reading  
  #header  
    height 40px
    padding-right 40px
    background-color lightgray
    text-align right    
    .register, .login 
      display inline-block
      width 50px
      height 40px
      line-height 40px      
      font-size 14px
      text-align center     
      cursor pointer
    .login
      width 62px 
      // background white
      .personal-center
        position relative     
        .username 
          color blue   
        .menu
          position absolute
          padding 2px 0   
          background-color white         
          li 
            height 24px
            padding 5px 10px     
            line-height 14px  
            text-align center
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
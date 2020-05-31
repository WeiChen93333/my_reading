<template>
  <div id="my-reading">
    <div id="header">
      <span class="register"        
        @click="showRegister">注册</span>
      <div class="login">
        <span v-if="!username"       
          @click="showLogin">登录</span>
        <template v-else>
          <span class="username">{{username}}</span>
          <span class="exit"
            @click="logout">退出</span>
        </template>       
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
    <router-view/>
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
      username: ''
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
    logout(){
      this.username = ''
      window.sessionStorage.removeItem('userId')
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
      width 80px  
      .username 
        color blue    
      .exit 
        font-size 12px
        color red
        vertical-align text-top        
        margin-left 5px
  
 


</style>
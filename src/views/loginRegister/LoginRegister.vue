<template>
  <div id="login-register-container">
    <div class="login-register-box">
      <div class="header">
        <div class="title">
          <span 
            :class="['login', activeComponent == 'Login' ? 'active' : '']"
            @click="switchToLoginBox">用户登录</span>
          |
          <span 
            :class="['register', activeComponent == 'Register' ? 'active' : '']"
            @click="switchToRegisterBox">用户注册</span>
        </div>        
      </div>     
        <component 
          :is="currentComponent"
          @registerSuccess="switchToLoginBox"></component>      
    </div>
  </div>
</template>

<script>
import Login from './Login'
import Register from './Register'
export default {
  name: 'LoginRegister',
  data(){
    return {
      currentComponent: Login,
      activeComponent: 'Login'
    }
  },
  components: {
    Login,
    Register
  },
  methods: {
    switchToLoginBox(){
      this.currentComponent = Login
      this.activeComponent = 'Login'
    },
    switchToRegisterBox(){
      this.currentComponent = Register
      this.activeComponent = 'Register'
    }
  }
  
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#login-register-container
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  .login-register-box
    width 450px
    height 300px
    color black
    background-color white
    border-radius 4px
    position absolute
    top 30%
    left 50%
    transform translateX(-50%)
    .header      
      position relative
      padding 15px 15px 10px
      font-size 18px
      .title        
        font-weight 600
        .login, .register
          cursor pointer
      .active 
        color red

</style>
<template>  
  <div id="login-container" @click.self="hideForm">  
    <div class="login-box">
      <div class="header">
        <div class="title">用户登录</div>
        <button class="close-icon" @click="hideForm"><i class="iconfont icon-RectangleCopy2"></i></button>
      </div>      
      <mo-form class="login-form">
        <mo-form-item>
          <mo-input type="text" text="用户名" v-model="loginInfo.username"></mo-input>         
        </mo-form-item>
        <mo-form-item>
          <mo-input type="password" text="密码" v-model="loginInfo.password"></mo-input>        
        </mo-form-item>
        <mo-form-item>
          <p class="message">{{message}}</p>        
        </mo-form-item>           
        <mo-form-item class="button-box">         
          <mo-button type="negative" size="middle" text="重置"           
            @click.native="resetForm"></mo-button>
         <mo-button type="primary" size="middle" text="登录"           
            @click.native="login"></mo-button>
        </mo-form-item>
      </mo-form>      
    </div>    
  </div>

</template>

<script>
export default {
  name: 'Login',
  components: {},
  props: {},
  data(){
    return {
      loginInfo: {
        username: '',
        password: ''            
      },
      message: ''
    }
  },
  computed: {},
  methods: {
    hideForm(){
      this.$emit('hideForm')
    },
    resetForm(){
      this.loginInfo.username = ''
      this.loginInfo.password = ''
      this.message = ''
      
    },
    async login(){   
      const { data } = await this.$http.post('/userInfo/login', JSON.stringify(this.loginInfo))   
      if(data.message !== "success") return this.message = '用户名或密码不正确'
      this.$message.show('登录成功')
      window.sessionStorage.setItem('userId', data.userId)
      this.hideForm()      
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#login-container
  z-index 2020
  background-color rgba(0, 0, 0, .4)
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  .login-box
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
      .close-icon
        position absolute
        top 15px
        right 15px
        cursor pointer
    .login-form
      .message
        text-align center
        color red
      .button-box
        text-align right
        .login, .reset
          width 70px
          color white
          border-radius 4px
          cursor pointer          
        .login
          background-color rgb(64,158,255)        
          margin-right 10px
          &:hover
            background-color rgb(102,177,255)
        .reset
          background-color rgb(144,147,153)
          &:hover
            background-color rgb(166,169,173)
         
</style>
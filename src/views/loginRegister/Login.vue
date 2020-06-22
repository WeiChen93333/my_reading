<template>   
  <div id="login-box">       
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
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      loginInfo: {
        username: '',
        password: ''            
      },
      message: ''
    }
  },
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
      const { data } = await this.$http('POST', '/userInfo/login', this.loginInfo)   
      if(data.message !== "success") return this.message = '用户名或密码不正确'
      window.sessionStorage.setItem('userId', data.userId)     
      this.$router.push('/reading') 
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#login-box  
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
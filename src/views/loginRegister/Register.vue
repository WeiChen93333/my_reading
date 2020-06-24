<template>
  <div id="register-box">       
    <mo-form class="register-form" ref="formRef">
      <mo-form-item>
        <mo-input 
          type="text" 
          text="用户名" 
          v-model="registerInfo.username"
          @moveFocus="moveFocus"></mo-input>         
      </mo-form-item>
      <mo-form-item>
        <mo-input 
          type="password" 
          text="密码" 
          v-model="registerInfo.password"
          @moveFocus="moveFocus"></mo-input>        
      </mo-form-item>
      <mo-form-item>
        <mo-input 
          type="password" 
          text="确认密码" 
          v-model="registerInfo.passwordConfirm"></mo-input>        
      </mo-form-item>
      <mo-form-item class="button-box">         
        <mo-button type="primary" size="wider" text="提交注册"           
          @click.native="register"></mo-button>
      </mo-form-item>
    </mo-form>      
  </div>    
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data(){
    return {
      registerInfo: {
        username: '',
        password: '',
        passwordConfirm: '',      
      }
    }
  },
  methods: {
    hideForm(){
      this.$emit('hideForm')
    },
    async register(){      
      const { data } = await this.$http('POST', '/userInfo/register', this.registerInfo)
      const message = "恭喜您注册成功!"
      if(data.message == 'success') this.$message.show(message)
      setTimeout(()=>{
        this.$emit('registerSuccess')
      }, 1000)   
    },
    moveFocus(){
      this.$moveFocus()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#register-box
  .register-form 
    .button-box       
      text-align center
</style>
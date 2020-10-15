<template>
  <div id="register-box">       
    <mo-form class="register-form" ref="formRef">
      <mo-form-item :warning="warnings.username">
        <mo-input 
          class="test"
          type="text" 
          text="用户名" 
          v-model="registerInfo.username"          
          @typingFinished="typingFinished($event, 'username')"></mo-input>         
      </mo-form-item>
      <mo-form-item :warning="warnings.password">
        <mo-input 
          type="password" 
          text="密码" 
          v-model="registerInfo.password"         
          @typingFinished="typingFinished($event, 'password')"></mo-input>        
      </mo-form-item>
      <mo-form-item :warning="warnings.passwordConfirm">
        <mo-input 
          type="password" 
          text="确认密码" 
          v-model="registerInfo.passwordConfirm"
          @typingFinished="typingFinished($event, 'passwordConfirm')"></mo-input>        
      </mo-form-item>
      <mo-form-item 
        class="button-box"
        :warning="warnings.register">         
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
      //注册信息
      registerInfo: {
        username: '',
        password: '',
        passwordConfirm: '',      
      },
      //警告信息
      warnings: {
        username: '',
        password: '',
        passwordConfirm: '',
        register: '',
        pass: 0
      }
    }
  }, 
  methods: {   
    typingFinished(payload, userDefined){ // payload 为输入框事件对象     
      //按下 Enter 键或鼠标移出输入框后, 进行合规验证         
        
      const {username, password, passwordConfirm} = this.registerInfo
      switch(userDefined){        
        case 'username':
          if(!username) return this.warnings.username = '用户名不能为空'
          const reg1 = /^[A-Za-z]{1,10}$/        
          const result1 = reg1.test(username)    
          if(!result1) return this.warnings.username = '用户名须为十个以内英文字符'
          this.warnings.username = '用户名验证通过'  
          this.warnings.pass = 1          
          break
        case 'password':          
          if(!password) return this.warnings.password = '用户密码不能为空'
          const reg2 = /^\d+$/
          const result2 = reg2.test(password) 
          if(!result2) return this.warnings.password = '用户密码只能为数字'
          this.warnings.password = '用户密码验证通过'
          this.warnings.pass = 2         
          break 
        case 'passwordConfirm':
          if(!password) return this.warnings.passwordConfirm = '请先输入密码'
          if(passwordConfirm !== password) 
            return this.warnings.passwordConfirm = '两次输入密码不一致'
            this.warnings.passwordConfirm = '确认密码验证通过'
            this.warnings.pass = 3  
          break      
      }

      //验证成功, 如果是 Enter 事件就切换焦点到下一个输入框     
      if(payload.type === 'keyup') this.$moveFocus()
    },
    async register(){         
      if(this.warnings.pass !== 3) return  
      const { data } = await this.$http('POST', '/userInfo/register', this.registerInfo) 
      const message = '恭喜您注册成功!'
      if(data.message == 'success'){
        this.$message.show(message)
      }else{
        this.warnings.register = '用户名已存在, 注册失败'
        return
      }     
      setTimeout(()=>{
        this.$emit('registerSuccess')
      }, 1000)   
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
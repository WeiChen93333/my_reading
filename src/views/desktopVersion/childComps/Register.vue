<template>  
  <div id="register-container" @click.self="hideForm">  
    <div class="register-box">
      <div class="header">
        <div class="title">用户注册</div>
        <button class="close-icon" @click="hideForm"><i class="iconfont icon-RectangleCopy2"></i></button>
      </div>      
      <mo-form class="register-form">
        <mo-form-item>
          <mo-input type="text" text="用户名" v-model="registerInfo.username"></mo-input>         
        </mo-form-item>
        <mo-form-item>
          <mo-input type="password" text="密码" v-model="registerInfo.password"></mo-input>        
        </mo-form-item>
        <mo-form-item>
          <mo-input type="password" text="确认密码" v-model="registerInfo.passwordConfirm"></mo-input>        
        </mo-form-item>
        <mo-form-item class="button-box">         
          <mo-button type="primary" size="wider" text="提交注册"           
            @click.native="submitRegister"></mo-button>
        </mo-form-item>
      </mo-form>      
    </div>    
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
  computed: {},
  methods: {
    hideForm(){
      this.$emit('hideForm')
    },
    submitRegister(){      
      this.$http.post('/userInfo', JSON.stringify(this.registerInfo))
      this.hideForm()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#register-container
  z-index 2020
  background-color rgba(0, 0, 0, .4)
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  .register-box
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
    .register-form 
      .button-box
        width 100%
        height 32px
        margin-bottom 20px
        text-align center
</style>
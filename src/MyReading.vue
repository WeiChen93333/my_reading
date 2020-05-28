<template>
  <div id="my-reading">
    <div id="header">
      <span class="desktop" 
        :class="{active: isActive == 'desktop'}"
        @click="showRegister">注册</span>
      <span class="mobile" 
        :class="{active: isActive == 'mobile'}"
        @click="showLoginBox">登录</span>
    </div>    
  <!-- 用户注册区 -->
    <register v-if="registerVisible"       
      @hideForm="hideForm">        
    </register>
    <!-- 用户登录区 -->
    <login v-if="loginVisible"       
      @hideForm="hideForm">        
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
      isActive: 'desktop',
      //注册登录表单
      registerVisible: false,
      loginVisible: false,
    }
  },
  methods: {
    //显示注册登录表单
    showRegister(){
      this.registerVisible = true     
    },     
    showLoginBox(){
      this.loginVisible = true        
    },
    //隐藏表单
    hideForm(){
      this.registerVisible = false
      this.loginVisible = false
    }   
  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#my-reading
  overflow hidden
  overflow-x auto
  #header  
    height 40px
    padding-right 40px
    background-color lightgray
    text-align right
    .desktop, .mobile 
      display inline-block
      width 80px
      height 40px
      line-height 40px
      font-size 14px
      cursor pointer
    .active 
      color blue
 


</style>
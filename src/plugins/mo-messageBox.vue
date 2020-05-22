<template>
  <div class="mo-message-box-container" v-if="confirmBoxVisible" @click.self="clickToCancel">  
    <div class="message-box">
      <div class="header">
        <div class="title">{{type}}</div>
        <button class="close-icon" @click="clickToCancel"><i class="iconfont icon-RectangleCopy2"></i></button>
      </div>
      <div class="content">{{message}}</div>
      <div class="footer">
        <mo-button type="negative" size="small" text="取消"           
          @click.native="clickToCancel"></mo-button>
        <mo-button type="primary" size="small" text="确认"           
          @click.native="clickToConfirm"></mo-button>
      </div>
    </div>    
  </div>
</template>
<script>
export default {
  name:'MoMessageBox', 
  data(){
    return {
      confirmBoxVisible: false,
      type: '',
      message: '',      
      promiseStatus: null
    }
  },
  methods:{
    showConfirmBox(message, type){
      this.type = type;
      this.message = message;
      this.confirmBoxVisible = true
      const p = new Promise((resolve, reject) => {     
        this.promiseStatus = {resolve, reject}        
      })  
      return p
    },
    clickToCancel(){      
      this.confirmBoxVisible = false
      this.promiseStatus && this.promiseStatus.reject('cancel')
    },
    clickToConfirm(){       
      this.confirmBoxVisible = false    
      this.promiseStatus && this.promiseStatus.resolve('confirm')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-message-box-container
  z-index 2020
  background-color rgba(0, 0, 0, .4)
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  .message-box
    width 420px
    height 140px
    padding-bottom 10px
    border-radius 4px
    background-color white
    position absolute
    top 30%
    left 50%
    transform translateX(-50%)
    .header      
      position relative
      padding 15px 15px 10px
      font-size 18px
      .close-icon
        position absolute
        top 15px
        right 15px
        cursor pointer
    .content
      padding 10px 15px
      color #606266
      font-size 14px
    .footer
      width 100%      
      padding 5px 15px 0
      text-align right
</style>
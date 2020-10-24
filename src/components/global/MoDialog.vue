<template>
  <div class="mo-dialog-wrapper"
    v-if="isShow"
    @click.self="hideDialog">
    <div class="mo-dialog">
      <div class="title"><span>{{title}}</span></div>
      <div class="main">
        <form class="form"> 
          <div class="form-item"><slot name="form-item--1"></slot></div>        
          <div class="form-item"><slot name="form-item--2"></slot></div>        
          <div class="form-item"><slot name="form-item--3"></slot></div>        
          <div class="form-item"><slot name="form-item--4"></slot></div>        
        </form>
      </div>
      <div class="footer">
        <button class="cancel"  @click="cancelAdd">取消</button>
        <button class="confirm" @click="confirmAdd">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'MoDialog',
  props: ['showAddDialog', 'title', 'addUserForm'],
  data(){
    return {
      isShow: this.showAddDialog
    }
  },
  watch: {
    showAddDialog(){
      this.isShow = this.showAddDialog
    }
  },
  methods: {
    //点击Dialog外区域对话框消失
    hideDialog(){
      this.isShow = false
      this.$emit('showAddDialog', false)      
    },
    cancelAdd(){
      this.isShow = false
      this.$emit('showAddDialog', false)
    },
    async confirmAdd(){
      this.isShow = false
      this.$emit('showAddDialog', false) 
      const {data: res} = await this.$http.post('users', this.addUserForm)           
      if(res.meta.status !== 201) return this.$message.show("添加用户失败")
      this.$message.show("添加用户成功")
      this.$emit('addComplete')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~assets/css/mixin.stylus'
.mo-dialog-wrapper
  width 100%
  height 100%
  position fixed
  top 0 
  left 0
  z-index 999
  background-color rgba(0, 0, 0, .5)    
  .mo-dialog
    width 50%    
    margin 90px auto 0
    border-radius 2px
    background-color white    
    position relative    
    box-shadow 0 0 2px  
    z-index 1000  
    .title     
      padding 20px 20px 10px
      font-size 18px
    .main
      padding 30px 20px
      .form-item
        height 40px
        color: #606266
        margin-bottom 20px
        display flex
        & :first-child
          width 100px
          padding-right 12px
          font-size 14px
          text-align right
          vertical-align bottom
          line-height 40px
          flex-shrink 0
        & :last-child
          input-box()
          padding-left  15px
          color: #606266 
          border-radius 2px
          flex 1                   
    .footer
      width 100%
      height 70px
      padding 10px 20px 20px
      display flex
      justify-content flex-end    
      .cancel, .confirm
        width 74px
        cursor pointer
      .cancel      
        color #606266
        border 1px solid #DCDFE6
        margin-right 10px
        &:hover
          color #409EFF
          border-color #c6e2ff
          background-color #ecf5ff
      .confirm
        color white
        background-color rgb(64,158,255)      
        &:hover
          background-color rgb(102,177,255)

</style>
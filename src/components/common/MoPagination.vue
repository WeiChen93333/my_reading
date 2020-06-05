<template>
  <div id="mo-pagination">
    <div v-if="total" class="total">共 {{total}} 条</div>
    <div class="size-choice">
      <input type="text" readonly
        class="current-size"
        :value="selectedSize"
        @click="toggleSizeBox">
      <ul class="size-box" v-if="sizeBoxVisible">
        <li class="size"
          :class="{selected: item == pageInfo.pagesize}"
          v-for="(item, index) in sizes" :key="index"
          @click="changePageSize(item)">{{item + '条/页'}}</li>
      </ul>
    </div>        
    <div class="button-box">
      <button class="prev" @click="goPrevPage"><i class="iconfont icon-back"></i></button>
      <button class="next" @click="goNextPage"><i class="iconfont icon-next"></i></button>
    </div>
  </div>
</template>
<script>
export default {
  name:'MoPagination',  
  props: {
    pageInfo: Object,
    total: Number,
    sizes: Array
  },
  data(){
    return {      
      selectedSize: this.pageInfo.pagesize + '条/页',
      sizeBoxVisible: false           
    }
  },
  methods:{   
    //显示隐藏 size (每页显示条数) 选择框
    toggleSizeBox(){
      this.sizeBoxVisible = !this.sizeBoxVisible  
    },
    //改变 size
    changePageSize(size){
      this.selectedSize = size + '条/页'     
      this.$set(this.pageInfo, 'pagesize', size)  
      this.toggleSizeBox()      
    },  
    //前后翻页
    goPrevPage(){  
      this.$set(this.pageInfo, 'pagenum', --this.pageInfo.pagenum)     
    },
    goNextPage(){
      this.$set(this.pageInfo, 'pagenum', ++this.pageInfo.pagenum)    
    }
  },  
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#mo-pagination
  display flex
  justify-content space-around
  width 100%
  height 25px 
  .total 
    flex 0 0 10% 
    text-align center
    line-height 25px
    color #808080       
  .size-choice   
    text-align center
    flex 0 0 25%
    color #808080 
    .current-size 
      width 100%
      height 100%       
      border 1px solid #DCDFE6
      border-radius 3px   
      text-align center    
      user-select none
      cursor pointer
      &:hover       
        border-color #409eff 
      &:focus
        border-color #409eff    
    .size-box
      padding 3px 12px
      border 1px solid #409eff
      border-top none        
      background-color white
      .size 
        height 25px 
        line-height 25px  
        border-radius 10px   
        cursor pointer
        &:hover 
          background-color lightgray
        &.selected
          color #409eff     
  .button-box 
    flex 0 0 50% 
    display flex 
    justify-content space-around
    button      
      background white
      cursor pointer
      .iconfont    
        font-size 22px

     
  

</style>
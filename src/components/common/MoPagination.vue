<template>
  <div class="mo-pagination">
    <select class="sizes"
      :class="{focused: isfocused}"       
      @focus="isfocused=true"
      @blur="isfocused = false" 
      @click="handlePageSize($event.currentTarget.value)"    
      >
      <option>5条/页</option>
      <option selected>6条/页</option>
      <option>7条/页</option>
      <option>8条/页</option>
    </select>          
    <div class="button-box">
      <button class="prev" @click="goPrevPage"><i class="iconfont icon-back"></i></button>
      <button class="next" @click="goNextPage"><i class="iconfont icon-next"></i></button>
    </div>
  </div>
</template>
<script>
export default {
  name:'MoPagination',
  model: {
    prop: 'value',
    event: 'change'
  },
  props:{   
    value: String,
    total: Number,
    pageSize: String    
  },
  data(){
    return {      
      isfocused: false,
      currentPage: parseInt(this.value)
    }
  },
  watch: {
    value(){
      this.currentPage = parseInt(this.value)
    }
  },
  methods:{
    //页码选择
    handleCurrentPage(page){      
      this.currentPage = page;
      let currentPage = page + '';
      this.$emit('changeCurrentPage', currentPage)      
    },
    //每页展示内容多少选择
    handlePageSize(value){      
      this.$emit('changePageSize', value)       
    }
  },  
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-pagination
  height 25px
  color #909399
  margin-top 15px
  padding 0 5px
  display flex
  align-items center
  .sizes
    margin 0 20px
    width 110px
    &.focused
      border 1px solid rgb(102,177,255)
  .pages
    display flex     
    .page
      margin 0 10px
      width 15px
      font-weight 700
      text-align center
      cursor pointer
      &.active
        color rgb(102,177,255)
  .target-page
    width 30px
    text-align center
</style>
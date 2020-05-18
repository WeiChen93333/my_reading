<template>
  <div class="mo-table">
    <div class="table-head-wrapper">
      <table>
        <thead> 
          <tr class="head-row">
            <th v-for="(item, index) in headText"
            :key="index"
            :class="'column_' + index">{{item}}</th>
          </tr>               
        </thead>
      </table>
    </div>
    <div class="table-body-wrapper">
      <table>
        <tbody>      
          <template v-if v-for="(item, i1) in allData">
            <tr class="body-row">          
            <slot name="ordinary" :row="item" :index="i1 + 1"></slot>                       
            </tr> 
            <tr class="body-row" v-show="false" ref="expandedRow">
              <slot name="expand" :row="item"></slot> 
            </tr>
          </template>                               
        </tbody>
      </table>
    </div>
    
  
  </div>
</template>

<script>
export default {
  name:'MoTable', 
  data(){
    return {
      expandedRow: []
    }
  },  
  props:{
    //数据
    headText: Array,
    allData: Array,    
    //属性-是否有展开列
    expand: Boolean,
    currentIndex: Number
  },
  updated(){ 
    this.expandedRow = this.$refs.expandedRow

  },
  computed: {
    //根据是否有展开列调整数据
    // adjustedData(){
    //   if(!this.expand) return this.allData  
    //   let number = this.allData.length
    //   let arr = []    
    //   for(var r=0; r < number; r++){
    //     arr.push(this.allData[r])
    //     arr.push(this.allData[r])
    //   } 
    //   //这里也存在问题, 之前是用this.allData.length陷入死循环, 
    //   //这里既然数组一直在变, 自然没有办法得到正确的重复结果     
    //   console.log(arr)
    //   return arr    
    // }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-table
  table
    width 100%
    .head-row, .body-row
      width 100%
      // &:nth-child(even)
      //   background rgb(245,247,250)
      th, td
        width 250px
        padding 12px 0 12px 10px
        text-align left
        color #909399
        border: 1px solid lightgray
        border-bottom none
        &:first-child
          width 48px     
      td           
        color #606266
        border: 1px solid lightgray
  
</style>
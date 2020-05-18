<template>
  <ul class="mo-catalogue">
    <li v-for="(item, index) in headlines" :key="index"><a :href="'#' + item" @click="jumpTo(item)">{{item}}</a></li>    
  </ul>
</template>

<script>
export default {
  name:'MoCatalogue',
  components:{},
  props:{
    headlines: {
      type: Array
    }
  },
  data(){
    return {
    }
  },
  computed:{},
  methods:{
    jumpTo(item){
      this.$emit('clickedItem', item)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.mo-catalogue
  width 300px
  display flex  
  flex-wrap wrap
  justify-content flex-end
  position fixed
  top 160px
  right 60px
  li
    flex-shrink 0
    height 35px
    padding 5px
    line-height 25px
    font-size 18px    
    border 2px solid rgb(153,164,176)
    border-radius 5px
    cursor pointer
    margin-right 5px
    margin-bottom 5px
    a
      color green



</style>
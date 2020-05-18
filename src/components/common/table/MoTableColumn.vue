<template>
  <td>
    <div v-if="type=='index'">{{index}}</div>
    <div v-else-if="type=='expand'" 
      class="expand"
      @click="expandLine"><i class="iconfont icon-right"></i></div>
    <div v-else>{{row[prop]}}</div>
    <slot :row="row"></slot>
  </td>  
</template>

<script>
export default {
  name:'MoTableColumn',  
  props: ['type', 'index', 'row', 'prop'],
  data(){
    return {
    }
  },  
  methods:{
    expandLine(){
      this.$emit('expandLine')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.expand
  cursor pointer

</style>
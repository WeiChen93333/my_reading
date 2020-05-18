<template>
  <div id="mo-textbox">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'MoTextbox',
  components:{},
  props:{},
  data(){
    return {
    }
  },
  computed:{},
  methods:{}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#mo-textbox
  width 700px  
  line-height 25px
  padding 5px 10px
  font-size 14px
  color rgba(0, 0, 0, .5)
  background-color rgb(183,222,232)
  border 1px solid black
  margin 5px 10px

</style>
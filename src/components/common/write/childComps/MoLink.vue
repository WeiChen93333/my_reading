<template>
  <a :href="destination" target="_blank">
    <slot>我的笔记</slot>
  </a>
</template>

<script>
export default {
  name: 'MoLink',
  components: {},
  props: ['destination'],
  data(){
    return {
      basePath: 'http://127.0.0.1:9327/note/Object.html',      
    }
  } 
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
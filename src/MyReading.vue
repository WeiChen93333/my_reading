<template>
  <div id="my-reading">
    <div id="header">

    </div>    
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'MyReading',
  methods: {
    // backToHome(){
    //   this.$router.push('/home')
    // }
  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#my-reading
  overflow hidden
  overflow-x auto
  #header  
    height 40px
    background-color lightgray
 


</style>
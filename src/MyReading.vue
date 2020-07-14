<template>
  <div id="my-reading">   
    <!-- <div class="free" @click="free">点我飞</div> -->
    <router-view/>    
  </div>
</template>

// <script>
export default {
  methods:{
    free(){
      function SuperType() {
          this.property = true;
      }

      SuperType.prototype.getSuperValue = function() {
          return this.property;
      }
      console.log(SuperType.prototype)

      function SubType() {
          this.subproperty = false;
      }

      // 这里是关键，创建SuperType的实例，并将该实例赋值给SubType.prototype
      SubType.prototype = new SuperType(); 

      SubType.prototype.getSubValue = function() {
          return this.subproperty;
      }

      var instance = new SubType();
      console.log(instance.getSuperValue()); // true

    }
   
  }  
  //划词会触发单词查询, 这是我设计的吗, 好像不是, 要修改
}  
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#my-reading
  width 100%
  height: 100%
</style>
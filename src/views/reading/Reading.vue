<template> 
  <div id="reading">
    <el-row>
      <el-col :span="12">
        <TextSection/>
      </el-col>        
      <el-col :span="12">
        <WordSection/>
      </el-col>    
    </el-row>      
  </div>
</template>

<script>

import TextSection from './childComps/TextSection'
import WordSection from './childComps/WordSection'

export default {
  name: 'Reading',
  components: { 
    TextSection,
    WordSection
  },
  mounted(){
    //刷新或关闭页面前保存 store.state 的数据
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState() { // 保存 store.state 的数据
      window.localStorage.setItem('state', JSON.stringify(this.$store.state))
    }     
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#reading  
  height 100%  
  .el-row
    margin 0 auto
    margin-top 5%
    width 60%
    min-width 880px
    height 640px
    padding 20px
    padding-bottom 60px
    color green
    background-color: #add8e6    
    .el-col 
      height 100%

</style>
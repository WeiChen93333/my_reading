<template>
  <div id="word-base" @click.self="hideWordBase">
    <div class="content">       
      <div class="words">
        <div class="column">
          <label v-for="(item, index) in wordBase" :key="index">       
            <input type="checkbox" :value="item" v-model="selectedWords"> {{item}}
          </label>    
        </div>  
      </div>
                 
      <div class="button-box">
        <mo-button type="primary" size="vertical" text="全选"
          @click.native="selectAll"></mo-button> 
        <mo-button type="primary" size="vertical" text="删除"
          @click.native="removeSelectedWords"></mo-button>        
        <mo-button type="primary" size="vertical" text="取出至单词集"
          @click.native="addToWordBase"></mo-button>
      </div>          
    </div>              
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'WordBase',
  data(){
    return {
      wordBase: [1, 2, 3],
      selectedWords: []
    }
  },
  computed: {
    ...mapState(['wordCollection']),
   
  },
  created(){
    this.getWordBase()
  },
  methods: {
    //获取单词仓数据
    async getWordBase(){
      const { data } = await this.$http('/userInfo', { params: {username: 'chen'} })
      this.wordBase = data.wordbase  
    },
    hideWordBase(){
      this.$emit('hideWordBase')
    },

    //单词视图操作按钮
    selectAll(){
      if(this.selectedWords !== this.wordCollection){
        this.selectedWords = this.wordCollection
      }else{
        this.selectedWords = []
      }     
    },
    removeSelectedWords(){
      const revisedColletion = []
      for(let item of this.wordCollection){
        if(!this.selectedWords.includes(item)) revisedColletion.push(item)
      }
      this.$store.commit('removeSelectedWord', revisedColletion)
    },
    drawWords(){
      console.log("undone");
    }    
  } 
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#word-base
  width 100%
  height 100%
  font-size 16px
  background-color rgba(120, 120, 120, .2)
  backdrop-filter blur(10px)
  position absolute
  top 0
  left 0
  .content
    width 90%
    height 90%    
    background-color rgb(233,237,240)   
    border-radius 8px 
    margin 0 auto
    margin-top 5%  
    display flex
    align-items center
    .words   
      position relative
      flex 1   
      height 100%    
      overflow-x auto
      display flex
      .column 
        width 25%        
        label
          flex 1
          display block  
          line-height 24px
          padding-left 5px
          border-radius 8px
          margin 5px 10px 
          cursor pointer       
          &:nth-child(odd)
            background-color rgba(113, 145, 192, .3)          
          &:nth-child(even)
            background-color rgba(173, 216, 230, .6)          
          input
            vertical-align middle   
    .button-box
      width 30px
      height 100%
      display flex
      flex-direction column
      justify-content space-around
      align-items flex-end  
    

</style>
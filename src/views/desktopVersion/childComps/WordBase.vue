<template>
  <div id="word-base" @click.self="hideWordBase">
    <div class="content">       
      <div class="words">
        <template v-if="numberOfCols">
          <div class="column" v-for="(item1, index1) in numberOfCols" :key="index1">
            <label v-for="(item2, index2) in wordBase.slice(index1 *15, item1 *15)" :key="index2">       
              <input type="checkbox" :value="item2" v-model="selectedWords"> {{item2}}
            </label>
            <mo-button type="primary" size="small" text="选择当前列"
              @click.native="selectAll"></mo-button> 
          </div>  
        </template>
      </div>                 
      <div class="button-box">
        <mo-button type="primary" size="vertical" text="全选"
          @click.native="selectAll"></mo-button>
        <mo-button type="primary" size="vertical" text="随机"
          @click.native="selectRondomWords"></mo-button>  
        <mo-button type="primary" size="vertical" text="删除"
          @click.native="removeSelectedWords"></mo-button>        
        <mo-button type="primary" size="vertical" text="取出至单词集"
          @click.native="drawWords"></mo-button>
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
      wordBase: [],
      selectedWords: []
    }
  },
  computed: {
    ...mapState(['wordCollection']),
    numberOfCols(){
      return Math.ceil(this.wordBase.length/15)
    }
   
  },
  created(){
    this.getWordBase()
  },
  methods: {   
    hideWordBase(){
      this.$emit('hideWordBase')
    },

    //获取单词仓数据
    async getWordBase(){
      const { data } = await this.$http('/userInfo', { params: {username: 'chen'} })
      this.wordBase = data.wordbase  
    },
  
    //操作按钮
    selectAll(){
      if(this.selectedWords !== this.wordBase){
        this.selectedWords = this.wordBase
      }else{
        this.selectedWords = []
      }     
    },
    selectRondomWords(){     
      if(this.wordBase.length <= 20) return
      let count = 0
      while(count < 20){
        const index = Math.ceil(Math.random()*(this.wordBase.length-1))
        if(!this.selectedWords.includes(this.wordBase[index])){
          this.selectedWords.push(this.wordBase[index])
          count ++         
        }             
      }     
    },
    async removeSelectedWords(){
      const revisedWordBase = []
      for(let item of this.wordBase){
        if(!this.selectedWords.includes(item)) revisedWordBase.push(item)
      }
      console.log('不好办呀, 都是修改, 但是一个是增, 一个是减, 是不是都统一成, 参数是改变里的 wordbase')
      // const data = await this.$http.post('/userInfo', JSON.stringify({username: 'chen', revisedWordBase: revisedWordBase}))
    },
    drawWords(){
      this.$store.commit('addWord', this.selectedWords)
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
      display flex
      .column 
        width 25% 
        padding-top 20px
        flex 1 1 auto
        position relative
        label             
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
        button
          position absolute
          width 80% 
          left 10%
          bottom 10px
    .button-box
      width 30px
      height 100%
      display flex
      flex-direction column
      justify-content space-around
      align-items flex-end  
    

</style>
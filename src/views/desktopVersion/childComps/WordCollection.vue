<template>
  <div id="word-collection" @click.self="hideWordCollection">
    <div class="content">
      <transition name="toggle" mode="out-in">
        <div class="view" v-if="viewVisible" key="view">
          <div class="words">
            <label v-for="(item, index) in wordCollection" :key="index">          
              <input type="checkbox" :value="item" v-model="selectedWords"> {{item}}
            </label>    
          </div>           
          <div class="buttons">
            <mo-button type="primary" size="vertical" text="全选"
              @click.native="selectAll"></mo-button> 
            <mo-button type="primary" size="vertical" text="删除"
              @click.native="removeSelectedWords"></mo-button>        
            <mo-button type="primary" size="vertical" text="放入单词仓"
              @click.native="addToWordBase"></mo-button>
          </div> 
        </div>
        <div class="memory" v-else key="memory">        
          <div class="card"              
            @click="showDetail">
            <transition name="detail" mode="out-in">
              <div class="front" v-if="wordVisible" key="front">
                <span>{{frontDisplay}}</span>
              </div>
              <word-info-display class="back" key="back" v-else :wordInfo="wordInfo"></word-info-display>
            </transition>
          </div>                   
        </div>
      </transition>
      <div class="toggle">
        <mo-button type="primary" size="big" text="记忆卡片"
          v-if="viewVisible"
          @click.native="toggleDisplay"></mo-button>
        <template v-else>
          <mo-button type="primary" size="big" text="记下了"
            @click.native="removeMasteredWord"></mo-button>
          <mo-button type="primary" size="big" text="下一个"
            @click.native="jumpToNext"></mo-button>
          <mo-button type="primary" size="big" text="返回"
            @click.native="toggleDisplay"></mo-button>         
        </template>
      </div>   
    </div>              
  </div>
</template>

<script>
import WordInfoDisplay from '../comComps/WordInfoDisplay'
import { mapState } from 'vuex'
export default {
  name: 'WordCollection',
  props: ['wordInfo'],
  components: {
    WordInfoDisplay
  },
  data(){
    return {   
      selectedWords: [],
      //单词集中展示(视图/记忆卡片)
      viewVisible: true,
      //记忆卡片切换单词/详情; 当前学习单词在单词集中的位置
      wordVisible: true,
      currentWord: 0
    }
  },
  computed: {
    ...mapState(['wordCollection']),
    frontDisplay(){
      if(this.currentWord !== this.wordCollection.length)
      return this.wordCollection[this.currentWord]      
      return '没有更多单词了'
    }
  },
  methods: {
    hideWordCollection(){
      this.$emit('hideWordCollection')
    },
    //切换 单词视图/记忆卡片
    toggleDisplay(){
      this.viewVisible = !this.viewVisible     
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
    async addToWordBase(){     
      if(this.selectedWords.length){             
        const data = await this.$http.post('/userInfo', JSON.stringify({username: 'chen', addition: this.selectedWords}))
        this.removeSelectedWords()        
      }      
    },

    //卡片视图操作   
    //展示单词详情
    showDetail(){      
      this.wordVisible = false
      this.$emit('detailSearch', this.wordCollection[this.currentWord])    
    },
    //删除学会的单词
    removeMasteredWord(){
      if(!this.wordVisible) this.wordVisible = true           
      this.$store.commit('removeMasteredWord', this.currentWord)  
      this.$emit('detailSearch', this.wordCollection[this.currentWord])   
    },
    jumpToNext(){
      if(this.currentWord == this.wordCollection.length) return
      if(!this.wordVisible) this.wordVisible = true  
      this.currentWord ++
      if(this.currentWord == this.wordCollection.length){        
        return setTimeout(()=>{this.viewVisible = true}, 5000)        
      }      
      this.$emit('detailSearch', this.wordCollection[this.currentWord])
    }
  } 
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#word-collection
  width 100%
  height 100%
  font-size 16px
  background-color rgba(120, 120, 120, .2)
  backdrop-filter blur(10px)
  position absolute
  top 0
  left 0
  .content
    width 350px
    height 500px    
    background-color rgb(233,237,240)   
    border-radius 8px 
    margin 0 auto
    margin-top 8%
    // .toggle-enter-active, .toggle-leave-active
    //   transition all .3s linear
    // .toggle-enter, .toggle-leave-to
    //   opacity 0.2
    // .toggle-leave, .toggle-enter-to       
    //   opacity 1
    .view      
      height 90%
      display flex
      align-items center
      .words   
        position relative
        width 320px    
        height 100%    
        overflow-y auto 
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
      .buttons
        width 30px
        height 100%
        display flex
        flex-direction column
        justify-content space-around
        align-items flex-end  
    .memory     
      position relative
      height 90%
      padding 20px     
      display flex      
      .card          
        width 100%
        height 100%        
        background-color white
        overflow-y auto        
        cursor pointer
        .detail-enter-active
          transition all .3s   
        .detail-leave-active 
          transition all .5s     
        .detail-enter 
          opacity 0
        .detail-enter-to
          opacity 1
        .detail-leave
          top 0
        .detail-leave-to
          top 100%
        .front     
          height 100%
          position relative
          span              
            font-size 28px   
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
        .back 
          padding-left 10px
          padding-right 5px   
          position relative
  .toggle
    height 10%
    display flex
    button 
      flex 1
      margin-left 5px
      &:first-child 
        margin 0
    
</style>
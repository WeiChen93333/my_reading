<template>
  <div id="word-collection" @click.self="hideWordCollection">
    <div class="content">     
      <div class="list-display" v-if="listDisplayVisible" key="list">
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
            @click.native="putInWordBase"></mo-button>
        </div> 
      </div>
      <div class="memory-card" v-else key="memory">        
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
      <div class="toggle">
        <mo-button type="primary" size="big" text="记忆卡片"
          v-if="listDisplayVisible"
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
      //列表展示视图
      listDisplayVisible: true,
      selectedWords: [], //选中的单词      
      
      //记忆卡片视图; 
      wordVisible: true, //切换单词与详情
      currentWord: 0 //当前学习单词在单词集中的位置
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
    //切换 列表展示视图/记忆卡片模块
    toggleDisplay(){
      this.listDisplayVisible = !this.listDisplayVisible  
      if(!this.listDisplayVisible){
        this.currentWord = 0
        this.wordVisible = true
      } 
    },
    //列表展示视图操作按钮
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
    async putInWordBase(){     
      if(!this.selectedWords.length) return
      const userId = window.sessionStorage.getItem('userId')
      const { data } = await this.$http('GET', '/userInfo', { params: {userId: userId} })    
      let repeatedwords = ''
      for(let item of this.selectedWords){
        if(!data.wordbase.includes(item)){
          data.wordbase.push(item)
        }else{
          repeatedwords += item + ' '           
        }
      }
      const message = '操作成功! ' + (repeatedwords.length > 1 ? repeatedwords + '已经添加过': '')    
      this.$message.show(message)
      await this.$http('POST', `/userInfo/update/${userId}`, {revisedWordBase: data.wordbase})      
      this.removeSelectedWords()     
      this.selectedWords = []
    },

    //记忆卡片视图操作   
    //展示单词详情
    showDetail(){      
      this.wordVisible = false
      this.$emit('detailSearch', this.wordCollection[this.currentWord])    
    },
    //删除学会的单词
    removeMasteredWord(){
      if(!this.wordVisible) this.wordVisible = true           
      this.$store.commit('removeMasteredWord', this.currentWord)   
    },
    jumpToNext(){
      if(this.currentWord == this.wordCollection.length) return
      if(!this.wordVisible) this.wordVisible = true  
      this.currentWord ++
      if(this.currentWord == this.wordCollection.length){        
        return setTimeout(()=>{this.listDisplayVisible = true}, 1500)        
      }
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
    .list-display     
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
    .memory-card   
      position relative
      height 90%
      padding 18px     
      display flex      
      .card          
        width 100%
        height 100%        
        background-color white
        overflow-y auto        
        cursor pointer
        .detail-enter-active
          transition all .2s   
        .detail-leave-active 
          transition all .4s     
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
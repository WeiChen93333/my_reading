<template>
  <div id="word-collection" @click.self="hideWordCollection">
    <div class="content">
      <transition name="toggle" mode="out-in">
        <div class="view" v-if="currentDisplay" key="view">
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
            <mo-button type="primary" size="vertical" text="添加至单词仓"
              @click.native="addToWordBase"></mo-button>
          </div> 
        </div>
        <div class="memory" v-else key="memory">
          <transition-group tag="ul" class="card-box">
            <li class="card" 
              v-for="(item, index) in wordCollection" :key="index"
              @click="showDetail(item)">
              <span v-if="wordInfo.word !== item">{{item}}</span>
              <template v-else>
                <div class="word">{{wordInfo.word}}</div>
                <div class="meaning"
                  v-for="(item1, index1) in wordInfo.meanings" :key="index1">
                  <p class="explanation">{{item1.explanation}}</p>
                  <p class="sentence" :class="{property: item2.includes('[part of speech]')}"
                    v-for="(item2, index2) in item1.sentences" :key="index2"
                    >{{item2}}</p>
                </div>
              </template>
            </li>
          </transition-group>          
        </div>
      </transition>
      <div class="toggle" @click="toggleDisplay">
        <mo-button type="primary" size="big" text="记忆卡片"
          @click.native="removeSelectedWords"></mo-button>
      </div>   
    </div>              
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'WordCollection',
  props: ['wordInfo'],
  data(){
    return {   
      selectedWords: [],
      //单词集中展示(视图/记忆卡片)
      currentDisplay: false,
      wordVisible: true
    }
  },
  computed: {
    ...mapState(['wordCollection'])   
  },
  methods: {
    hideWordCollection(){
      this.$emit('hideWordCollection')
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
      this.$store.commit('removeWord', revisedColletion)
    },
    addToWordBase(){
      console.log("undone");
    },

     //切换 单词视图/记忆卡片
    toggleDisplay(){
      this.currentDisplay = !this.currentDisplay
    },
    //展示单词详情
    showDetail(word){
      this.$emit('detailSearch', word)    
    }
  } 
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#word-collection
  width 100%
  height 100%
  font-size 16px
  background-color rgba(120, 120, 120, .8)
  position absolute
  top 0
  left 0
  .content
    width 350px
    height 500px    
    background-color rgb(252, 252, 254)   
    border-radius 8px 
    margin 0 auto
    margin-top 8%
    .toggle-enter-active, .toggle-leave-active
      transition all .3s
    .toggle-enter, .toggle-leave-to
      opacity 0
    .toggle-leave, .toggle-enter-to       
      opacity 1
    .view      
      height 90%
      display flex
      align-items center
      .words   
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
      height 90%
      padding 20px
      background-color silver
      display flex
      .card-box        
        width 100%  
        border-radius 12px 
        overflow hidden           
        position relative  
        .card          
          width 100%
          height 100%
          line-height 1       
          text-align center
          font-size 28px   
          background-color white
          position absolute
          cursor pointer
          span                 
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
    .toggle
      height 10%
      & :first-child
        width 100%
        height 100%
    
</style>
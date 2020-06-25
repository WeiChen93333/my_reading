<template>
  <div id="background-music">
    <div class="player">
      <mo-button type="primary" text="上一曲" size="middle"
        @click.native="prev"></mo-button>      
      <audio class="audio" ref="audioRef" controls loop
        :src="audioSrc"
        ></audio>
      <mo-button type="primary" text="下一曲" size="middle"
        @click.native="next"></mo-button> 
    </div>    
    <div class="wrapper" v-if=false>
      <div class="buttons">
        <mo-button type="primary" text="歌单" size="middle"
          @click.native="showSongList"></mo-button>  
        <mo-button type="primary" text="歌词" size="middle"
          @click.native="showLrc"></mo-button>     
      </div>
      <div class="container">
        <ul class="song-list" v-show="!lrcVisible">
        <li v-for="(item, index) in songNames" :key="index"
          @click="selectSong(index)">{{item}}</li>
        </ul>
        <ul v-show="lrcVisible" class="lrc" ref="lrcRef">        
          <li ref="lrcLineRef" class="lrcLine"
            v-for="(item, index) in lrc" :key="index">{{item}}</li>
        </ul>
      </div>      
    </div>
  </div>
</template>

<script>
export default {
  name:'BackgroundMusic',  
  data(){
    return {
      //歌名 时间 歌词字符串 歌词li 当前歌曲
      songNames: ['派对动物-五月天', '干杯-五月天', '正义之道-黄渤'],
      time: [],
      lrc: [],
      lrcLines: [],
      current: 0,
      //展示歌单/歌词
      lrcVisible: false
    }
  },
  computed: {
    audioSrc(){
      return require('./resources/' + this.songNames[this.current] + '.mp3')
    }
  },
  created(){    
    this.init()
  },
  methods: {
    init(){
      //准备工作
      //利用正则切出歌词时间和内容  
      let {lrcStr} = require('./resources/' + this.songNames[this.current] + 'lrc.js')     
      const time = []
      const lrc = []
      const reg = /(\d{2}:\d{2})\.\d{2}](.+)/g
      let regStr = reg.exec(lrcStr)
      while(regStr){
        time.push(regStr[1])
        lrc.push(regStr[2])
        regStr = reg.exec(lrcStr)
      }   
      this.lrc = lrc     
      this.time = time      
    },
    //audio timeupdate 事件 歌词滚动
    lrcScroll(event){  
      let lrcLines = this.$refs.lrcLineRef       
      lrcLines = Array.from(lrcLines)           
      const audio = document.querySelector('.audio') 
      let minute = '0' + parseInt(audio.currentTime / 60)    
      let second = parseInt(audio.currentTime % 60)
      let currentTimeFormat = minute + ":" + (second < 10 ? "0" : "") + second
      let index = this.time.indexOf(currentTimeFormat);             
      if(index !== -1){               
        lrcLines.forEach(item => {
          item.className = ''      
        })
        lrcLines[index].className = 'active'          
        this.$refs.lrcRef.style.top = 100 - 40 * index + 'px'      
      }      
    },
    //切换歌曲
    prev(){
      if(this.current == 0){
        alert('当前已是第一首歌曲')        
      }else{
        this.current--
        this.init()        
      }
    },
    next(){
      if(this.current == this.songNames.length-1){
        alert('已无更多歌曲')
      }else{
        this.current++
        this.init()             
      }
    },
    //切换歌单/歌词
    showSongList(){
      this.lrcVisible = false
    },
    showLrc(){
      this.lrcVisible = true     
    },
    //歌单中选择歌曲
    selectSong(index){
      this.showLrc()
      this.current = index
      this.init()        
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#background-music
  .player
    display flex       
    align-items center        
  .wrapper
    width 400px
    height 500px
    border-radius 10px
    box-shadow 0 0 5px skyblue
    background-color lightgray
    margin 50px auto    
    .buttons
      z-index 1 
    .container
      height 440px
      margin-top 20px
      position relative
      overflow hidden
      .song-list
        li
          height 20px
          line-height 20px  
          padding 15px        
          box-sizing content-box
          border 4px solid rgba(0, 28, 58, .5)
          border-top none 
          cursor pointer
          &:first-child
            border 4px solid rgba(0, 28, 58, .5)        
      .lrc 
        width 400px      
        text-align center
        font-size 18px
        position absolute
        top 100px  
        li
          height 40px
          line-height 40px  
          &.active
            color sandybrown
            transition color .2s linear
    
</style>
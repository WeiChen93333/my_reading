<template>
  <div id="reading">
    <div id="header">
      <div class="inner">
        <div class="manual">         
          <a href="https://www.yuque.com/chengziwhy/nuefbh/elmr6q"
            target="_blank">使用说明</a>
        </div>   
        <div class="background-music" ref="bgmRef">
          <iframe class="iframe"
            name="music" 
            src=""          
            frameborder="0" 
            scrolling="no"
            sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts" 
          ></iframe>
          <div class="slider" v-slide>|||</div>
        </div>
        <div class="personal-center"
          @mouseover="menuVisible = true"
          @mouseleave="hideMenu">
          <span class="username">{{username}}</span> 
          <ul class="menu" v-show="menuVisible">
            <!-- <li>资料夹</li> -->
            <li @click="enterSentenceCollection">句集</li>
            <li @click="logout">退出</li>
          </ul>
        </div>   
      </div> 
    </div>    
    <div id="desktop">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name:'Reading',  
  data(){
    return {
      registerVisible: false,
      loginVisible: false,
      username: '',
      menuVisible: false
    }
  },
  created(){
    this.getUsername() 
  },
  methods: {
    //获取用户名
    async getUsername(){
      const userId = window.sessionStorage.getItem('userId')
      if(userId){        
        const {data} = await this.$http('GET', '/userInfo', {params: {userId: userId}})
        this.username = data.username
      }
    },
    
    //隐藏个人中心菜单
    hideMenu(){
      setTimeout(() => {
        this.menuVisible = false
      }, 1500)
    },
    //进入句集界面
    enterSentenceCollection(){
      if(this.$route.path === '/sentence') return
      this.$router.push('/sentence') 
      this.menuVisible = false
    },
    //登出
    logout(){
      this.username = ''
      window.sessionStorage.removeItem('userId')
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#reading  
  #header
    height 46px
    background-color lightgray
    .inner
      display flex
      justify-content space-between   
      margin 0 auto 
      width 60%
      min-width 880px      
      text-align center   
      .manual
        width 70px
        line-height 46px
      .background-music    
        position relative
        width 375px      
        .iframe
          position absolute
          left 0        
          bottom 0    
          width 375px
          height 677px
        .slider 
          position absolute
          width 70px
          height 46px
          line-height 42px
          border-radius 5px
          border 2px solid #efefef
          background-color green         
          opacity 0
          user-select none
          cursor pointer       
      .personal-center
        position relative
        width 100px    
        text-align center 
        .username       
          line-height 46px
          color green      
          cursor pointer     
        .menu
          position absolute      
          left 50%
          transform translateX(-50%)
          width 70%
          padding 2px 0   
          background-color white         
          li 
            height 24px
            padding 5px 10px     
            line-height 14px  
            text-align center
            user-select none
            cursor pointer
            &:hover
              background-color lightgray
  #desktop
    width 60%
    min-width 880px
    padding 20px
    color green  
    background-color lightblue  
    margin 0 auto 
    margin-top 5%

</style>
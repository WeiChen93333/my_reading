<template>
  <div id="layout">
    <el-container>      
      <el-aside width="200px">
        <el-row class="happy">
          <el-col :span="18">悦读</el-col>
          <el-col :span="6" 
            :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
            @click.native="isCollapse = !isCollapse"
          ></el-col>
        </el-row>
        <el-menu 
          :collapse="isCollapse"
          :router="true">
          <el-submenu index="workbench">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">工作台</span>
            </template>
            <el-menu-item index="/reading">              
              <span slot="title">阅读时</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="collection">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">收藏集</span>
            </template>
            <el-menu-item index="/word">              
              <span slot="title">单词集</span>
            </el-menu-item>
            <el-menu-item index="/sentence">              
              <span slot="title">句集</span>
            </el-menu-item>
          </el-submenu>
          <!-- <el-submenu>
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">工作台</span>
            </template>
            <el-menu-item>              
              <span slot="title">阅读时</span>
            </el-menu-item>
          </el-submenu>          -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>       
          <!-- <div class="background-music" ref="bgmRef">
            <iframe class="iframe"
              name="music" 
              src="http://120.79.214.0/music/#/music"          
              frameborder="0" 
              scrolling="no"
              sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts" 
            ></iframe>
            <div class="slider" v-slide>|||</div>
          </div> -->
          <div class="personal-center"
            @mouseover="menuVisible = true"
            @mouseleave="hideMenu">
            <span class="username">{{username}}</span> 
            <!-- <ul class="menu" v-show="menuVisible">         
              <li @click="enterSentenceCollection">句集</li>
              <li @click="logout">退出</li>
            </ul> -->
          </div>         
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>
          <el-row class="flex-center_all">
            <el-col class="flex-center_all">            
              <span class="motto">问渠那得清如许  为有源头活水来</span>
            </el-col>
          </el-row>          
        </el-footer>
      </el-container>
    </el-container>
</div>
</template>

<script>

export default {
  name:'Reading',
  data(){
    return {
      isCollapse: false,      
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
    },
    test(){
     
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
#layout 
  height 100%  
  .el-container
    height 100%
    .el-aside
      background-color lightblue 
      .happy
        height 60px
        line-height 60px
        font-size 24px
        font-weight 700px
        text-align center
      .el-icon-s-fold, .el-icon-s-unfold
        line-height 60px
        cursor pointer
    .el-header
      background-color lightgray   
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
  .el-main  
    display flex
    overflow hidden
    min-width 880px
    height 100%  
    background-color rgb(64, 128, 128)
  .el-footer
      background-color rgb(64, 128, 128)
      .el-row 
        height 100%
        padding-bottom 40px
</style>
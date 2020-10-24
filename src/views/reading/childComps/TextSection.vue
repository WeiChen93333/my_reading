<template>
  <div id="text-section">
    <div id="button-group">      
      <el-button 
        type="primary"   
        @click="toggleInputBox">
      Import</el-button>
      <el-button 
        type="primary"      
        @click="editText">
      Edit</el-button> 
      <el-button
        type="primary"   
        @click="clearReadingZone">
      Clear</el-button>
      <el-button
        type="primary"     
        @click="addAll"> 
      Add All</el-button>
    </div>
    <div id="text-display">
      <p v-for="(item1, index1) in textArr" :key="index1">
        <span v-for="(item2, index2) in item1" :key="index2"
        @click="clickSearch(item2)"
        @dblclick="addToWordCollection(item2)">{{item2 + ' '}}</span>
      </p>    
    </div>

    <!-- 点击 Import 按钮时弹出内容输入对话框 -->
    <el-dialog title="内容输入" :visible.sync="inputDialogVisible">
      <el-input
        type="textarea"
        :rows="6"   
        v-model="newAdd">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="inputDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    
    <!-- 点击 Clear 按钮时弹出确认对话框 -->
    <el-dialog
      title="删除内容"
      :visible.sync="clearDialogVisible"
      width="30%">
      <span>Are you sure you want to clear reading area?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmClear">确 定</el-button>
      </span>
    </el-dialog>  
  </div>   
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TextSection',
  data(){
    return {      
      inputDialogVisible: false,
      clearDialogVisible: false,
      textStr: 'I love you',  //要展示在阅读区的文本
      newAdd: '',   //用户每次输入的文本
      confirm: false,  //控制确认框显示隐藏
      timer: null
    }
  },
  computed: {
    ...mapState(['wordCollection']),
    textArr(){      
      const tempArr = []        
      this.textStr = this.textStr.trim() + "\n" //文本末尾加一个换行, 同时包含一段和多段的情况   
      const reg = /.+\n/g
      let match      
      while(match = reg.exec(this.textStr)){        
        tempArr.push(match[0].split(' '))        
      }    
      return tempArr 
    }   
  },
  watch:{
    newAdd(){
      console.log('change')
    }

  },
  methods: {   
    //按钮区域(四个)
    //控制内容输入对话框
    toggleInputBox(){
      this.inputDialogVisible = !this.inputDialogVisible       
    },
    confirmInput(){  // 对话内确认按钮      
      this.textStr += this.newAdd
      this.newAdd = ''      
    },
    //编辑文本内容 (方便存储和导出)
    editText(){
      // 有点难搞
    },
    //全部加入单词集
    addAll(){
      this.$store.commit('addWord', this.textArr)
    },
    //清空阅读区
    clearReadingZone(){
      this.clearDialogVisible = true
    },
    confirmClear(){  //对话内确认按钮
      this.textStr = ''
      this.clearDialogVisible = false    
    },  
    
    //text-display 页面鼠标单双击操作
    // 单击查词    
    clickSearch(word){    
      clearTimeout(this.timer)
      this.timer = setTimeout(()=>{           
        this.$store.commit('addSearchHistory', word) 
      }, 200)     
    },    
    //将单词加入当前单词集
    addToWordCollection(word){
      clearTimeout(this.timer)
      //匹配字母和 ' , 去掉可能的标点符号、空格     
      const reg = /[a-zA-Z']+/     
      word = reg.exec(word)[0]
      if(this.wordCollection.includes(word)) return this.$message.show('该单词已经添加过')
      this.$store.commit('addWord', word)
      this.$message.show(`成功添加 ${word} 至单词集`)      
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#text-section  
  #text-display
    margin-top 20px
    max-width 710px
    padding 10px
    border 2px solid rgb(64, 128, 128)
    border-right none
    background-color rgba(255, 255, 255, .5)     
    overflow-y auto 
    p 
      margin-bottom 10px
      line-height 22px   
      text-align justify    
    span
      cursor pointer
</style>
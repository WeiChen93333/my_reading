import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: window.localStorage.getItem('state') ? JSON.parse(window.localStorage.getItem('state')): {    
    readingText: '', //阅读文本
    wordCollection: [], //单词集
    searchHistory: [], //查词跳转历史
  },
  mutations: {
    //改变单词集
    addWord(state, payload){      
      function process(param){
        if(typeof param == 'string'){
          const reg = /[a-zA-Z']+/     
          if(reg.exec(param)){
            param = reg.exec(param)[0]
            if(!state.wordCollection.includes(param)) state.wordCollection.push(param)  
          }
          return        
        }
        for(let item of param){
          process(item)         
        }
      }     
      process(payload)      
      window.localStorage.setItem('wordCollection', JSON.stringify(state.wordCollection))
    },
    removeSelectedWord(state, payload){
      state.wordCollection = payload
      window.localStorage.setItem('wordCollection', JSON.stringify(state.wordCollection))
    },
    removeMasteredWord(state, payload){
      state.wordCollection.splice(payload, 1)      
      window.localStorage.setItem('wordCollection', JSON.stringify(state.wordCollection))
    },

    //改变阅读文本
    changeReadingText(state, payload){
      state.readingText = payload
    },

    //改变查词跳转历史
    addSearchHistory(state, payload){
      //匹配字母和 ' , 去掉可能的标点符号、空格     
      const reg = /[a-zA-Z']+/     
      payload = reg.exec(payload)[0].toLowerCase()   
      //判断是否连续查询同一个单词 
      if(state.searchHistory[state.searchHistory.length - 1] !== payload)
        state.searchHistory.push(payload)
    },
    reduceSearchHistory(state){
      state.searchHistory.pop(state.searchHistory.length - 1)
    },
    clearSearchHistory(state){
      state.searchHistory = []
    }
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {    
    //单词集
    wordCollection: []
  },
  mutations: {
    addWord(state, payload){      
      function process(param){
        if(typeof param == 'string'){
          const reg = /[a-zA-Z']+/     
          if(reg.exec(param)){
            param = reg.exec(param)[0]
            state.wordCollection.push(param)            
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
    //初始化时从localStorage获取单词集
    restoreCollection(state, payload){
      state.wordCollection = JSON.parse(payload)      
    },

  },
  actions: {
  },
  modules: {
  }
})

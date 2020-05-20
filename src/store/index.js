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
      if(typeof payload == 'string'){
        state.wordCollection.push(payload)
      }else{
        state.wordCollection.push(...payload)
      }      
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

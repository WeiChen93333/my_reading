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
      state.wordCollection.push(payload)
      window.localStorage.setItem('wordCollection', JSON.stringify(state.wordCollection))
    },
    removeWord(state, payload){
      state.wordCollection = payload
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
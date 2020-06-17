import Vue from 'vue'
import VueRouter from 'vue-router'

import MainPart from 'views/mainPart/MainPart'
// import ReadingMaterial from 'views/readingMaterial/ReadingMaterial'
import SentenceCollection from 'views/sentenceCollection/SentenceCollection'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/main' 
  },
  {
    path: '/main',
    component: MainPart
  },  
  // {
  //   path: '/material',
  //   component: ReadingMaterial
  // }, 
  {
    path: '/sentence',
    component: SentenceCollection
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

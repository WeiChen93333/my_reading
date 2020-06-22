import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginRegister from 'views/loginRegister/LoginRegister'
import Reading from 'views/Reading'
import MainPart from 'views/mainPart/MainPart'
// import ReadingMaterial from 'views/readingMaterial/ReadingMaterial'
import SentenceCollection from 'views/sentenceCollection/SentenceCollection'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/login' 
  },
  {
    path: '/login',
    component: LoginRegister
  },
  {
    path: "/reading",
    component: Reading,
    redirect: "/main",
    children: [
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
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
// //挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   if(to.path == "/login") return next()
//   const tokenStr = window.sessionStorage.getItem("token")
//   if(!tokenStr) return next("/login")
//   next()
// }) 
export default router

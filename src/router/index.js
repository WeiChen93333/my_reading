import Vue from 'vue'
import VueRouter from 'vue-router'

// import ReadingMaterial from 'views/readingMaterial/ReadingMaterial'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/login' 
  },
  {
    path: '/login',
    component: () => import('views/loginRegister/LoginRegister')
  },
  {
    path: "/main",
    component: () => import('views/mainLayout/MainLayout'),
    redirect: "/reading",
    children: [
      {
        path: '/reading',
        component: () => import('views/mainPart/MainPart')
      },  
      // {
      //   path: '/material',
      //   component: ReadingMaterial
      // }, 
      {
        path: '/sentence',
        component: () => import('views/sentenceCollection/SentenceCollection')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
// //挂载全局前置守卫
router.beforeEach((to, from, next) => {
  if(to.path == "/login") return next()
  const token = window.sessionStorage.getItem("token")
  if(!token) return next("/login")
  next()
}) 
export default router

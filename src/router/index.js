import Vue from 'vue'
import VueRouter from 'vue-router'

// import ReadingMaterial from 'views/readingMaterial/ReadingMaterial'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/main' 
  },
  {
    path: '/login',
    component: () => import('views/loginRegister/LoginRegister')
  },
  {
    path: "/main",
    component: () => import('@/components/common/layout/Layout'),
    redirect: "/reading",
    children: [
      {
        path: '/reading',
        component: () => import('views/reading/Reading')
      },
      // {
      //   path: '/material',
      //   component: ReadingMaterial
      // },
      {
        path: '/word',
        component: () => import('views/collection/WordCollection')
      },
      {
        path: '/sentence',
        component: () => import('views/collection/SentenceCollection')
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

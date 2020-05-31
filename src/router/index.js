import Vue from 'vue'
import VueRouter from 'vue-router'

import Desktop from 'views/desktop/Desktop'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/desktop' 
  },
  {
    path: '/desktop',
    component: Desktop
  }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

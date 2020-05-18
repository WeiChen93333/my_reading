import Vue from 'vue'
import VueRouter from 'vue-router'

import DesktopVersion from 'views/desktopVersion/DesktopVersion'
// import MobileVersion from 'views/mobileVersion/MobileVersion'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: DesktopVersion
  },
  {
    path: '/desktop',
    component: DesktopVersion
  },
  // {
  //   path: '/desktop',
  //   component: DesktopVersion
  // },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

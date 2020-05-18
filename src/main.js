import Vue from 'vue'
import MyReading from './MyReading.vue'
import router from './router'
import store from './store'

//引入公共样式表
import 'assets/css/global.stylus'

//引入字体图标
import "assets/css/ali-fonts/iconfont.css"
//引入全局组件
import "components/common/globalComps.js"

//引入自定义插件-消息弹出框
import Message from "@/plugins/mo-message.js"
Vue.use(Message)
import MessageBox from "@/plugins/mo-messageBox.js"
Vue.use(MessageBox)

//设置事件总线
Vue.prototype.$bus = new Vue()

//引入axios
import axios from "axios"
axios.defaults.baseURL = "http://localhost:3366"
// axios.interceptors.request.use(config => {
//   //为请求头对象, 添加token验证的authorization字段  
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   //*发起登录请求的时候还没有token, window.sessionStorage.getItem('token')为"null"
  
//   return config
// })
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(MyReading)
}).$mount('#app')

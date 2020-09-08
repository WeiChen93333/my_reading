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

//引入公用函数
import { moveFocus, deepFreeze } from './utils/utils.js'
Vue.prototype.$moveFocus = moveFocus
Vue.prototype.$deepFreeze = deepFreeze

//引入 axios 请求函数
import { request } from "./request/request.js"
Vue.prototype.$http = request

//引入自定义指令
import { backtotop, focus, highlight, slide } from './directive/directive.js'

//设置事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(MyReading)
}).$mount('#app')

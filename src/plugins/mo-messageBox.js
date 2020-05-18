import MessageBoxOptions from './mo-messageBox.vue'
const MessageBox = {}
MessageBox.install = function(Vue){
  const messageBoxConstructor = Vue.extend(MessageBoxOptions)
  const mountPoint = document.createElement('div')
  document.body.appendChild(mountPoint)
  const vm = new messageBoxConstructor().$mount(mountPoint)
  Vue.prototype.$confirm = vm.showConfirmBox
}

export default MessageBox

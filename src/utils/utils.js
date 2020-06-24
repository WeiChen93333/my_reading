// 表单内 input 输入框焦点切换
function moveFocus(){
  // 在表单组件上加上 ref="formRef" 获取组件实例
  const form = this.$refs.formRef
  const active = document.activeElement
  let flag = true
  let key = 0
  while(flag){
    if(form.$el[key] == active){
      flag = false         
      form.$el[key + 1].focus()
    }else{
      key ++
    }
  }
}

export { moveFocus }
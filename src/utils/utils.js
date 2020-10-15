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
//要做到普遍使用, 将表单 ref 名作为函数参数更好些

// 防抖
function debounce(fn, delay = 1000){
  let timer
  return function(){
    clearTimeout(timer)       
    timer = setTimeout(fn, delay)
  }
}

//节流
function throttle(fn, interval = 1000){    
  let timer    
  let flag = true
  let start
  return function(){        
    clearTimeout(timer)
    if(flag) start = Date.now()       
    flag = false                     
    let end = Date.now()  
    if(end - start >= interval){         
      fn()
      flag = true
    }else{         
      timer = setTimeout(fn, 1000)
    }            
  }
}

//深冻结
function deepFreeze(obj){     
  if(typeof obj !== 'object' || obj === null) return obj
  const propNames = Object.getOwnPropertyNames(obj)      
  propNames.forEach((value) => {
    if(typeof obj[value] == 'object' && obj[value] !== null){     
      deepFreeze(obj[value])            
    }
  })        
  return Object.freeze(obj)   
}
export { moveFocus, debounce, throttle, deepFreeze }
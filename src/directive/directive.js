import Vue from 'vue'

const focus = Vue.directive(  
  'focus', {
    inserted(el, binding){      
        if(el.tagName == 'INPUT')  return el.focus()    
        if(el.tagName == 'FORM'){
          el.firstElementChild.firstElementChild.childNodes.forEach(item =>{
            if(item.tagName == 'INPUT') item.focus()
          })
        }
    }    
  }
)

const highlight = Vue.directive(  
  'highlight', {
    inserted(el, binding, vnode){   
      vnode.key = 'unique'
      const keyword = binding.value
      const reg = eval(`/\\b${keyword}\\b/ig`)      
      el.innerHTML = el.innerHTML.replace(reg, `<span style="color:#008000; font-weight:600">${keyword}</span>`)     
    }    
  }
)

export { focus, highlight }
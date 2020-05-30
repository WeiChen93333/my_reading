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

export { focus }
import Vue from 'vue'

const focus = Vue.directive(  
  'focus', {  //文本框聚焦
    inserted(el, binding){        
        if(el.tagName == 'INPUT' || el.tagName == 'TEXTAREA')  return el.focus()  
        if(el.tagName == 'FORM'){
          el.firstElementChild.firstElementChild.childNodes.forEach(item =>{
            if(item.tagName == 'INPUT') item.focus()
          })
        }
    }    
  }
)

const highlight = Vue.directive(  
  'highlight', {//单词高亮
    inserted(el, binding, vnode){   
      vnode.key = 'unique'
      const keyword = binding.value
      const reg = eval(`/\\b${keyword}\\b/ig`)      
      el.innerHTML = el.innerHTML.replace(reg, `<span style="color:#008000; font-weight:600">${keyword}</span>`)     
    }    
  }
)

const slide = Vue.directive(
  'slide', {//滑动滑块
    inserted(el, binding, vnode){   
      const parentLeft = el.offsetParent.offsetLeft
      const widthGap = el.offsetParent.offsetWidth - el.offsetWidth     
      //添加鼠标左键按下事件         
      function showSlider(e){        
        el.style.opacity = 1        
        const startPosition = e.layerX  
        el.style.transition = ''          
        //添加鼠标移动事件
        function slide(e){         
          let moveDistance = e.pageX - parentLeft - startPosition
          moveDistance = moveDistance < 0 ? 0 : moveDistance > widthGap ? widthGap : moveDistance     
          el.style.left = moveDistance + 'px'
          if(moveDistance >= widthGap){
            el.style.left = 0      
            el.style.opacity = 0
            window.open('http://120.79.214.0/music')
          }         
        }
        el.addEventListener('mousemove', slide)   
        //添加 鼠标左键抬起 && 鼠标移出滑块 事件       
        function release(){
          el.removeEventListener('mousemove', slide)
          el.removeEventListener('mouseleave', release)
          el.removeEventListener('mouseup', release)
          el.style.transition = 'left .5s linear'
          el.style.left = 0      
          setTimeout(() => el.style.opacity = 0, 500)                         
        }
        el.addEventListener('mouseup', release)   
        //添加鼠标脱离滑块事件        
        el.addEventListener('mouseleave', release)     
      }      
      el.addEventListener('mousedown', showSlider)
    }
  }
)
export { focus, highlight, slide }
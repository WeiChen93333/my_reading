const menu = [
  {
    content: '查询释义'
  
  },
  {
    content: '查询例句'
    
  },
  {
    content: '添加到单词集'
  
  },
  {
    content: '添加到句集'
      
  }
]
function deepFreeze(obj){
  const propNames = Object.getOwnPropertyNames(obj)
  return propNames
}
const result = deepFreeze(menu)
console.log(result.includes('length'))


// export default { deepFreeze }
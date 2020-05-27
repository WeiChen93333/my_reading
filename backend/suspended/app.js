const handWordRouter = require(__dirname + '/router/word.js')

const onRequest = (req, res) => {  
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080') 

  // const result = handWordRouter(req, res)
  // const score = result.then(wordData => {   
  //   res.end(JSON.stringify(wordData))  
  // })
  // if(!score.PromiseValue) return

  const result = handUserRouter(req, res)
  const score = result.then(userData => {   
    res.end(JSON.stringify(userData))  
  })
  if(!score.PromiseValue) return

  return
  if(method == 'POST'){
    const { pathname } = url.parse(req.url, true)  
    //用户注册
    if(pathname == '/userInfo/register'){      
      req.on('data', chunk=>{
        let postData = JSON.parse(chunk)  
        UserModel.count({}, (err, count)=>{
          const userCount = ++count
          const newUser = {
            userId: userCount.toString(),
            username: postData.username,
            password: postData.password.toString(),
            wordbase: []
          }
          UserModel.create(newUser)             
        })    
      })      
      return res.end('success')
    }    
    //用户登录
    if(pathname == '/userInfo/login'){
      req.on('data', chunk=>{       
        let postData = JSON.parse(chunk) 
        UserModel.findOne(postData, function(err, doc){
          if(!err){            
            if(doc){
              const resData = {
                userId: doc.userId,
                message: 'success'
              }              
              res.end(JSON.stringify(resData))    
            }else{
              const resData = {                
                message: 'failure'
              }    
              res.end(JSON.stringify(resData))              
            }                   
          }        
        })       
      })      
      return 
    }   
    //修改用户信息, 本来该用 put, 用 post 先将就一下
    const regexp = /\/userInfo\/(\w+)/
    const userId = regexp.exec(pathname)[1]    
    req.on('data', (chunk)=> {
      let postData = JSON.parse(chunk)
      UserModel.findOne({userId: userId}, function(err, doc){
        if(!err){          
          UserModel.update({userId: userId}, {$set: {wordbase: postData.revisedWordBase}}, err=>{
            if(!err){
              UserModel.findOne({userId: userId}, function(err, doc){
                res.end(JSON.stringify(doc))       
              })
            }
          })          
        }         
      })            
    })        
  }
}
module.exports = onRequest









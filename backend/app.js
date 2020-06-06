const { WordModel, SentenceModel, UserModel } = require(__dirname + '/db.js')

const url = require('url')

const onRequest = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); 
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080') 
  const method = req.method 
  if(method == 'GET'){
    const { pathname, query } = url.parse(req.url, true) 
    //获取单词释义信息
    if(pathname == '/dict/words'){
      WordModel.findOne({word: query['word']}, function(err, doc){
        if(!err){         
          res.end(JSON.stringify(doc))
        }
      })  
      return         
    }
    if(pathname == '/dict/sentences'){
      const { word, pagenum, pagesize} = query
      const resData = {
        total: 0,
        sentences: []
      } 
      SentenceModel.count({sentence: {$regex: eval(`/\\b${word}\\b/ig`)}}, (err, count)=>{
        if(!err) resData.total = count  
        SentenceModel.find({sentence: {$regex: eval(`/\\b${word}\\b/ig`)}}, null, { skip: (pagenum-1)*pagesize, limit: parseInt(pagesize) }, function(err, docs){  
          if(!err){
            resData.sentences = docs          
            return res.end(JSON.stringify(resData)) 
          }
        })        
      })            
    }
    //获取用户信息
    if(pathname == '/userInfo'){
      UserModel.findOne({userId: query['userId']}, function(err, doc){
        if(!err){           
          res.end(JSON.stringify(doc))
        }         
      }) 
      return
    } 
  }else if(method == 'POST'){
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
            history: [],
            wordbase: [],
            sentences: [],
            materials: []
          }
          UserModel.create(newUser)             
        })    
      })      
      const resData = {        
        message: 'success'
      }
      return res.end(JSON.stringify(resData))
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
                username: doc.username,                     
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
    //修改用户信息, 本来该用 put, 但是不知道 http 模块不能接收还是需要怎么配置一下, 用 post 先将就
    const regexp = /\/userInfo\/update\/(\w+)/
    const userId = regexp.exec(pathname)[1]    
    req.on('data', (chunk)=> {
      let postData = JSON.parse(chunk)
      //判断修改了什么
      const revision = Object.keys(postData)[0]
      let update = null
      switch(revision){
        case 'revisedWordBase':
          update = {$set: {wordbase: postData.revisedWordBase}}
          break
        case 'revisedSentenceCollection':
          update = {$set: {sentences: postData.revisedSentenceCollection}}
          break
      }    
      UserModel.findOneAndUpdate({userId: userId}, update, {new: true}, (err, doc)=>{    
        res.end(JSON.stringify(doc))
      })        
    })        
  }
} 
            
module.exports = onRequest









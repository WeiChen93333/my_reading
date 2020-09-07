const { WordModel, SentenceModel, UserModel } = require(__dirname + '/db.js')

const url = require('url')
const jwt  = require('jsonwebtoken');

const onRequest = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); 
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080') 
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization') 
  res.setHeader('Access-Control-Max-Age', '3600')  
  const method = req.method   
  if(method == 'OPTIONS'){   
    console.log('option')
    return res.end()
  }
  if(method == 'PUT'){   
    return res.end('put')
  }  
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
      SentenceModel.countDocuments({sentence: {$regex: eval(`/\\b${word}\\b/ig`)}}, (err, count)=>{
        if(!err) resData.total = count  
        SentenceModel.find({sentence: {$regex: eval(`/\\b${word}\\b/ig`)}}, null, { skip: (pagenum-1)*pagesize, limit: parseInt(pagesize) }, function(err, docs){  
          if(!err){
            resData.sentences = docs          
            res.end(JSON.stringify(resData)) 
          }
        })        
      })  
      return          
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
      let postData = ''   
      const resData = {        
        message: 'success'
      }
      req.on('data', chunk=>{     
        postData += chunk.toString()
      })
      req.on('end', ()=>{
        postData = JSON.parse(postData)
        //判断要注册的用户名是否已经存在, 存在返回消息 failure
        UserModel.findOne({username: postData.username}, function(err, doc){
          if(!err){        
            if(doc){
              resData.message = 'failure'
              return res.end(JSON.stringify(resData))
            }
            //不存在, 创建用户, 返回消息 success
            UserModel.countDocuments({}, (err, count)=>{      
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
              res.end(JSON.stringify(resData))             
            })                
          }         
        })      
      })   
      return
    }    
  
    //用户登录
    if(pathname == '/userInfo/login'){
      let postData = ''
      req.on('data', chunk=>{       
        postData += chunk.toString()         
      })   
      req.on('end', ()=>{
        postData = JSON.parse(postData)
        UserModel.findOne(postData, function(err, doc){
          if(!err){            
            if(doc){               
              const resData = {
                userId: doc.userId,
                username: doc.username,                     
                message: 'success'
              }
              //生成 token
              let payload = {name:'张三',admin:true};
              let secret = 'I_LOVE_JING';
              let token = jwt.sign(payload, secret); 
              //解码
              // let payload = jwt.verify(token, secret)
                              
              resData.token = 'Bearer ' + token
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
    let postData = '' 
    req.on('data', (chunk)=> {
      postData += chunk.toString()      
    })   
    req.on('end', ()=>{
      postData = JSON.parse(postData)
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
      UserModel.findOneAndUpdate({userId: userId}, update, {new: true, useFindAndModify: false}, (err, doc)=>{    
        res.end(JSON.stringify(doc))
      })
    })     
  }
} 
            
module.exports = onRequest









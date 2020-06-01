//建立服务端与客户端的连接
const http = require('http') 
const hostname = '127.0.0.1';
const port = 3366;

const url = require('url')

const onRequest = (req, res) => {
  res.setHeader('Content-Type', 'application/json'); 
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')  
  // res.setHeader('Access-Control-Allow-Credentials', true)  
  res.setHeader('Access-Control-Allow-Headers', 'authorization')  
  
  const method = req.method 
  if(method == 'GET'){
    const { pathname, query } = url.parse(req.url, true) 
    //获取单词释义信息
    if(pathname == '/dict'){
      WordModel.findOne({word: query['word']}, function(err, doc){
        if(!err){
          res.end(JSON.stringify(doc))
        }
      })  
      return         
    }
    //获取用户(单词仓)信息
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
        case 'revisedSentenceCollection':
          update = {$set: {sentenceCollectione: postData.revisedSentenceCollection}}
      }      
      console.log(update)
      UserModel.findOneAndUpdate({userId: userId}, update, {new: true}, (err, doc)=>{     
        res.end(JSON.stringify(doc))
      })        
    })        
  }
}
const server = http.createServer(onRequest);

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});


//引入mongoose操作mongoDB数据库服务器
const mongoose = require('mongoose')

//连接词典
const conn1 = mongoose.createConnection('mongodb://localhost/dict', { useNewUrlParser: true, useUnifiedTopology: true })
const wordSchema = new mongoose.Schema({
  word: String,
  meanings: Array
})
const WordModel = conn1.model('words', wordSchema)

//连接用户信息
const conn2 = mongoose.createConnection('mongodb://localhost/userInfo', { useNewUrlParser: true, useUnifiedTopology: true })
const userSchema = new mongoose.Schema({
  userId: String,
  username: String,
  password: String,
  history: Array,
  wordbase: Array,
  sentences: Array,
  materials: Array
})
const UserModel = conn2.model('users', userSchema)







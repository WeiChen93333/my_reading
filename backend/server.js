//建立服务端与客户端的连接
const http = require('http') 
const hostname = '127.0.0.1';
const port = 3366;

const url = require('url') //引入url模块, 来解析请求的地址
const querystring = require('querystring') //来解析请求体
const fs = require('fs')

const onRequest = (req, res) => {
  // res.writeHead(200, {'Content-Type': 'text/plain'})
  // res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')  
  const method = req.method 
  if(method == 'GET'){
    const { pathname, query } = url.parse(req.url, true) 
    if(pathname == '/dict'){
      WordModel.findOne({word: query['word']}, function(err, doc){
        if(!err){
          res.end(JSON.stringify(doc))
        }
      })           
    }else if(pathname == '/userInfo'){
      UserModel.findOne({userId: query['userId']}, function(err, doc){
        if(!err){          
          res.end(JSON.stringify(doc))
        }         
      }) 
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
        UserModel.count(postData, (err, count)=>{
          if(count == 1){           
            res.end('success')                
          }else{
            // res.statusCode = 401.1 会在控制台报错, 程序终止
            res.end('failure')          
          }
        })    
      })      
      return 
    }   
    //修改用户信息, 本来该用 put, 但是不知道 http 模块不能接收还是需要怎么配置一下, 用 post 先将就
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
const server = http.createServer(onRequest);

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});


//引入mongoose操作mongoDB数据库服务器
const mongoose = require('mongoose')

//连接用户信息
// console.log(mongoose.connection)
// mongoose.connect('mongodb://localhost/userInfo', {  useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connection.once('open', ()=> console.log('userInfo'))
// const userSchema = new mongoose.Schema({
//   username: String,
//   password: Number,
//   wordbase: Array
// })
// const User = mongoose.model('users', userSchema)
// User.create({username: "test2", password: "1111", wordbase: ['determination', 'happiness', 'positive']})

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
  wordbase: Array
})
const UserModel = conn2.model('users', userSchema)







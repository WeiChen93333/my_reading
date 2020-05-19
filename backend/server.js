//建立服务端与客户端的连接
const http = require('http') 
const hostname = '127.0.0.1';
const port = 3366;

const url = require('url') //引入url模块, 来解析请求的地址
const querystring = require('querystring') //来解析请求体
const fs = require('fs')

const onRequest = (req, res) => {
  // res.writeHead(200, {'Content-Type': 'text/plain'})
  res.statusCode = 200;
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
      UserModel.findOne({username: query['username']}, function(err, doc){
        if(!err){          
          res.end(JSON.stringify(doc))
        }         
      }) 
    }
  }else if(method == 'POST'){      
    req.on('data', (chunk)=> {
      let postData = JSON.parse(chunk)
      UserModel.findOne({username: postData.username}, function(err, doc){
        if(!err){
          let targetWordBase = JSON.parse(JSON.stringify(doc)).wordbase 
          targetWordBase.push(...postData.addition)      
          UserModel.update({username: postData.username}, {$set: {wordbase: targetWordBase}}, err=>{
            if(!err){
              UserModel.findOne({username: postData.username}, function(err, doc){
                res.end(JSON.stringify(doc))       
              })
            }
          })          
        }         
      })            
    })    
    
  }else if(method == 'PUT'){
    if(pathname == '/userInfo'){
      console.log(query)
      res.end('success')
    }
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
  username: String,
  password: Number,
  wordbase: Array
})
const UserModel = conn2.model('users', userSchema)







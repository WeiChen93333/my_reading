//建立服务端与客户端的连接
const http = require('http') 
const hostname = '127.0.0.1';
const port = 3366;

const url = require('url') //引入url模块, 来解析请求的地址
const fs = require('fs')

const onRequest = (req, res) => {
  // res.writeHead(200, {'Content-Type': 'text/plain'})
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')  
  const method = req.method
  const {pathname, query} = url.parse(req.url, true)  
  if(method == 'GET'){
    if(pathname == '/dict'){
      Vocabulary.findOne({word: query['word']}, function(err, doc){
        if(!err){
          res.end(JSON.stringify(doc))
        }
      })           
    }
  }else if(method == 'POST'){
    if(pathname == '/test'){
      res.end('test')
    }
  }  
}
const server = http.createServer(onRequest);

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});


//引入mongoose操作mongoDB数据库服务器
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dict', { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.connection.once('open', ()=> console.log('dict'))
const wordSchema = new mongoose.Schema({
  word: String,
  meanings: Array
})
const Vocabulary = mongoose.model('words', wordSchema)


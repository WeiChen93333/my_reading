//建立服务端与客户端的连接
const http = require('http') 
const hostname = '127.0.0.1';
const port = 3366;

const onRequest = require(__dirname + '/app.js')
const server = http.createServer(onRequest);

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});





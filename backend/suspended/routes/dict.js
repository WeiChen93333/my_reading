const path = require('path');
let upperPath = path.resolve(__dirname,'..')
const WordModel = require(upperPath + '/db.js').WordModel

function handWordRouter(req, res){  
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
  }
}
module.exports = handWordRouter
const path = require('path');
let upperPath = path.resolve(__dirname,'..')
const WordModel = require(upperPath + '/db.js').WordModel

function handWordRouter(req, res){  
  const method = req.method
  const url = require('url') 
  const { pathname } = url.parse(req.url, true)
  if(method == 'GET' && pathname == '/dict'){     
    const { query } = url.parse(req.url, true) 
    const result = new Promise((resolve, reject) => {
      WordModel.findOne({word: query['word']}, function(err, doc){
        if(!err){
          resolve(doc)          
          }
        })  
      })   
    return result  
  }
}
module.exports = handWordRouter
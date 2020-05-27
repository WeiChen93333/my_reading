const path = require('path');
let upperPath = path.resolve(__dirname,'..')
const UserModel = require(upperPath + '/db.js').UserModel

function handUserRouter(req, res){  
  const method = req.method
  const url = require('url') 
  const { pathname } = url.parse(req.url, true)
  if(method == 'GET' && pathname == '/userInfo'){     
    const { query } = url.parse(req.url, true) 
    const result = new Promise((resolve, reject) => {
      UserModel.findOne({userId: query['userId']}, function(err, doc){
        if(!err){
          resolve(doc)          
          }
        })  
      })   
    return result  
  }
}
module.exports = handUserRouter
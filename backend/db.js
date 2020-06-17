//引入mongoose操作mongoDB数据库服务器
// const onlinePath = '/www/server/nvm/versions/node/v12.16.0/lib/node_modules/'
// const mongoose = require(onlinePath + 'mongoose')

const mongoose = require('mongoose')

//连接词典
const conn1 = mongoose.createConnection('mongodb://localhost/dict', { useNewUrlParser: true, useUnifiedTopology: true })
//单词释义集合约束
const wordSchema = new mongoose.Schema({
  word: String,
  meanings: Array
})
const WordModel = conn1.model('words', wordSchema)
//例句集合约束
const sentenceSchema = new mongoose.Schema({
  count: Number,
  sentence: String
})
const SentenceModel = conn1.model('sentences', sentenceSchema)

//连接用户信息
const conn2 = mongoose.createConnection('mongodb://localhost/userInfo', { useNewUrlParser: true, useUnifiedTopology: true })
const userSchema = new mongoose.Schema({
  userId: String,
  username: String,
  password: String,  
  wordbase: Array,
  sentences: Array 
})
const UserModel = conn2.model('users', userSchema)

module.exports = {
  WordModel,
  SentenceModel,
  UserModel
}


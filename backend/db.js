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

module.exports = {
  WordModel,
  UserModel
}


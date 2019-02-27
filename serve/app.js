var express = require('express')
var bodyParser = require('body-parser')
var routerTopic = require('./dataBase/topic.js')
var routerUser = require('./dataBase/user.js')
var routerComment = require('./dataBase/comment.js')
var path = require('path')
var session = require('express-session')

var app = express()
app.use('/node_moudle/', express.static(path.join(__dirname, '../node_modules/')))

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'itcast',
  resave: false,
  saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

app.use(routerTopic)
app.use(routerUser)
app.use(routerComment)

app.listen(3000, function () {
  console.log('Serve is running')
})

module.exports = app

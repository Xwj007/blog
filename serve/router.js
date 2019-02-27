var express = require('express')
var db = require('./dataBase/mysql.js')
var md5 = require('blueimp-md5')

var router = express.Router()

// router.get("/api/login",function(req,res){
//   //获取sesssion
//   if(req.session.userName){  /*获取*/
//       res.status(200).json({
//         err_code:1,
//         message:'已登录',
//         session:req.session.userName
//       })
//   }else{
//     res.status(200).json({
//       err_code:0,
//       message:'未登录',
//     })
//   }
// });
// router.post('/api/login', (req, res, next) => {
//   req.body.password = md5(md5(req.body.password))
//   var consumer = [
//     req.body.email,
//     req.body.password
//   ]
//   db.findById(consumer, function (err, results) {
//     console.log(err)
//     if (!results) {
//       return res.status(200).json({
//         err_code: 0,
//         message: '邮箱或密码不正确'
//       })
//     }
//     req.session.userName = results.nickname
//     res.status(200).json({
//       err_code: 1,
//       message: '登陆成功',
//       session: req.session.userName
//     })
//   })
// })

// router.post('/api/register', function (req, res) {
//   db.findByEmail(req.body.email, function (err, results) {
//     console.log(err)
//     if (results) {
//       return res.status(200).json({
//         err_code: '0',
//         message: '邮箱已存在'
//       })
//     }
//     req.body.password = md5(md5(req.body.password))
//     var consumer = [
//       req.body.email,
//       req.body.nickname,
//       req.body.password
//     ]
//     req.session.userName = consumer[1]
//     db.insertUser(consumer, function (err) {
//       if (err) {
//         return res.status(200).json({
//           err_code: 2,
//           message: '注册失败'
//         })
//       }
//       res.status(200).json({
//         err_code: 1,
//         message: '注册成功',
//         session: req.session.userName
//       })
//     })
//   })
// })

// router.get('/api/logout',function (req,res) {
//   console.log(111)
//   req.session.userName = null
//   console.log(req.session.userName)
//   res.status(200).json({
//     err_code:1,
//     message:'退出'
//   })
// })

// router.post('/api/topic',function (params) {
  
// })

module.exports = router

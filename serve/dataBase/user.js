var express = require('express')
var db = require('./mysql.js')
var md5 = require('blueimp-md5')
var router = express.Router()

var sql = 'SELECT * FROM user';

db.query(sql,[],function(err, results, fields){
    if (err) {
        // console.log('err:',err);
        // console.log('rows : ', results[0])
        // console.log('fields : ', fields)
        return;
    }
    // console.log('err:',err);
        // console.log('rows : ', results)
        // console.log('fields : ', fields)
})

router.get("/api/login",function(req,res){
  //获取sesssion
  if(req.session.userName){  /*获取*/
      res.status(200).json({
        err_code:1,
        message:'已登录',
        session:req.session.userName
      })
  }else{
    res.status(200).json({
      err_code:0,
      message:'未登录',
    })
  }
});

router.post('/api/login', (req, res, next) => {
  req.body.password = md5(md5(req.body.password))
  var consumer = [
    req.body.email,
    req.body.password
  ]
  var sql2='SELECT * FROM `user` where email=? AND password=?'
  db.query(sql2,consumer,function (err,results,fields) {
    if (!results[0]) {
      return res.status(200).json({
        err_code: 0,
        message: '邮箱或密码不正确'
      })
    }
    req.session.userName = results[0].nickname
    res.status(200).json({
      err_code: 1,
      message: '登陆成功',
      session: req.session.userName
    })
  })
})

// 注册
router.post('/api/register', function (req, res) {
  var email = [req.body.email]
  db.query('SELECT * FROM `user` where email=?',email, function (err, results,fields) {
    if (results[0]) {
      return res.status(200).json({
        err_code: '0',
        message: '邮箱已存在'
      })
    }
    db.query('SELECT * FROM `user` where nickname=?',[req.body.nickname],function (err, results,fields) {
      if (results[0]) {
        return res.status(200).json({
          err_code: '3',
          message: '昵称已存在'
        })
      }
      req.body.password = md5(md5(req.body.password))
      var consumer = [
        req.body.email,
        req.body.nickname,
        req.body.password,
        req.body.created_time
      ]
      req.session.userName = consumer[1]
      db.query('INSERT user (email,nickname,password,created_time) VALUES(?,?,?,?)',consumer, function (err,results,fields) {
        if (err) {
          return res.status(200).json({
            err_code: 2,
            message: '注册失败'
          })
        }
        res.status(200).json({
          err_code: 1,
          message: '注册成功',
          session: req.session.userName
        })
      })
    })

  })
})

// 注销
router.get('/api/logout',function (req,res) {
  req.session.userName = null
  res.status(200).json({
    err_code:1,
    message:'退出'
  })
})

// 获取个人资料
router.get('/api/getInfo',(req,res,next)=>{
  db.query('SELECT * FROM `user` where nickname=?',req.query.nickname,(err,results,fields)=>{
    if (err) {
      return res.status(200).json({
        err_code: '0',
        message: '获取失败'
      })
    }
    res.status(200).json({
      err_code: '1',
      message: '获取成功',
      data:results[0]
    })
  })
})

// 修改个人资料
router.post('/api/changeInfo',(req,res,next)=>{
  console.log(req.body)
  var consumer = Object.values(req.body)
  db.query('UPDATE user SET email=?,nickname=?,password=?,created_time=?,avatar=?,gender=?,birthday=?,status=?,bio=? WHERE id = ?',consumer,(err,results,fields)=>{
    if(err){
      return res.status(200).json({
        err_code:0,
        message:'修改错误'
      })
    }
    // console.log()
    res.status(200).json({
      err_code:1,
      message:'修改成功',
      data:results[0]
    })
  })
})
module.exports = router
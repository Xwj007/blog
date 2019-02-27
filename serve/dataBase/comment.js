var express = require('express')
var db = require('./mysql.js')

var router = express.Router()

// 根据topic——id获取所有评论
router.get('/api/getComentsById',(req,res,next) => {
  db.query('SELECT * FROM comment WHERE topic_no=?',req.query.topic_no,(err,results,fields) => {
    if (err) {
      return res.status(200).json({
        err_code: '0',
        message: '获取失败'
      })
    }
    res.status(200).json({
      err_code: '1',
      message: '获取成功',
      data:results
    })  
  })
})

// 发表评论
router.post('/api/addComment',(req,res,next) => {
  var consumer = [
    req.body.nickname,
    req.body.content,
    req.body.time,
    req.body.topic_no
  ]
  db.query('insert comment (nickname,content,time,topic_no) VALUES(?,?,?,?)',consumer, (err,results,fields)=> {
    if (err) {
      return res.status(200).json({
        err_code: '0',
        message: '获取失败'
      })
    }
    res.status(200).json({
      err_code: '1',
      message: '获取成功',
      data:results
    }) 
  })
})

module.exports = router
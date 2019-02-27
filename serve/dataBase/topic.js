var express = require('express')
var db = require('./mysql.js')

var router = express.Router()

// 查询所有话题
router.get('/api/topicAll',function (req,res,next) {
  db.query('SELECT * FROM topic',[],function (err,results,fields) {
    if(err){
      return res.status(200).json({
        err_code:0,
        message:'查询错误'
      })
    }
    res.status(200).json({
      err_code:1,
      message:'查询成功',
      data:results
    })
  })
})
// 按根据昵称查话题
router.post('/api/topicByNickname',function (req,res,next) {
  db.query('SELECT * FROM topic where posted_name=?',req.body.nickname,function (err,results,fields) {
    if (err) {
      return res.status(200).json({
        err_code:0,
        message:'查询失败',
      })
    }
    res.status(200).json({
      err_code:1,
      message:'查询成功',
      data:results
    })
  })
})

// 增加话题
router.post('/api/insertTopic',function (req,res,next) {
  var comsumer =Object.values(req.body)
  db.query('INSERT topic (topic_name,topic_content,posted_name,posted_time) VALUES(?,?,?,?)',comsumer,function (err,results,fields) {
    if (err) {
      return res.status(200).json({
        err_code:0,
        message:'添加错误'
      })
    }
    res.status(200).json({
      err_code:1,
      message:'添加成功',
    })
  })
})

// 修改话题
router.post('/api/editById',(req,res,next) =>{
  var comsumer =Object.values(req.body)
  db.query('UPDATE topic SET topic_name = ?,topic_content = ?,posted_name=?,posted_time=? WHERE topic_id = ?',comsumer,(err,results,fields)=>{
    if (err) {
      return res.status(200).json({
        err_code:0,
        message:'编辑失败'
      })
    }
    res.status(200).json({
      err_code:1,
      message:'编辑成功',
    })
  })
})
// 删除话题
router.post('/api/deleteById',function (req,res,next) {
  db.query('DELETE FROM topic where topic_id=?',req.body.id,function (err,results,fields) {
    if (err) {
      return res.status(200).json({
        err_code:0,
        message:'删除失败'
      })
    }
    res.status(200).json({
      err_code:1,
      message:'删除成功',
    })
  })
})
module.exports = router
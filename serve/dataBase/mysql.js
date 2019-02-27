// var db    = {};
var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
	database        : 'blog',
	timezone        : "08:00"
});
exports.query = function(sql, arr, callback){
	//建立链接
	pool.getConnection(function(err,connection){
			if(err){return callback(err)}
			connection.query(sql,arr,function(error,results,fields){
					//将链接返回到连接池中，准备由其他人重复使用
					connection.release();
					if(error) throw error;
					//执行回调函数，将数据返回
					callback && callback(error,results,fields);
			});
	});
};
 
// db.query = function(sql,arr,callback){
// 	if (!sql) {
// 		callback();
// 		return;
// 	}
// 	pool.query(sql, function(err, rows, fields) {
// 	  if (err) {
// 	    console.log(err);
// 	    callback(err, null);
// 	    return;
// 	  };
// 	  callback(null, rows, fields);
// 	});
// }
// module.exports = db;

// var mysql = require('mysql')

// var connection = mysql.createConnection({
//   host : 'localhost',
//   user : 'root',
//   password: 'root',
//   database: 'blog'
// })

// connection.connect(mysql)

// module.exports 
// // 查找用户表
// // exports.find = function (callback) {
// //   connection.query('SELECT * FROM user', function (err, results, fields) {
// //     if (err) {
// //       return callback(err)
// //     }
// //     // console.log(results)
// //     callback(null, results)
// //   })
// // }
// exports.findById = function (consumer, callback) {
//   connection.query('SELECT * FROM `user` where email=? AND password=?', consumer, function (err, results) {
//     if (err) {
//       console.log(err)
//       return callback(err)
//     }
//     console.log(err)
//     callback(null, results[0])
//   })
// }

// exports.findByEmail = function (email, callback) {
//   connection.query('SELECT email FROM `user` where email=?', email, function (err, results) {
//     if (err) {
//       return callback(err)
//     }
//     callback(null, results[0])
//   })
// }

// exports.insertUser = function (consumer, callback) {
//   connection.query('INSERT user (email,nickname,password) VALUES(?,?,?)', consumer, function (err, results) {
//     if (err) {
//       return callback(err)
//     }
//     callback(null)
//   })
// }

// // topic crud
// exports.findAllTopic = function name(params) {
  
// }



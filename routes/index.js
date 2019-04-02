var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");

/* GET home page. */
router.get('/', function (req, res, next) {
  // 查询分类有流行关键词的数据
  var str = 'SELECT s1.*,s2.singerName,s3.CDName \
  FROM `歌曲列表`as s1, `歌手信息` as s2, 专辑列表 as s3\
  where classify like "%华语%"\
  and s1.SingerId = s2.singerID\
  and s1.CDId = s3.CDId\
  ORDER BY Id LIMIT 10';
  // 搜索最新插入的10条歌曲数据
  var str2 = 'select s1.*,s2.singerName from 歌曲列表 as s1,歌手信息 as s2\
  where s1.SingerId = s2.singerID\
  order by s1.addTime desc\
  limit 10';
  var str3 = 'select s1.*,s2.singerName from 歌曲列表 as s1,歌手信息 as s2\
  where s1.SingerId = s2.singerID\
  order by s1.clicks desc\
   limit 10';
  // console.log(str)
  db.query(str, function (err, rows) {
    // console.log(rows)
    if (err) {
      res.end('修改页面跳转失败：' + err);
    } else {
      db.query(str2, function (err, rows2) {
        // console.log(rows)
        if (err) {
          res.render('users.html', {
            user: req.session.user,
            userId: req.session.userId,
            datas: rows,
          });
        } else {
          db.query(str3, function (err, rows3) {
            // console.log(rows)
            if (err) {
              res.render('users.html', {
                user: req.session.user,
                userId: req.session.userId,
                datas: rows,
                data2: rows2
              });
            } else {
              res.render('users.html', {
                user: req.session.user,
                userId: req.session.userId,
                datas: rows,
                data2: rows2,
                data3: rows3
              });
            }
          })
        }
      });
    }
  });
  // res.render('users.html', {
  //     user: req.session.user,
  // userId:req.session.userId
  // });     
});

//登录
router.post('/login', function (req, res, next) {
  var queryString = "select * from 用户列表 where accounts='" + req.body.accounts + "' and password ='" + req.body.password + "'";
  // console.log(queryString);
  db.query(queryString, function (err, user) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    } else if (req.body.accounts.length == 0) {

      return res.status(200).json({
        err_code: 2,
        message: ''
      })
    } else if (user == '') {
      return res.status(200).json({
        err_code: 1,
        message: 'account or password is invalid.'
      })
    } else {
      // 用户存在，登陆成功，通过 Session 记录登陆状态
      req.session.user = user;
      req.session.userId = user[0].userId;
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    }
  })
});


//注册
router.post('/register', function (req, res) {
  // 1. 获取表单提交的数据
  //    req.body
  // 2. 操作数据库
  //    判断改用户是否存在
  //    如果已存在，不允许注册
  //    如果不存在，注册新建用户
  // 3. 发送响应
  var body = req.body,
    accounts = body.accounts,
    password = body.password;
  var queryString = "select * from 用户列表 where accounts='" + accounts + "'";
  var queryString2 = "insert into 用户列表(accounts,password,nickname,photo) values('" + accounts + "','" + password + "','" + req.body.nickname + "','touxiang.jpg')";
 console.log(queryString2)
  db.query(queryString, function (err, data, fields) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: '服务端错误'
      })
    } else if (data.length !== 0) {
      // 邮箱或者昵称已存在
      return res.status(200).json({
        err_code: 1,
        message: 'account or password aleady exists.'
      })
    } else if (req.body.accounts.length == 0 || req.body.password.length == 0) {

      return res.status(200).json({
        err_code: 2,
        message: ''
      })
    }


    db.query(queryString2, function (err, user) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: 'Internal error.'
        })
      }

      // // 注册成功，使用 Session 记录用户的登陆状态
      // req.session.user = user;
      // Express 提供了一个响应方法：json
      // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    })

    db.query(queryString, function (err, user) {

      // console.log('user' + JSON.stringify(user))
      // 用户存在，登陆成功，通过 Session 记录登陆状态
      req.session.user = user;
      req.session.userId = user[0].userId;
    })
  })
})

//退出帐号
router.get('/exit', function (req, res) {
  req.session.user = null;
  res.redirect('/');
})


// 查找歌曲类别为华语的歌曲
router.get('/find/classify1', function (req, res, next) {
  var str = 'SELECT s1.*,s2.singerName,s3.CDName \
  FROM `歌曲列表`as s1, `歌手信息` as s2, 专辑列表 as s3\
  where classify like "%华语%"\
  and s1.SingerId = s2.singerID\
  and s1.CDId = s3.CDId';
  db.query(str, function (err, rows) {
    if (err) {
      console.log(err);
      res.send('操作失败');
    } else {
      res.send(rows)
    }
  });
});
// 查找歌曲类别为流行的歌曲
router.get('/find/classify2', function (req, res, next) {
  var str = 'SELECT s1.*,s2.singerName,s3.CDName \
  FROM `歌曲列表`as s1, `歌手信息` as s2, 专辑列表 as s3\
  where classify like "%流行%"\
  and s1.SingerId = s2.singerID\
  and s1.CDId = s3.CDId';
  db.query(str, function (err, rows) {
    if (err) {
      console.log(err);
      res.send('操作失败');
    } else {
      res.send(rows)
    }
  });
});
// 查找歌曲类别为摇滚的歌曲
router.get('/find/classify3', function (req, res, next) {
  var str = 'SELECT s1.*,s2.singerName,s3.CDName \
  FROM `歌曲列表`as s1, `歌手信息` as s2, 专辑列表 as s3\
  where classify like "%摇滚%"\
  and s1.SingerId = s2.singerID\
  and s1.CDId = s3.CDId';
  db.query(str, function (err, rows) {
    if (err) {
      console.log(err);
      res.send('操作失败');
    } else {
      res.send(rows)
    }
  });
});
// 查找歌曲类别为民谣的歌曲
router.get('/find/classify4', function (req, res, next) {
  var str = 'SELECT s1.*,s2.singerName,s3.CDName \
  FROM `歌曲列表`as s1, `歌手信息` as s2, 专辑列表 as s3\
  where classify like "%民谣%"\
  and s1.SingerId = s2.singerID\
  and s1.CDId = s3.CDId';
  db.query(str, function (err, rows) {
    if (err) {
      console.log(err);
      res.send('操作失败');
    } else {
      res.send(rows)
    }
  });
});
// 查找歌曲类别为电子的歌曲
router.get('/find/classify5', function (req, res, next) {
  var str = 'SELECT s1.*,s2.singerName,s3.CDName \
  FROM `歌曲列表`as s1, `歌手信息` as s2, 专辑列表 as s3\
  where classify like "%电子%"\
  and s1.SingerId = s2.singerID\
  and s1.CDId = s3.CDId';
  db.query(str, function (err, rows) {
    if (err) {
      console.log(err);
      res.send('操作失败');
    } else {
      // console.log(rows)
      res.send(rows)
    }
  });
});
module.exports = router;

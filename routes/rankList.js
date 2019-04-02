var express = require('express');
var router = express.Router();
var url = require('url');
//引入数据库包
var db = require("./db.js");

//查询前50首最新插入的歌曲
router.get('/newList', function (req, res, next) {
    var str = 'select s1.*,s2.singerName from 歌曲列表 as s1,歌手信息 as s2\
    where s1.SingerId = s2.singerID\
    order by s1.addTime desc ';
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
           res.send(rows)
        }
    });
});



//查询前50首点击次数最多的歌曲
router.get('/hotList', function (req, res, next) {
    var str = 'select s1.*,s2.singerName from 歌曲列表 as s1,歌手信息 as s2\
    where s1.SingerId = s2.singerID\
    order by s1.clicks desc ';
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
           res.send(rows)
        }
    });
});



module.exports = router;
var express = require('express');
var router = express.Router();
var url = require('url');
//引入数据库包
var db = require("./db.js");

//渲染歌手界面
router.get('/selectSinger', function (req, res, next) {
    // var str = 'select * from 歌手信息';
    var str1 = 'SELECT s2.MusicName,s1.singerID,s1.singerImg,s1.singerName FROM `歌手信息` as s1,歌曲列表 as s2 where s1.singerID = s2.SingerId';
    // console.log(str);
    db.query(str1, function (err, rows) {
        // console.log(rows)
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
           res.send(rows)
        }
    });
});


router.get('/artist/id=:artistId', function (req, res, next) {
    console.log(req.params);
    var artistId = req.params.artistId;
    var str = 'select s1.*, s2.*,s3.CDName from 歌手信息 as s1,歌曲列表 as s2, 专辑列表 as s3 \
    where s1.singerID = s2.SingerId and s2.CDId = s3.CDId and s1.singerID = ' + artistId;
    console.log(str);
    db.query(str, function (err, rows) {
        // console.log(rows)
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
           res.send(rows)
        }
    });
});

// 查询歌手作品  专辑
router.get("/artist/singerId=:singerId", function (req, res, next) {
    var singerId = req.params.singerId;
    var str = 'SELECT s1.*,s2.singerName FROM `专辑列表` as s1, `歌手信息` as s2\
    where s1.singerId = s2.singerID\
    and s1.singerId =' + singerId;;
    // console.log(str);
    db.query(str, function (err, rows) {
        // console.log(rows)
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
           res.send(rows)
        }
    });
});

// 查询专辑包含的歌曲
router.get("/artist/CDId=:CDId", function (req, res, next) {
    var CDId = req.params.CDId;
    var str = 'SELECT s1.*,s2.singerName,s3.* FROM `专辑列表` as s1, `歌手信息` as s2,`歌曲列表` as s3\
    where s1.singerId = s2.singerID\
    and s1.CDId = s3.CDId\
    and s1.CDId =' + CDId;;
    // console.log(str);
    db.query(str, function (err, rows) {
        // console.log(rows)
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
           res.send(rows)
        }
    });
});

module.exports = router;

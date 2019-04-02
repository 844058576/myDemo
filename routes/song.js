var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");

router.get('/song/id=:songId', function (req, res, next) {
    var songId = req.params.songId;
    var str = "select s1.*, s2.singerName,s3.CDImg,s3.CDName from 歌曲列表 as s1,歌手信息 as s2,专辑列表 as s3\
    where s1.SingerId = s2.singerID \
    and s1.CDId = s3.CDId\
    and s1.id = " + songId;
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

//查找歌曲
router.post('/search', function (req, res, next) {
    var str = "SELECT s1.* ,s2.*,s3.* FROM `歌曲列表`as s1,`歌手信息` as s2, 专辑列表 as s3\
              where MusicName like '%" + req.body.item + "%'\
              and s1.SingerId = s2.singerID\
              and s1.CDId = s3.CDId";
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
})
//查找歌手
router.post('/search/singer', function (req, res, next) {
    var str = "SELECT * FROM `歌手信息` where singerName like '%" + req.body.item + "%'";
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
})

//查找专辑
router.post('/search/album', function (req, res, next) {
    var str = "SELECT s1.*,s3.* FROM `专辑列表` as s1, `歌曲列表` as s2, `歌手信息` as s3\
            where CDName like '%" + req.body.item + "%'\
            and s1.CDId = s2.CDId\
            and s2.SingerId = s3.singerID";
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
})


// 显示歌曲评论
router.get('/comment/songId=:songId', function (req, res, next) {
    var str = "SELECT s1.*,s2.nickname,s2.photo FROM `评论列表` as s1, `用户列表` as s2\
    where songId = "+ req.params.songId+"\
    and s1.userId = s2.userId;";
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
})

//插入评论
router.post('/comment/song', function (req, res, next) {
    var str = "insert into 评论列表(userId,content,songId,c_time) \
    value('"+ req.body.userId+"','"+ req.body.content +"','"+req.body.songId+"','"+req.body.c_time+"')";
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
})

//删除评论
router.get('/comment/delete=:id', function (req, res) {
    db.query("delete from `评论列表` where id=" + req.params.id, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows);
        }
    });
});


//回复评论
router.post('/comment/replay', function (req, res) {
    var str = "insert into 评论列表(userId,content,p_nick,p_content,songId,c_time) \
    value('"+ req.body.userId+"','"+ req.body.content +"','"+req.body.p_nick+"','"+req.body.p_content+"','"+req.body.songId+"','"+req.body.c_time+"')";
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows);
        }
    });
});
//增加一次播放次数
router.post('/comment/addplay', function (req, res) {
    var str = "update 歌曲列表 set clicks = clicks + 1 where Id = " + req.body.songId;
    console.log(str)
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;
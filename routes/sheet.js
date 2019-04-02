var express = require('express');
var router = express.Router();
var url = require('url');
//引入数据库包
var db = require("./db.js");

//渲染我的歌单列表
router.get('/my', function (req, res, next) {
    var id = req.session.userId;
    var str = 'select s1.*, s2.nickname, s2.photo\
    from 歌单列表 as s1, 用户列表 as s2\
    where s1.userId = s2.userId\
    and s1.userId = ' + id;
    // console.log(str);
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});

//渲染每个歌单有多少首歌曲
router.get('/my/songsheet=:l', function (req, res, next) {
    var id = req.session.userId;
    var sheetId = req.params.l;
    var str = 'SELECT count(songSheet) as count FROM `收藏列表` where songSheet =' + sheetId + ' and userId = ' + id;
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

//点击歌单将第一个歌单的歌曲显示出来
router.get('/my/defaultId=:defaultId', function (req, res, next) {
    var id = req.session.userId;
    var sheetId = req.params.defaultId;
    console.log(sheetId)
    var str = 'SELECT s2.*,s1.id as sheetId,s4.* ,s5.singerName   FROM 歌单列表 as s1, 歌曲列表 as s2, 收藏列表 as s3,专辑列表 as s4,歌手信息 as s5  \
    where  s1.id = s3.songSheet \
    and s2.id = s3.songId    and s2.CDId = s4.CDId \
    and s2.SingerId = s5.singerID\
    and s3.songSheet =' + sheetId + ' and s3.userId = ' + id;
    // console.log(str);
    db.query(str, function (err, rows) {
        console.log(rows)
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});

// 渲染歌单 显示该歌单的用户添加的歌曲
router.get('/my/sheetId=:sheetId', function (req, res, next) {
    // console.log(req.session.sheet);
    var sheetId = req.params.sheetId;
    // console.log('params:'+JSON.stringify(req.params))

    var str = 'select s4.Id,s1.songSheet,s1.songImg,s1.addTime ,s2.nickname,s2.photo,s3.songSheet as sheetId,\
    s4.MusicName,s4.songTime,s5.SingerName,s6.CDName\
    from 歌单列表 as s1,用户列表 as s2,收藏列表 as s3 ,歌曲列表 as s4,\
    歌手信息 as s5, 专辑列表 as s6\
    where s1.userId = s2.userId and s1.id = s3.songSheet\
    and s3.songId = s4.id and s5.singerId = s4.SingerId\
    and s4.CDId = s6.CDId and s1.id = ' + sheetId;
    // console.log(str) 
    db.query(str, function (err, rows) {
        console.log(rows)
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});



//增加歌单
router.post('/addSheet', function (req, res) {
    var songSheet = req.body.songSheet;
    var userId = req.session.userId;
    console.log(JSON.stringify(req.body));
    console.log(songSheet);
    console.log(userId);
    var str = "insert into 歌单列表(userId,songSheet,songImg,addTime) value(" + userId + ",'" + songSheet + "','introSong.jpg','" + req.body.time + "')";
    console.log(str);
    db.query(str, function (err, rows) {
        if (err) {
            res.send('新增失败：' + err);
        } else {
            res.send(rows)
        }
    })
});

//删除歌单
router.get('/delSheet/:id', function (req, res) {
    var id = req.params.id;
    db.query("delete from 歌单列表 where id=" + id, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            // res.redirect('/my')
            res.send(rows);
        }
    });
});


// 查询当前歌单信息进入编辑页面
router.get("/editSheet/songSheetId=:id", function (req, res) {
    var id = req.params.id;
    var str = 'select * from `歌单列表` where  id =' + id;
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows);
        }
    });
})
// 更新歌单信息
router.post("/editSheet/songSheetId=:sheetId", function (req, res) {
    // console.log(req.body);
    // console.log(req.body.songSheet);
    // console.log(req.body.introduce);
    var id = req.body.id;
    var songSheet = req.body.songSheet;
    var introduce = req.body.introduce;
    var str = "update 歌单列表 set songSheet = '" + songSheet + "' ,introduce = '" + introduce + "' where id = '" + id + "'";
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows);
        }
    });
})
//删除歌单内的歌曲
router.post('/delSheet/songId', function (req, res) {
    var Id = req.body.Id;
    var sheetId = req.body.sheetId;
    var str = 'delete from 收藏列表 where songId= "'+ Id +'"\
    and songSheet =' + sheetId;
    console.log(sheetId);
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            // res.redirect('/my')
            res.send(rows);
        }
    });
});


module.exports = router;

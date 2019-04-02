var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");

/* GET home page. */
router.get('/play=:userId', function (req, res, next) {
    var str = 'SELECT s1.id as playId,s1.userId,s1.songId,s2.*,s3.CDName,s3.CDImg,s4.singerName FROM `播放列表` as s1,歌曲列表 as s2, `专辑列表` as s3,\
    歌手信息 as s4\
    where s1.songId = s2.id\
    and s2.CDId = s3.CDId\
    and s2.SingerId = s4.singerID\
    and s1.userId =' + req.params.userId ;
    console.log(str)
    db.query(str, function (err, rows){
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
           res.send(rows)
        }
    });
});


router.post('/collect/addSheet', function (req, res, next) {
    var userId = req.body.userId;
    var songId = req.body.songId;
    var songSheet = req.body.sheetId;
    var str = "select userId,songId,songSheet from 收藏列表 \
                where userId = "+ userId +" and\
                songId = "+ songId +" and\
                songSheet = "+ songSheet +"";
    var str1 = "insert into 收藏列表(userId,songId,songSheet) values('" + userId + "','" + songId + "','" + songSheet + "')";
    db.query(str,function(err,rows){
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            console.log(rows)
            if(rows == 0){
                db.query(str1, function (err, rows2){
                    if (err) {
                        console.log(err);
                        res.send('操作失败');
                    } else {
                       res.send(rows2)
                    }
                });
            }else{
                res.send('歌曲已存在')
            }
        }
    })
    
});

router.get('/collect/del/:colId', function (req, res, next) {
    var id = req.params.colId;
    var str = "delete  from 播放列表 where id = " + id;
    db.query(str, function (err, rows){
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
           res.send(rows)
        }
    });
})


router.post('/saveSong', function (req, res, next) {
    var userId = req.body.userId;
    var songId = req.body.songId;
    var str = "SELECT * FROM `播放列表` where userId = "+userId +" and songId = "+songId +"";
    var str1 = "insert into `播放列表`(userId,songId) values('" + userId + "','" + songId + "')";
    db.query(str, function (err, rows){
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            if(rows == 0){
                db.query(str1, function (err, rows2){
                    if (err) {
                        console.log(err);
                        res.send('操作失败');
                    } else {
                       res.send(rows2)
                    }
                });
            }else{
                res.send('歌曲已存在')
            }
        }
    });
})


module.exports = router;
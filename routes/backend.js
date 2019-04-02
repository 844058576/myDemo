var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");

router.get('/backend', function (req, res, next) {
    res.render('backend/index.html');
   
});


//登录
router.post('/backend', function (req, res, next) {
    var queryString = "select * from 管理员表 where account='" + req.body.account + "' and password ='" + req.body.password + "'";
    console.log(queryString);
    db.query(queryString, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else if (req.body.account.length == 0 || req.body.password.length == 0) {
            res.send('帐号或密码为空')
        } else if (rows == '') {
            res.send('未找到该用户')
        }
        else {
            req.session.back = rows;
            res.redirect('/administration');
        }
    })
});

// 渲染后台页面
router.get('/administration', function (req, res, next) {
    var str = 'select * from `用户列表`';
    db.query(str, function (err, rows) {
        req.session.user2 = rows;
        console.log(rows)
        if (err) {
            res.end('修改页面跳转失败：' + err);
        } else {
            res.render('backend/admin.html', {
                back: req.session.back,
                user2: req.session.user2
              });      //直接跳转
        }
    });
});
//渲染用户管理页面
router.get('/administration/user', function (req, res, next) {
    var str = 'select * from `用户列表`';
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});
//添加用户界面
router.post('/administration/adduser', function (req, res, next) {
    var str = "insert into 用户列表(accounts,password,nickname,Introduce,gender,birthday,photo) \
    values('" + req.body.accounts + "','" + req.body.password + "','" + req.body.nickname + "',\
    '" + req.body.Introduce + "','" + req.body.gender + "','" + req.body.birthday + "','" + req.body.photo + "')";
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});
//删除用户
router.get('/administration/deluser=:userId', function (req, res, next) {
    var str = "delete from 用户列表 where userId=" + req.params.userId;
    console.log(str)
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});
//渲染歌手管理页面
router.get('/administration/singer', function (req, res, next) {
    var str = 'select * from `歌手信息`';
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});
//添加歌手
router.post('/administration/addSinger', function (req, res, next) {
    console.log(req.body.singerName)
    console.log(req.body.singerImg)
    console.log(req.body.Description)
    var str = 'insert into 歌手信息(singerName,singerImg,Description) \
    values("' + req.body.singerName + '","' + req.body.singerImg + '","' + req.body.Description + '")';
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});

//查看当前歌手信息
router.get('/administration/singer=:singerID', function (req, res, next) {
    var str = 'select * from `歌手信息` where singerID = ' + req.params.singerID;
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});
//修改当前歌手信息
router.post('/administration/updSinger', function (req, res, next) {
    console.log(req.body.singerName)
    console.log(req.body.singerImg)
    // console.log(req.Description)
    console.log(JSON.stringify(req.body))
    var str = "update 歌手信息 set singerName='" + req.body.singerName + "',singerImg='" + req.body.singerImg + "',Description='" + req.body.Description + "' where singerID=" + req.body.singerID;
    // console.log(str)
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});
//删除歌手
router.get('/administration/delSinger=:singerID', function (req, res, next) {
    var str = "delete from 歌手信息 where singerID=" + req.params.singerID;
    // console.log(str)
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});
//查找歌曲信息
router.get('/administration/song', function (req, res, next) {
    var str = "select s1.*,s2.singerName,s3.CDName\
    from 歌曲列表 as s1,`歌手信息` as s2,`专辑列表` as s3\
    where s1.SingerId = s2.singerID\
    and  s1.CDId = s3.CDId";
    // console.log(str)
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});

//添加歌曲界面
router.post('/administration/addSong', function (req, res, next) {
    var str = "insert into 歌曲列表(MusicName,SingerId,MusicUrl,Lyric,CDId,songTime,addTime) \
    values('" + req.body.MusicName + "'," + req.body.SingerId + ",'" + req.body.MusicUrl + "',\
    '" + req.body.Lyric + "'," + req.body.CDId + "," + req.body.songTime + ",'" + req.body.addTime + "')";
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});

//查看当前歌曲信息
router.get('/administration/song=:Id', function (req, res, next) {
    var str = 'select * from `歌曲列表` where Id = ' + req.params.Id;
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});

//修改当前歌曲信息
router.post('/administration/editSong', function (req, res, next) {
    console.log(req.body.singerName)
    console.log(req.body.singerImg)
    // console.log(req.Description)
    console.log(JSON.stringify(req.body))
    var str = "update 歌曲列表 set MusicName='" + req.body.MusicName + "',SingerId=" + req.body.SingerId + "\
    ,MusicUrl='" + req.body.MusicUrl + "',Lyric='" + req.body.Lyric + "',CDId=" + req.body.CDId + "\
    ,songTime=" + req.body.songTime + " where Id=" + req.body.Id;
    console.log(str)
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});

//删除歌曲
router.get('/administration/delSong=:Id', function (req, res, next) {
    var str = "delete from 歌曲列表 where Id=" + req.params.Id;
    console.log(str)
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});

//查找专辑信息
router.get('/administration/album', function (req, res, next) {
    var str = "select * from 专辑列表";
    // console.log(str)
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});

//添加专辑界面
router.post('/administration/addAlbum', function (req, res, next) {
    var str = "insert into 专辑列表(CDName,singerId,CDImg) \
    values('" + req.body.CDName + "'," + req.body.singerId + ",'" + req.body.CDImg + "')";
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});
//查看当前专辑信息
router.get('/administration/editAlbum=:CDId', function (req, res, next) {
    var str = 'select * from `专辑列表` where CDId = ' + req.params.CDId;
    console.log(str)
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});
//修改当前专辑信息
router.post('/administration/editAlbum', function (req, res, next) {
    var str = "update 专辑列表 set CDName='" + req.body.CDName + "',singerId=" + req.body.singerId + ",CDImg='" + req.body.CDImg + "'\
     where CDId=" + req.body.CDId;
    console.log(str)
    db.query(str, function (err, rows) {
        if (err) {
            console.log(err);
            res.send('操作失败');
        } else {
            res.send(rows)
        }
    });
});
//删除当前专辑
router.get('/administration/delAlbum=:CDId', function (req, res, next) {
    var str = "delete from 专辑列表 where CDId=" + req.params.CDId;
    console.log(str)
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
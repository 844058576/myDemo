; (function () {
    if ($('.admin .user').css('display') == 'block') {
        var len = $('.admin .user tbody tr').length;
        console.log(len)
        for (var i = 0; i < len; i++) {
            console.log(i)
            changeDate(i);
        }
        if (!$('.admin .back').text()) {
            alert("请先登录");
            window.location.href = '/backend';
        }
    }

    $('.backend button').on('click', function () {
        var account = $('.backend #account').val();
        var password = $('.backend #password').val();
        // 验证用户是否存在、跳转页面
        $.post('/backend', { account, password }, function (data) {
            // console.log(data);
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else if (data == "帐号或密码为空") {
                alert("帐号或密码不能为空");
            } else if (data == "未找到该用户") {
                alert("未找到该用户");
            }
            else {
                window.location.href = '/administration';
            }
        })
    })
    //点击用户管理 显示用户列表的信息
    $('.admin .admin_left dl dt').eq(0).on('click', function () {
        userShow();
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.user').css({ display: "block" });
    })
    //显示用户列表的信息
    function userShow() {
        $.get('/administration/user', {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                $('.admin .admin_right .user table tbody').empty();
                console.log(data);
                $.each(data, function (i) {
                    var str = ' <tr>\
                        <td date-id="'+ data[i].userId + '">' + parseInt(i + 1) + '</td>\
                        <td>'+ data[i].accounts + '</td>\
                        <td>' + data[i].password + '</td>\
                        <td>' + data[i].nickname + '</td>\
                        <td>' + data[i].Introduce + '</td>\
                        <td class="gender">' + data[i].gender + '</td>\
                        <td class="birthday">' + data[i].birthday + '</td>\
                        <td><img src="../../public/images/index/' + data[i].photo + '" alt=""></td>\
                        <td><a href="void:0" class="addUser">添加</a> <a href="void:0" class="delUser">删除</a></td>\
                    </tr>';
                    $('.admin .admin_right .user table tbody').append(str);
                    changeDate(i);
                    if ($('.admin .admin_right tbody tr').eq(i).find('.gender').text() == 1) {
                        $('.admin .admin_right tbody tr').eq(i).find('.gender').text('男');
                    } else if ($('.admin .admin_right tbody tr').eq(i).find('.gender').text() == 2) {
                        $('.admin .admin_right tbody tr').eq(i).find('.gender').text('女');
                    } else if ($('.admin .admin_right tbody tr').eq(i).find('.gender').text() == 0) {
                        $('.admin .admin_right tbody tr').eq(i).find('.gender').text('保密');
                    }
                })
            }
        })
    }

    function changeDate(i) {       //将数据库拿出的日期修改为yyyy-mm-dd格式
        if ($('.admin .admin_right .user tbody tr').eq(i).find('.birthday').html()) {
            var time = $('.admin .admin_right .user tbody tr').eq(i).find('.birthday').html();
            var year = parseInt(time.replace(/^\"|\"$/g, '').substring(0, 4));
            var mon = parseInt(time.replace(/^\"|\"$/g, '').substring(5, 7));
            var day = parseInt(time.replace(/^\"|\"$/g, '').substring(8, 10)) + 1;
            if (mon == 1 || mon == 3 || mon == 5 || mon == 7 || mon == 8 || mon == 10 || mon == 12) {
                if (day == 32) {
                    day = 1;
                    mon = mon + 1;
                }
            }
            if (mon == 4 || mon == 6 || mon == 9 || mon == 11) {
                if (day == 31) {
                    day = 1;
                    mon = mon + 1;
                }
            }
            if (mon == 2) {
                if (day == 29) {
                    day = 1;
                    mon = mon + 1;
                }
            }
            if (mon == 13) {
                mon = 1;
                year = year + 1;
            }
            console.log(year, mon, day)
            if (isNaN(year) || isNaN(mon) || isNaN(day)) {
                $('.admin .admin_right .user tbody tr').eq(i).find('.birthday').html('');
            } else {
                $('.admin .admin_right .user tbody tr').eq(i).find('.birthday').html(year + '-' + mon + '-' + day);
            }
        }

    }
    //确定添加用户
    $('.admin .admin_right .addUser .confire').on('click', function (data) {
        var accounts = $('.admin .addUser #accounts').val();
        var password = $('.admin .addUser #password').val();
        var nickname = $('.admin .addUser #nickname').val();
        var Introduce = $('.admin .addUser #Introduce').val();
        var gender = $('.admin .addUser #gender').val();
        var birthday = $('.admin .addUser #birthday').val();
        var photo = 'touxiang.jpg';
        if (accounts.length == 0 || password.length == 0 || nickname.length == 0 || gender.length == 0 || Introduce.length == 0 || birthday.length == 0) {
            alert('输入框不能为空')
        } else if (gender != 0 && gender != 1 && gender != 2) {
            alert('性别只能是0、1、2')
        }
        else {
            $.post('/administration/adduser', { accounts, password, nickname, Introduce, gender, birthday, photo }, function () {
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");
                } else {
                    userShow();
                    $('.admin .admin_right').children().css({ display: 'none' });
                    $('.admin .admin_right').children('.user').css({ display: "block" });
                }
            })
        }
    })
    // 取消用户添加
    $('.admin .admin_right .addUser .cancel').on('click', function () {
        userShow();
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.user').css({ display: "block" });

    })

    //用户管理添加
    $('.admin').on('click', '.user table .addUser', function () {
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.addUser').css({ display: "block" });
    })
    // 用户管理 删除
    $('.admin').on('click', '.user table .delUser', function () {
        var userId = $(this).parents('tr').children(':first').attr('date-id');
        console.log(userId)
        if (!confirm('您确定删除吗？')) { return false; }
        $.get('/administration/deluser=' + userId, {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                userShow();
            }
        })
    })



    //点击歌手管理 显示歌手列表的信息
    $('.admin .admin_left dl dt').eq(1).on('click', function () {

        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.singer').css({ display: "block" });
        singerShow();
    })
    //渲染歌手信息
    function singerShow() {
        $('.admin .admin_right .singer table tbody').empty();
        $.get('/administration/singer', {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                $('.admin .admin_right .singer table tbody').empty();
                console.log(data);
                $.each(data, function (i) {
                    var str = ' <tr>\
                        <td date-id="'+ data[i].singerID + '">' + parseInt(i + 1) + '</td>\
                        <td>' + data[i].singerName + '</td>\
                        <td><img src="../../public/images/singer/' + data[i].singerImg + '" alt=""></td>\
                        <td>' + data[i].Description + '</td>\
                        <td><a href="void:0" class="addSinger">添加</a><a href="void:0" class="updSinger">修改</a><a href="void:0" class="delSinger">删除</a></td>\
                    </tr>';
                    // console.log(i)
                    $('.admin .admin_right .singer table tbody').append(str);
                })
            }
        })
    }
    // 点击添加歌手
    $('.admin ').on('click', '.singer .addSinger', function () {
        // alert(111)
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.addSinger').css({ display: "block" });
        // singerShow();
    })
    // 点击修改歌手
    $('.admin ').on('click', ' .singer .updSinger', function () {
        // alert(111)
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.editSinger').css({ display: "block" });
        var singerID = $(this).parents('tr').children(':first').attr('date-id');
        console.log(singerID)
        selSinger(singerID);
    })
    // 查找当前歌手信息
    function selSinger(singerID) {

        $.get('/administration/singer=' + singerID, {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");

            } else {
                // console.log(data[0].singerImg)
                $('.admin .editSinger #singerID').val(data[0].singerID);
                $('.admin .editSinger #singerName').val(data[0].singerName);
                $('.admin .editSinger #singerImg').val(data[0].singerImg);
                $('.admin .editSinger #Description').val(data[0].Description);
            }
        })
    }

    // 修改歌手确定事件
    $('.admin .editSinger form').on('click', function (e) {
        e.preventDefault()
    })
    $('.admin ').on('click', '.editSinger form .confire', function (e) {
        var singerID = $('.admin .editSinger #singerID').val();
        var singerName = $('.admin .editSinger #singerName').val();
        var singerImg = $('.admin .editSinger #singerImg').val();
        var Description = $('.admin .editSinger #Description').val();
        $.post('/administration/updSinger', { singerID, singerName, singerImg, Description }, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                // alert('成功')
                singerShow();
                $('.admin .admin_right').children().css({ display: 'none' });
                $('.admin .admin_right').children('.singer').css({ display: "block" });
            }
        })
    })
    //修改歌手取消事件
    $('.admin ').on('click', '.editSinger form .cancel', function (e) {
        singerShow();
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.singer').css({ display: "block" });
    })
    // 点击删除歌手
    $('.admin ').on('click', '.singer .delSinger', function () {
        // alert(111)
        var singerID = $(this).parents('tr').children(':first').attr('date-id');
        if (!confirm('您确定删除吗？')) { return false; }
        $.get('/administration/delSinger=' + singerID, {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                singerShow();
                $('.admin .admin_right').children().css({ display: 'none' });
                $('.admin .admin_right').children('.singer').css({ display: "block" });
            }
        })
    })
    //确认添加歌手
    $('.admin .addSinger form').on('submit', function (e) {
        e.preventDefault()
        var formData = $(this).serialize();
        console.log(formData)
        if ($('#singerName').val().length == 0 || $('#singerImg').val().length == 0 || $('#Description').val().length == 0) {
            alert('输入框不能为空！')
        } else if ($('#singerImg').val().match(/.*(.jpg|.png|.gif)$/) == null) {
            alert('请输入后缀名为.jpg/.png/.gif结尾的文件名')
        } else {
            $.ajax({
                url: '/administration/addSinger',
                type: 'post',
                data: formData,
                dataType: 'json',
                success: function (data) {
                    if (data == "操作失败") {
                        alert("查询失败，请重新操作");
                    } else {
                        singerShow();
                        $('.admin .admin_right').children().css({ display: 'none' });
                        $('.admin .admin_right').children('.singer').css({ display: "block" });
                    }
                }
            });
        }
    })
    $('.admin .addSinger form .confire').on('click', function (e) {
    })
    //取消添加事件
    $('.admin .addSinger form .cancel').on('click', function (e) {
        singerShow();
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.singer').css({ display: "block" });
    })


    //点击歌曲管理 显示歌曲列表的信息
    $('.admin .admin_left dl dt').eq(2).on('click', function () {
        songShow();
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.song').css({ display: "block" });
    })
    function songShow() {
        $.get('/administration/song', {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                $('.admin .admin_right .song table tbody').empty();
                console.log(data);
                $.each(data, function (i) {
                    var str = ' <tr>\
                        <td date-id="'+ data[i].Id + '">' + parseInt(i + 1) + '</td>\
                        <td>'+ data[i].MusicName + '</td>\
                        <td>' + data[i].singerName + '</td>\
                        <td>' + data[i].MusicUrl + '</td>\
                        <td>' + data[i].Lyric + '</td>\
                        <td >' + data[i].CDName + '</td>\
                        <td >' + formatTime(data[i].songTime) + '</td>\
                        <td class="addTime">' + conver(data[i].addTime) + '</td>\
                        <td><a href="void:0" class="addSong">添加</a><a href="void:0" class="updSong" style="margin:0 10px;">修改</a> <a href="void:0" class="delSong">删除</a></td>\
                    </tr>';
                    $('.admin .admin_right .song table tbody').append(str);
                    // changeSongDate(i)
                    // conver(data[i].addTime)
                })
            }
        })
    }
    function conver(a) {
        var time = a;
        var d = new Date(time);
        var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        return times;
    }

    //将秒转换为分秒
    function formatTime(duration) {
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute * 60;
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return minute + ":" + second;
    }
    //歌曲添加
    $('.admin ').on('click', '.song table .addSong', function () {
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.addSong').css({ display: "block" });
    })
    //禁止添加歌曲submit事件触发
    $('.admin .addSong form').on('submit', function (e) {
        e.preventDefault();
    })
    //确认歌曲添加
    $('.admin').on('click', '.addSong .confire', function () {
        var MusicName = $('.admin .addSong #MusicName').val();
        var SingerId = $('.admin .addSong #SingerId').val();
        var MusicUrl = $('.admin .addSong #MusicUrl').val();
        var Lyric = $('.admin .addSong #Lyric').val();
        var CDId = $('.admin .addSong #CDId').val();
        var songTime = $('.admin .addSong #songTime').val();
        var addTime = getNowFormatDate();
        console.log(addTime)
        if ($('#MusicName').val().length == 0 || $('#SingerId').val().length == 0 || $('#MusicUrl').val().length == 0 ||
            $('#Lyric').val().length == 0 || $('#CDId').val().length == 0 || $('#songTime').val().length == 0) {
            alert('输入框不能为空！')
        } else if ($('#MusicUrl').val().match(/.*(.mp3)$/) == null) {
            alert('请输入后缀名为.mp3结尾的文件名')
        } else if ($('#Lyric').val().match(/.*(.lrc)$/) == null) {
            alert('请输入后缀名为.lrc结尾的文件名')
        } else {
            $.post('/administration/addSong', { MusicName, SingerId, MusicUrl, Lyric, CDId, songTime, addTime }, function (data) {
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");
                } else {
                    songShow();
                    $('.admin .admin_right').children().css({ display: 'none' });
                    $('.admin .admin_right').children('.song').css({ display: "block" });
                }
            })
        }
    })
    //取消添加
    $('.admin').on('click', '.addSong .cancel', function () {
        songShow();
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.song').css({ display: "block" });
    })
    // 获取当前时间
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
    //歌曲修改
    $('.admin ').on('click', '.song table .updSong', function () {
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.editSong').css({ display: "block" });
        var Id = $(this).parents('tr').children(':first').attr('date-id');
        selSong(Id);


    })
    function selSong(Id) {
        $.get('/administration/song=' + Id, {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");

            } else {
                // console.log(data[0].singerImg)
                $('.admin .editSong #Id').val(data[0].Id);
                $('.admin .editSong #MusicName').val(data[0].MusicName);
                $('.admin .editSong #SingerId').val(data[0].SingerId);
                $('.admin .editSong #MusicUrl').val(data[0].MusicUrl);
                $('.admin .editSong #Lyric').val(data[0].Lyric);
                $('.admin .editSong #CDId').val(data[0].CDId);
                $('.admin .editSong #songTime').val(data[0].songTime);
            }
        })
    }
    //确认修改歌曲
    $('.admin .editSong form').on('submit', function (e) {
        e.preventDefault()
        var formData = $(this).serialize()

        $.ajax({
            url: '/administration/editSong',
            type: 'post',
            data: formData,
            dataType: 'json',
            success: function (data) {
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");
                } else {
                    songShow();
                    $('.admin .admin_right').children().css({ display: 'none' });
                    $('.admin .admin_right').children('.song').css({ display: "block" });
                }
            }
        });
    })
    //取消修改歌曲
    $('.admin ').on('click', '.editSong .cancel', function () {
        songShow();
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.song').css({ display: "block" });
    })
    // 歌曲删除
    $('.admin ').on('click', '.song table .delSong', function () {
        var Id = $(this).parents('tr').children(':first').attr('date-id');
        if (!confirm('您确定删除吗？')) { return false; }
        $.get('/administration/delSong=' + Id, {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                songShow();
                $('.admin .admin_right').children().css({ display: 'none' });
                $('.admin .admin_right').children('.song').css({ display: "block" });
            }
        })
    })


    //点击专辑管理 显示专辑列表的信息
    $('.admin .admin_left dl dt').eq(3).on('click', function () {
        albumShow();
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.album').css({ display: "block" });
    })

    function albumShow() {
        $.get('/administration/album', {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                $('.admin .admin_right .album table tbody').empty();
                console.log(data);
                $.each(data, function (i) {
                    var str = ' <tr>\
                        <td date-id="'+ data[i].CDId + '">' + parseInt(i + 1) + '</td>\
                        <td>'+ data[i].CDName + '</td>\
                        <td><img src="../../public/images/album/' + data[i].CDImg + '" alt=""></td>\
                        <td><a href="void:0" class="addAlbum">添加</a><a href="void:0" class="updAlbum">修改</a> <a href="void:0" class="delAlbum">删除</a></td>\
                    </tr>';
                    $('.admin .admin_right .album table tbody').append(str);
                })
            }
        })
    }

    //添加专辑
    $('.admin').on('click', '.album .addAlbum', function () {
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.addAlbum').css({ display: "block" });
    })
    //禁止添加专辑submit事件触发
    $('.admin .addAlbum form').on('submit', function (e) {
        e.preventDefault();
        var formData = $(this).serialize();
        if ($('#CDName').val().length == 0 || $('#singerId').val().length == 0 || $('#CDImg').val().length == 0) {
            alert('输入框不能为空！')
        } else if ($('#CDImg').val().match(/.*(.jpg|.png|.gif)$/) == null) {
            alert('请输入后缀名为.mp3结尾的文件名')
        } else {
            $.ajax({
                url: '/administration/addAlbum',
                type: 'post',
                data: formData,
                dataType: 'json',
                success: function (data) {
                    if (data == "操作失败") {
                        alert("查询失败，请重新操作");
                    } else {
                        albumShow();
                        $('.admin .admin_right').children().css({ display: 'none' });
                        $('.admin .admin_right').children('.album').css({ display: "block" });
                    }
                }
            });
        }
    })
    //确认添加
    $('.admin').on('click', '.addAlbum .confire', function () {

    })
    //取消添加
    $('.admin').on('click', '.addAlbum .cancel', function () {
        albumShow();
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.album').css({ display: "block" });
    })
    //专辑修改
    $('.admin').on('click', '.album .updAlbum', function () {
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.editAlbum').css({ display: "block" });
        var CDId = $(this).parents('tr').children(':first').attr('date-id');
        console.log(CDId)
        selAlbum(CDId);


    })
    function selAlbum(CDId) {
        $.get('/administration/editAlbum=' + CDId, {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                // console.log(data[0].singerImg)
                $('.admin .editAlbum #CDId').val(data[0].CDId);
                $('.admin .editAlbum #CDName').val(data[0].CDName);
                $('.admin .editAlbum #singerId').val(data[0].singerId);
                $('.admin .editAlbum #CDImg').val(data[0].CDImg);
            }
        })
    }
    //确认修改专辑
    $('.admin .editAlbum form').on('submit', function (e) {
        e.preventDefault()
        var formData = $(this).serialize()
        if ($('#CDImg').val().match(/.*(.jpg|.png|.gif)$/) == null) {
            alert('请输入后缀名为.mp3结尾的文件名')
        } else {
            $.ajax({
                url: '/administration/editAlbum',
                type: 'post',
                data: formData,
                dataType: 'json',
                success: function (data) {
                    if (data == "操作失败") {
                        alert("查询失败，请重新操作");
                    } else {
                        albumShow();
                        $('.admin .admin_right').children().css({ display: 'none' });
                        $('.admin .admin_right').children('.album').css({ display: "block" });
                    }
                }
            });
        }
    })
    //取消修改专辑
    $('.admin ').on('click', '.editAlbum .cancel', function () {
        albumShow();
        $('.admin .admin_right').children().css({ display: 'none' });
        $('.admin .admin_right').children('.album').css({ display: "block" });
    })




    //删除专辑
    $('.admin').on('click', '.album .delAlbum', function () {
        var CDId = $(this).parents('tr').children(':first').attr('date-id');
        if (!confirm('您确定删除吗？')) { return false; }
        $.get('/administration/delAlbum=' + CDId, {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                albumShow();
                $('.admin .admin_right').children().css({ display: 'none' });
                $('.admin .admin_right').children('.album').css({ display: "block" });
            }
        })
    })

})()
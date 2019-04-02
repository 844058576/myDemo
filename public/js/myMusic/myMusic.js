; (function () {
    var flag = true;
    var obj = {
        clickMymusic: function () {        //点击我的音乐


            $('#myMusic').on('click', function () {
                // console.log('111')
                obj.myMusicFunc();
            });
        },
        myMusicFunc: function () {         //点击我的音乐之后触发的事件
            $('.content').children().css({ display: 'none' });
            $('.m-top a.title').removeClass('active');
            $('#myMusic').addClass('active');
            $('.userMusic ul').empty();

            $('.content .userMusic').children().css({ display: 'block' });
            $('.content .userMusic').children('.sheetData').css({ display: 'none' })
            $('.content .userMusic').children('.m-layer').css({ display: 'none' })
            //因为css文件权重问题  现动态加载myMusic的css文件
            var myMusic = '../../../public/css/myMusic/myMusic.css',
                addSheet = '../../../public/css/myMusic/addSheet.css',
                myMusicTag = $('<link href="' + myMusic + '" rel="stylesheet" type="text/css" class="link"/>'),
                addSheetTag = $('<link href="' + addSheet + '" rel="stylesheet" type="text/css" class="link"/>');
            $('.content').append(myMusicTag).append(addSheetTag);
            //导航条fixed显示
            $('#myMusic').hasClass('active') ? $('.header').css({ position: 'fixed', zIndex: 1 }) : $('.header').css({ position: 'static', zIndex: 1 });

            //元素加载中
            $('.content .loader').css({ display: 'block' });

            if ($('link').is('.link')) {
                setTimeout(function () {
                    $('.content').children('.userMusic').css({ display: 'block' });
                    //加载中的元素隐藏
                    $('.content .loader').css({ display: 'none' });
                }, 200)
            }

            if ($('.getUserId').val()) {
                $.get('/my', {}, function (data) {
                    // console.log(data)
                    if (data == "操作失败") {
                        alert("查询失败，请重新操作");
                    } else {
                        var str = '<li class="createMusic" date-id="3">\
                            <a href="#" class="clickMusic">\
                                <div class="item">\
                                    <div class="left">\
                                        <a hidefocus="true" class="avatar">\
                                            <img src="../../../public/images/myMusic/introSong.jpg" alt="">\
                                            <span class="msk"></span>\
                                        </a>\
                                    </div>\
                                    <p class="name">我喜欢的音乐</p>\
                                    <p class="num"><i>0</i>首</p>\
                                </div>\
                                <span class="oper hshow">\
                                    <a hidefocus="true" title="编辑" id="selectSheet" href="#" class="u-icn u-icn-10"></a>\
                                    <a hidefocus="true" title="删除" href="#" class="u-icn u-icn-11 deleteSheet"></a>\
                                </span>\
                            </a>\
                        </li>'

                        $.each(data, function (i) {
                            $('.userMusic .n-minelst ul').append(str);
                            $('.createMusic img').eq(i).attr('src', '../../../public/images/myMusic/' + data[i].songImg)
                            $('.createMusic .item .name').eq(i).text(data[i].songSheet);
                            $('.createMusic').eq(i).attr('date-id', data[i].id)

                            $('.userMusic .f-thide').text(data[0].songSheet);
                            // 如果数据库没有歌单图片从本地拿一张显示
                            data[i].songImg ? $('.userMusic .avatar img').eq(i).attr('src', '../../../public/images/myMusic/' + data[i].songImg) :
                                $('.userMusic .avatar img').eq(i).attr('src', '../../../public/images/myMusic/introSong.jpg')
                            // 如果当前第一个歌单没有图片在歌单详情显示本地的图片
                            data[0].songImg ? $('.userMusic #flag_cover').attr('src', '../../../public/images/myMusic/' + data[0].songImg) :
                                $('.userMusic #flag_cover').attr('src', '../../../public/images/myMusic/introSong.jpg')
                            data[0].photo ? $('.userMusic .face img').attr('src', '..../../../public/images/user/' + data[0].photo) :
                                $('.userMusic .face img').attr('src', '../../../public/images/index/touxiang.jpg')
                            data[0].nickname ? $('.userMusic .user-name a').text(data[0].nickname) :
                                $('.userMusic .user-name a').text(用户 + Math.round(Math.random() * 10000));
                            $('.userMusic .time').text(data[0].addTime);
                            obj.changeDate();

                            $('.userMusic .sheetData').text(JSON.stringify(data));


                            $('.userMusic .createMusic:first').addClass('z-selected');
                            var l = $('.userMusic .createMusic').eq(i).attr('date-id');
                            // console.log('i:' + i)

                            var songCount = obj.countSheet(l);
                            // console.log(songCount);
                            $('.userMusic .createMusic').eq(i).children('.item').children('.num').children(i).text(songCount);
                        });

                        obj.defaultSheet();

                        $('.userMusic #songCount').text($('.userMusic tbody tr:last').index() + 1);


                    }
                });
            }
        },
        countSheet: function (l) {          //渲染歌单收藏了多少首歌
            // $.ajax 返回值需要先设定一个变量
            // console.log(l)
            var htmldata1;
            $.ajax({
                type: "GET",
                url: '/my/songsheet=' + l,
                data: "",
                async: false,
                cache: false,
                error: function (request) { },
                success: function (data, statu) {
                    // console.log(data)
                    htmldata1 = data[0].count;
                }
            });
            return htmldata1;
        },
        defaultSheet: function () {         //查询第一个歌单收藏的音乐 点击歌单默认先渲染第一个歌单

            if ($('.userMusic .createMusic:first').is('.z-selected')) {
                var defaultId = $('.userMusic .createMusic:first').attr('date-id');
                $.ajax({
                    type: "GET",
                    url: '/my/defaultId=' + parseInt(defaultId),
                    data: "",
                    async: false,
                    cache: false,
                    error: function (request) { },
                    success: function (data, statu) {
                        // console.log(data)
                        $('.userMusic tbody').empty();
                        if (data != 0) {
                            $('.userMusic .g-mn3 .table').css({ display: 'block' });
                            $('.userMusic .noMusic').css({ display: 'none' });
                        } else {
                            $('.userMusic .g-mn3 .table').css({ display: 'none' });
                            $('.userMusic .noMusic').css({ display: 'block' });
                        }

                        $.each(data, function (i) {
                            obj.renderSong(data, i);
                        })
                    }
                });
                // return defaultData;
            }
        },
        renderSong: function (data, i) {             //渲染歌单内所有歌曲
            console.log(data);
            if (data != 0) {
                var str = '<tr class="even" date-id="'+ data[i].Id+'" date-sheet="'+ data[i].sheetId+'">\
            <td class="left">\
                <div class="hd ">\
                    <span class="ply ply-z-slt">&nbsp;</span>\
                    <span class="num">1</span>\
                </div>\
            </td>\
            <td>\
                <div class="tt">\
                    <a href="#" id="songId">\
                        <b title="">\
                        </b>\
                    </a>\
                </div>\
            </td>\
            <td class="s-fc3">\
                <span class="u-dur candel">249</span>\
                <div class="opt hshow">\
                    <a href="#" class="u-icn u-icn-81 icn-add" title="添加到播放列表"></a>\
                    <span class="icn icn-fav ico-add" title="收藏"></span>\
                    <a href="../resouce/music/'+ data[i].MusicUrl+'" download="'+data[i].MusicUrl+'">\
                        <span class="icn icn-dl" title="下载"></span>\
                    </a>\
                    <span class="icn icn-del" title="删除">删除</span>\
                </div>\
            </td>\
            <td>\
                <div class="text" title="">\
                    <span></span>\
                </div>\
            </td>\
            <td>\
                <div class="text">\
                    <a href="#" title="" class="album"></a>\
                </div>\
            </td>\
        </tr>'

                $('.userMusic table tbody').append(str);
                $('tbody tr:nth-child(odd)').removeClass('even');
                
                $('.userMusic tbody .num').eq(i).text($('.userMusic tbody tr').eq(i).index() + 1);
                $('.userMusic tbody b').eq(i).text(data[i].MusicName);
                $('.userMusic tbody b').eq(i).attr('title', data[i].MusicName);
                $('.userMusic tbody .u-dur').eq(i).text(data[i].songTime);
                var a = obj.formatSeconds($('.userMusic .u-dur').eq(i).text());
                $('.userMusic .u-dur ').eq(i).text(a);
                $('.userMusic tbody .text span').eq(i).text(data[i].singerName);
                $('.userMusic tbody .text span').eq(i).attr('title', data[i].singerName);
                $('.userMusic tbody .album').eq(i).text(data[i].CDName);
                $('.userMusic tbody .album').eq(i).attr('title', data[i].CDName);
            }
        },
        showSong: function () {   //点击创建歌单显示隐藏歌单
            $('.f-ff1 .rtitle').on('click', function () {
                flag ? obj.toggleLi('none', 'removeClass', 'o-rtitle') : obj.toggleLi('block', 'addClass', 'o-rtitle');
            })
        },
        toggleLi: function (display, toggleClass, css) {    //显示隐藏菜单事件
            $('.n-minelst  ul .createMusic').css({ display: display });
            $('.f-ff1 .rtitle').toggleClass(css);
            flag = !flag;
        },
        sheetHover: function () {   //鼠标移动到创建的歌单展示的样式
            $('.n-minelst  ul ').on('mouseenter', '.createMusic:not(:first-child)', function () {
                $(this).children('span.hshow').css({ display: 'block' });
            })
            $('.n-minelst  ul ').on('mouseleave', '.createMusic:not(:first-child)', function () {
                $(this).children('span.hshow').css({ display: 'none' });
            })
        },
        changeDate: function () {       //将数据库拿出的日期修改为yyyy-mm-dd格式
            if ($('.userMusic .time').html()) {
                var time = $('.userMusic .time').html();
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
                // console.log(year, mon, day)

                $('.userMusic .time').html(year + '-' + mon + '-' + day);
            }

        },
        formatSeconds: function (value) {     //将秒数转化为00：00格式
            var secondTime = parseInt(value);// 秒
            var minuteTime = 0;// 分
            if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
                //获取分钟，除以60取整数，得到整数分钟
                minuteTime = parseInt(secondTime / 60);
                //获取秒数，秒数取佘，得到整数秒数
                secondTime = parseInt(secondTime % 60);
                //如果分钟大于60，将分钟转换成小时
            }
            var result = "" + parseInt(secondTime) + "";
            if (result >= 0 && result < 10) {
                result = "0" + result;
            }
            minuteTime > 0 && minuteTime < 10 ? result = "0" + parseInt(minuteTime) + ":" +
                result : result = "" + parseInt(minuteTime) + ":" + result;
            return result;
        },
        addSheet: function () {    //新建歌单按钮
            $('.g-mymusic .n-minelst .u-btn').on('click', function () {
                // console.log(111);
                $('.userMusic .m-layer').css({ display: 'block' });
            })
            obj.closeAdd('.zcls');
            obj.closeAdd('#cancelAdd');
            obj.blurAdd();
        },
        closeAdd: function (node) {    //关闭新建歌单窗口
            $('.content').on('click', node, function () {
                $('.content .m-layer').css({ display: 'none' });
            });
        },
        blurAdd: function () {     //新建歌单文本框鼠标聚焦和失去焦点触发事件
            $('.content ').on('blur', '#songSheet', function () {
                if ($(' #sheetName').val().length == 0) {
                    $(' .zcnt .u-err').css('visibility', 'visible');
                } else {
                    $(' .zcnt .u-err').css('visibility', 'hidden');
                }
            });
            obj.confAdd();
        },
        confAdd: function () {        //确定增加歌单事件
            $('.content ').on('click', '#addSongSheet', function () {
                if ($(' #sheetName').val().length == 0) {
                    $(' .zcnt .u-err').css('visibility', 'visible');
                } else {
                    $(' .zcnt .u-err').css('visibility', 'hidden');
                    var songSheet = $(' .zcnt #sheetName').val();
                    var time = obj.getTime();
                    $.post('/addSheet', { songSheet, time }, function (data) {
                        if (data == "操作失败") {
                            alert("查询失败，请重新操作");
                        } else {
                            console.log(data);
                            obj.myMusicFunc();
                            $('.app .m-layer').css({ display: 'none' });
                        }
                    })
                }
            });
        },
        getTime:function(){
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
        },
        editSheet: function () {        //点击歌单内的编辑图片 仅查询该歌单信息
            $('.content ul').on('click', '#selectSheet', function (e) {
                e.stopPropagation();
                // console.log(22222)
                $('.content .sheetInfo').css({ display: 'none' });
                $('.content .update-sheet').css({ display: 'block' })
                $('.content .editSheetErr').css({ display: 'none' })
                var a = $(this).parent().parent().attr('date-id');
                // console.log(a);
                $.get("/editSheet/songSheetId=" + a, {}, function (data) {
                    if (data == "操作失败") {
                        alert("查询失败，请重新操作");
                    } else {
                        $('.content .edit-id').val(data[0].id);
                        $('.content .edit-songSheet').val(data[0].songSheet);
                        $('.content .edit-introduce').val(data[0].introduce);
                    }
                });
                obj.cliSaveSheet();
            })
        },
        cliSaveSheet: function () {         //点击保存歌单
            $('.content .update-sheet').on('click', '#saveSheet', function () {
                // obj.changeEdit();
                //如果文本框值未改变则 触发下面事件
                $('.content .editSheetErr').css({ display: 'block' })
                obj.saveSheetFuc();

            });

            //取消保存歌单
            $('.content .update-sheet').on('click', '.cancelUpd', function () {
            $('.content .sheetInfo').css({ display: 'block' });
            $('.content .update-sheet').css({ display: 'none' })
            });
            $('.content .update-sheet').on('click', '.returnSheet', function () {
                $('.content .update-sheet .cancelUpd').trigger('click');
            });
        },
        saveSheetFuc: function () {         //保存歌单触发事件
            var sheetId = parseInt($('.content .edit-id').val());
            $.ajax({
                type: "post",
                url: "/editSheet/songSheetId=" + sheetId,
                contentType: "application/json",
                data: JSON.stringify({ id: $('.content .edit-id').val(), songSheet: $('.content .edit-songSheet').val(), introduce: $('.app .edit-introduce').val() }),//参数列表
                dataType: "json",
                success: function (result) {
                    //请求正确之后的操作
                    //    console.log(result);
                    $('.content .update-sheet').css({ display: 'none' });
                    $('.content .sheetInfo').css({ display: 'block' })

                    $('.content .userMusic .succEidt').css({ display: 'block' });

                    setTimeout(function () {
                        $('.content .userMusic .succEidt').css({ display: 'none' });
                    }, 2000)
                },
                error: function (result) {
                    //请求失败之后的操作
                    console.log(result);
                }
            });
        },
        clickLi: function () {      //点击li标签（歌单）
            $('.userMusic ').on('click', '.createMusic', function () {
                $('.userMusic .createMusic').removeClass('z-selected');
                $('.content .update-sheet').css({ display: 'none' })
                $('.content .sheetInfo').css({ display: 'block' })
                $(this).addClass('z-selected');
                var sheetId = $(this).attr('date-id');

                var sheetData = JSON.parse($('.userMusic .sheetData').text());
                // console.log(sheetData);
                var m = $(this).index();
                $('.userMusic .f-thide').text(sheetData[m].songSheet);
                sheetData[m].songImg ? $('.userMusic #flag_cover').attr('src', '../../../public/images/myMusic/' + sheetData[m].songImg) :
                    $('.userMusic #flag_cover').attr('src', '../../../public/images/myMusic/introSong.jpg');

                $('.userMusic .time').text(sheetData[m].addTime);
                obj.changeDate();


                obj.renderSheet(sheetId);
            });
            obj.countNum();
        },
        renderSheet:function(sheetId){
            $.get('/my/sheetId=' + sheetId, {}, function (data) {
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");
                } else {
                    if (data == 0) {    //如果未收藏歌曲怎显示无歌曲页面否则显示收藏歌曲
                        $('.userMusic .noMusic').css({ display: 'block' });
                        $('.userMusic tbody').empty();
                        $('.userMusic .g-mn3 .table').css({ display: 'none' });
                        $('.userMusic #songCount').text($('.userMusic tbody tr:last').index() + 1);
                    } else {
                        $('.userMusic .noMusic').css({ display: 'none' });
                        $('.userMusic tbody').empty();
                        $('.userMusic .g-mn3 .table').css({ display: 'block' });
                        $('.userMusic #songCount').empty();
                        $.each(data, function (i) {
                            obj.renderSong(data, i);
                        });
                        $('.userMusic #songCount').text($('.userMusic tbody tr:last').index() + 1);

                    }
                }
            });
        },
        countNum: function () {     //如果没有收藏歌曲则歌曲为0首
            if ($('.userMusic .noMusic').css("display") == 'block') {
                $('.userMusic #songCount').text('0');
            }
        },
        deleteSheet: function () {     //删除歌单 弹出确认窗口 刷新content区域(调用我的音乐触发事件)
            $('.content ul').on('click', '.deleteSheet', function () {
                console.log(111);
                var sheetId = $(this).parent().parent().attr('date-id')
                if (!confirm('您确定删除吗？')) { return false; }
                $.get('/delSheet/' + sheetId, {}, function (data) {
                    // console.log(data)
                    if (data == "操作失败") {
                        alert("查询失败，请重新操作");
                    } else {
                        console.log(data);
                        obj.myMusicFunc();
                    }
                });

            });
        },
        deleteSong:function(){
            $('.content ').on('click','.g-mymusic .table tr .icn-del',function(data){
                // alert(11)
                var Id = $(this).parents('tr').attr('date-id')
                var sheetId = $(this).parents('tr').attr('date-sheet')
                $.post('/delSheet/songId',{Id,sheetId},function(){
                    if (data == "操作失败") {
                        alert("查询失败，请重新操作");
                    } else {
                        alert('删除成功')
                        obj.renderSheet(sheetId);
                    }
                })
            })
        },
        init: function () {
            obj.clickMymusic();     //点击我的音乐
            obj.showSong();         //点击创建歌单显示隐藏歌单
            obj.sheetHover();       //鼠标移动到创建的歌单展示的样式
            obj.addSheet();     //新建歌单按钮
            obj.editSheet();    //点击歌单内的编辑图片 仅查询该歌单信息
            obj.clickLi();      //点击歌单li添加背景色；
            obj.defaultSheet(); //默认歌单
            obj.deleteSheet();  //删除歌单
            obj.deleteSong();  
        }
    };

    obj.init();




    function Toast(info) {
        $('.content').children('.succEidt').text(info)
        $('.content').children('.succEidt').css({ display: 'block' });
        setTimeout(function () {
            $('.content').children('.succEidt').css({ display: 'none' });
        }, 1000)
    }
})()
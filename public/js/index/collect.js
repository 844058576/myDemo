// 收藏歌单 点击播放列表之后的功能实现
; (function () {
    var $scope = $('.app .g-btmbar');
    var obj = {
        collect: function () {  //点击收藏图标
            $scope.find('.f-cb ').on('click', 'li .ico-add', function (e) {
                e.stopPropagation();
                var songId = $(this).parent().parent().parent().attr('date-id');
                console.log(songId + '-----songID')
                // console.log('li')
                obj.show(songId);
            });
            $('.app').on('click', '.userMusic tr .ico-add', function (e) {
                var songId = $(this).parent().parent().parent().attr('date-id');
                console.log(this)
                // console.log('li')
                obj.show(songId);
            });
            $('.app').on('click', '.rankList table tr .ico-add', function () {
                var songId = $(this).parent().parent().parent().attr('date-id')
                obj.show(songId)
            })
            $('.app').on('click', '.singer-content .artist-top table tr .ico-add', function () {
                var songId = $(this).parent().parent().parent().attr('date-id');
                console.log($(this).parent().parent().parent())
                obj.show(songId)
            })
        },
        show: function (songId) {   //收藏图片展示/隐藏各个content内容
            console.log(songId)
            $('.app .g-btmbar .list').css({ display: 'none' });
            $('.content .collect').css({ display: 'block' });
            $('.content .collect .col-add').css({ display: 'block' });
            // 清空收藏列表内容
            $('.collect ul').empty();
            obj.sheet();
            obj.clickCol(songId);
        },
        clickCol: function (songId) {// 在添加歌单窗口点击歌单列表
            $('.content .collect').on('click', '.xtag', function () {
                var sheetId = $(this).attr('date-id');
                var userId = $('.header .h-user .getUserId').val();
                $.post('/collect/addSheet', { sheetId, songId, userId }, function (data) {
                    if (data == "操作失败") {
                        alert("查询失败，请重新操作");
                    } else if (data == "歌曲已存在") {
                        obj.Toast('歌曲已存在！');
                    }
                    else {
                        obj.Toast('收藏成功！');
                    }
                })
            })
        },
        clickDown: function(){
            // console.log(this);
            $scope.find('.f-cb ').on('click', 'li .ico-dl', function (e) {
                // e.stopPropagation();
                console.log(this);
            })
        },
        Toast: function (info) {       //显示1秒钟操作消息
            $('.content .m-layer').css({ display: 'none' });
            $('.content').children('.succEidt').text(info)
            $('.content').children('.succEidt').css({ display: 'block' });
            setTimeout(function () {
                $('.content').children('.succEidt').css({ display: 'none' });
            }, 1000)
        },
        sheet: function () {            //渲染收藏的歌单
            if ($('.getUserId').val()) {
                $.get('/my', {}, function (data) {
                    // console.log(data)
                    if (data == "操作失败") {
                        alert("查询失败，请重新操作");
                    } else {
                        $.each(data, function (i) {
                            data[i].songImg = data[i].songImg != null ? data[i].songImg : 'introSong.jpg';
                            var str = ' <li class="xtag" date-id="' + data[i].id + '">\
                                <div class="item f-cb">\
                                    <div class="left">\
                                        <a href="#" class="avatar">\
                                            <img alt="" src="../../../public/images/myMusic/'+ data[i].songImg + '">\
                                        </a>\
                                    </div>\
                                    <p class="name f-thide">\
                                        <a class="s-fc0" href="#">'+ data[i].songSheet + '</a>\
                                    </p>\
                                    <p class="s-fc3">1首</p>\
                                </div>\
                            </li>'
                            $('.collect ul').append(str);
                            // console.log(data[i].songImg )
                            var l = $('.collect ul li').eq(i).attr('date-id');
                            // // console.log('i:' + i)

                            var songCount = obj.countSheet(l);
                            // console.log(songCount);
                            $('.collect li').eq(i).find('.s-fc3').text(songCount + '首');
                        });
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
                    // console.log('songsheet:' + data)
                    htmldata1 = data[0].count;
                }
            });
            return htmldata1;
        },
        init: function () {
            obj.collect();
            obj.clickDown();
        }
    }
    obj.init();



    //关闭添加歌单窗口
    $('.app').on('click', '.zcls', function () {
        $('.content .m-layer').css({ display: 'none' });
    })
    //点击新歌单
    $('.app').on('click', '.tit', function () {
        $('.content .collect .col-add').css({ display: 'none' });
        $('.content .userMusic').css({ display: 'block' })
        if (!$('.header ul li').eq(1).children('a').hasClass('active')) {
            $('.content .userMusic').children().css({ display: 'none' })
        }
        $('.content .userMusic .m-layer').css({ display: 'block' });
    })



    // 点击播放列表的歌曲
    $scope.find('.f-cb').on('click', 'li', function () {
        $scope.find('.play-btn').addClass("playing");
        var index = $(this).index();
        $scope.trigger("play:change", index);
        root.pro.start(0);
        audio.play();
    })
    // 关闭播放列表
    $scope.find('.icn-list').on('click', function () {
        $scope.find('.list').toggle();
    })
    // 关闭播放列表
    $scope.find('.close').on('click', function () {
        $scope.find('.list').toggle();
    })
    // audio播放器页面开锁关锁
    $scope.find('.lockbtn').on('click', function () {
        $(this).toggleClass('lockbtn unlockbtn')
    })
    // 显示/隐藏audio播放器
    $scope.on('mouseenter', function () {
        clearInterval(timer);
        if ($scope.find('.unlockbtn').length > 0) {
            $scope.find('.m-playbar').animate({ bottom: '0px' }, 500);
        }
    }).on('mouseleave', function () {
        if ($scope.find('.unlockbtn').length > 0) {
            timer = setInterval(function () { $scope.find('.m-playbar').animate({ bottom: '-45px' }, 500) }, 1000);
        }
    })

    var flag = 1;
    $('.app .g-btmbar .ctrl ').children('.icn:last').on('click',function(){
        console.log(flag)
        if(flag == 1){
            // console.log(222)
            $(this).removeClass('icn-one');
            $(this).addClass('icn-loop');
            $(this).attr('title','循环');
             flag = 2;
        }else if ( flag == 2){
            // console.log(111)
            $(this).removeClass('icn-loop');
            $(this).addClass('icn-shuffle');
            $(this).attr('title','随机');
            flag = 3
        }else if ( flag == 3){
            $(this).removeClass('icn-shuffle');
            $(this).addClass('icn-one');
            $(this).attr('title','单曲循环');
            flag = 1
        }
    })
})()

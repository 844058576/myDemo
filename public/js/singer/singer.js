; (function () {
    //实现歌手列表随着鼠标移动从不同方向显示歌手的作品
    function bindEvent() {
        $('.app').on('mouseenter', '.singer-info .box', function (e) {
            addClass(this, e, 'in');
        });
        $('.app').on('mouseleave', '.singer-info .box', function (e) {
            addClass(this, e, 'out');
        });
    }
    function getDirection(dom, e) {
        var x = e.offsetX - dom.offsetWidth / 2;
        var y = e.offsetY - dom.offsetHeight / 2;
        var d = Math.round(((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90 + 3) % 4;
        return d;
    }
    function addClass(dom, e, state) {
        var d = getDirection(dom, e);
        var direction = '';
        switch (d) {
            case 0: {
                direction = '-top';
                break;
            }
            case 1: {
                direction = '-right';
                break;
            }
            case 2: {
                direction = '-bottom';
                break;
            }
            case 3: {
                direction = '-left';
                break;
            }
            default:
                break;
        }
        dom.className = 'box ' + state + direction;
    }
    bindEvent();





    $('.singer-content .tab a').on('click', function () {
        $('.tab a').removeClass('borderTop');
        $(this).addClass('borderTop');
    });
    //热门歌手详情页
    $('.majorWorks').on('click', function () {
        $('.singerContent').children().css({ display: 'none' });
        $('.artist-top').css({ display: 'block' });
    });
    //专辑详情页
    $('.album').on('click', function () {
        $('.singerContent').children().css({ display: 'none' });
        $('.allAlbum').css({ display: 'block' });
        var singerId = $('.singerInfo .artist-name').attr('dateId');
        $.get("/artist/singerId=" + singerId, {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                $.each(data, function (i) {
                    // console.log(JSON.stringify(data))
                    var str = '<li>\
                <div class="u-cover u-cover-5">\
                    <a href="void:0" date-id="'+ data[i].CDId+'">\
                        <img src="../../../public/images/album/'+ data[i].CDImg + '">\
                        <span title="'+ data[i].CDName + '" class="msk"></span>\
                    </a>\
                </div>\
                <p><a class="nm f-thide s-fc0" href="void:0" title="'+ data[i].CDName + '" date-id="'+ data[i].CDId+'">' + data[i].CDName + '</a></p>\
            </li>';
                    $('.singer-content .allAlbum ul').append(str);
                })
            }
        });
    });
    //艺人介绍
    $('.artistIntroduce').on('click', function () {
        $('.singerContent').children().css({ display: 'none' });
        $('.artist-intro').css({ display: 'block' });
    });


    //点击歌手歌曲div切换到该歌手详细信息界面
    $('.app .content').on('click', '.singer-introduce', function () {
        var artistId = $(this).children().attr('date-id');
        seachSinger(artistId);

    });
    //搜索页面进入歌手详情页
    $('.content ').on('click', '.g-search #singerId', function () {
        var artistId = $(this).attr('date-id');
        seachSinger(artistId);
    })
    //首页分类歌曲处 进入歌手详情页
    $('.content ').on('click', '.g-wrap3 .item .singerName', function () {
        var artistId = $(this).parents('div.item').attr('data-singer');
        seachSinger(artistId);
    })


    // 实现跳转到歌手详情页面
    function seachSinger(artistId) {
        $('.content').children().css({ display: 'none' });
        $('.singer-content').css({ display: 'block' });
        $('.singer-content tbody').empty();

        //获取后端存储的歌手数据
        $.get("/artist/id=" + artistId, {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                $('.singerInfo .artist-name').attr({ title: data[0].singerName });
                $('.singerInfo .artist-name').attr({ dateId: data[0].SingerId });
                $('.singerInfo .artist-name').html(data[0].singerName);
                $('.singerInfo img').attr({ src: '../../../public/images/singer/' + data[0].singerImg });
                $('.artist-intro h2 span').html(data[0].singerName + '简介');
                $('.artist-intro p').html(data[0].Description).css({
                    textIndent: '2em',
                    textAlign: 'left'
                });
                console.log(data)
                //循环所有歌曲创建标签
                $.each(data, function (i) {
                    var str = '<tr id="" class="even" date-id="' + data[i].Id + '">\
                                <td class="w1">\
                                    <div class="hd">\
                                        <span class="ply" title="播放">&nbsp;</span>\
                                        <span class="num">1</span>\
                                    </div>\
                                </td>\
                                <td class="">\
                                    <div class="f-cb">\
                                        <div class="tt">\
                                            <div class="ttc">\
                                                <span class="txt">\
                                                    <a href="#" id="songId">\
                                                        <b title="小半">小半</b>\
                                                    </a>\
                                                </span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </td>\
                                <td class="w2-1 s-fc3">\
                                    <span class="u-dur ">04:57</span>\
                                    <div class="opt hshow">\
                                        <a class="u-icn u-icn-81 icn-add" href="javascript:;" title="添加到播放列表" hidefocus="true"></a>\
                                        <span class="icn icn-fav ico-add" title="收藏"></span>\
                                        <a href="../resouce/music/'+ data[i].MusicUrl + '" download="' + data[i].MusicUrl + '">\
                                            <span class="icn icn-dl" title="下载"></span>\
                                        </a>\
                                    </div>\
                                </td>\
                                <td class="w4">\
                                    <div class="text">\
                                        <a href="#" title="小梦大半" id="albumId">\
                                            小梦大半\
                                        </a>\
                                    </div>\
                                </td>\
                            </tr>'

                    $('.singer-content tbody').append(str);
                    $('tbody tr:nth-child(odd)').removeClass('even');

                    $('.singer-content .num').eq(i).html(i + 1);
                    // console.log(i)
                    $('.singer-content .txt a b').eq(i).attr({ title: data[i].MusicName })
                    $('.singer-content .txt a b').eq(i).html(data[i].MusicName);

                    var secondTime = parseInt(data[i].songTime);// 秒
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
                    $('.singer-content .s-fc3 .u-dur').eq(i).html(result);

                    $('.singer-content .w4 .text a').eq(i).attr({ title: data[i].CDName })
                    $('.singer-content .w4 .text a').eq(i).html(data[i].CDName);

                    $("html,body").animate({ scrollTop: 0 }, 10);
                });
            }
        });
    }
    var obj = {
        clickSinger: function () {     //点击歌手列表
            $('.header #singer').on('click', function () {
                $('.content').children().css({ display: 'none' });
                $('.m-top a.title').removeClass('active');
                $(this).addClass('active');
                $('.link').remove();
                $('.content').children(".singer-wrapper").css({ display: 'block' });
                $('.singer-info').empty();
                $('.header').css({ position: 'static', zIndex: 1 });
                $.get("/selectSinger", {}, function (data) {
                    if (data == "操作失败") {
                        alert("查询失败，请重新操作");
                    } else {
                        // console.log(data);
                        var singerIndex = obj.singerRemove(data);
                        $.each(singerIndex, function (i) {
                            var oLi = '<li>\
                        <div class="box">\
                            <div class="show">\
                                <img src="../../../public/images/singer/'+ singerIndex[i].singerImg + '" alt="" class="singerImg" date-id="">\
                            </div>\
                            <div class="hide">\
                                <a class="singer-introduce" href="#/singer">\
                                    <ul class="song-list" date-id="">\
                                    </ul >\
                                </a>\
                            </div >\
                    </div >\
                    <a href="#" class="singerName"></a>\
                    </li > ';
                            $('.app .singer-info').append(oLi);
                            $('.app .singer-info .song-list').eq(i).attr('date-id', singerIndex[i].singerID);
                            // $('.app .singer-info .singerImg').eq(i).attr('src', singerIndex[i].singerImg);
                            $('.app .singer-info .singerName').eq(i).html(singerIndex[i].singerName);
                        });

                        $.each(data, function (j) {             //让歌手的作品渲染到div.hide上
                            var singerCount = $('.hide .song-list').length;
                            for (i = 0; i < singerCount; i++) {
                                if ($('.hide .song-list').eq(i).attr('date-id') == data[j].singerID) {
                                    $('.hide .song-list').eq(i).append('<li class="song-name"><p class="song-index"></p>' + this.MusicName + '</li>');
                                    var obj = $(".song-list").eq(i).children().children();
                                    obj.each(function (i) {
                                        $(this).text(i + 1 + '.');
                                    });
                                }
                            }
                        });


                    }
                });
            });
        },
        singerRemove: function (arr) {      //过滤传过来的数据合并重复的歌手信息
            var bArr = [];
            var obj = {};
            for (var i = 0; i < arr.length; i++) {
                if (!obj[arr[i].singerName]) {
                    obj[arr[i].singerName] = 1;
                    bArr.push(arr[i]);
                }
            }
            return bArr;
        },
        init: function () {
            obj.clickSinger();
        }
    }
    obj.init();
})()
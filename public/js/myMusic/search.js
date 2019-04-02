// 搜索页面js实现功能
(function () {
    var obj = {
        search: function () {       //搜索框事件
            $('.g-search .pgsrch a.btn').on('click', function () {
                obj.judgeFuc();
            })
            $('.g-search .pgsrch input').on('keypress', function (e) {
                if (event.keyCode == 13) {
                    obj.judgeFuc();
                }
            })
            $('.g-search #m-search .m-tabs-srch li').on('click', function () {
                $('.g-search #m-search .m-tabs-srch li').removeClass('fst');
                $('.g-search #m-search .m-tabs-srch li').children('a').removeClass('z-slt');
                $(this).addClass('fst');
                $(this).children('a').addClass('z-slt');
                $('.g-search .srchsongst').empty();
            })
            $('.g-search #m-search .m-tabs-srch li').eq(0).on('click', function () {
                if ($('.g-search .pgsrch input').val().length != 0) {
                    obj.searchFuc();
                }
            })
            $('.g-search #m-search .m-tabs-srch li').eq(1).on('click', function () {
                if ($('.g-search .pgsrch input').val().length != 0) {
                    obj.serachSig();
                }

            })
            $('.g-search #m-search .m-tabs-srch li').eq(2).on('click', function () {
                if ($('.g-search .pgsrch input').val().length != 0) {
                    obj.searcnAbm();
                }
            })
            $('.g-search #m-search .m-tabs-srch li').eq(3).on('click', function () {
                alert('暂未实现该功能!');
            })

        },
        searchCli: function () {    //导航条搜索框事件
            $('.header #serach').on('keypress', function (e) {
                if ($('.header #serach').val().length != 0) {
                    if (event.keyCode == 13) {
                        $('.app .content').children().css({ display: 'none' });
                        $('.app .g-search').css({ display: 'block' });
                        $('.g-search .pgsrch input').val($('.header #serach').val());
                        obj.judgeFuc();
                    }
                }
            })
        },
        judgeFuc: function () {     //判断当前需要进行何种搜索
            if ($('.g-search .pgsrch input').val().length != 0) {
                if ($('.g-search .m-tabs li').eq(0).hasClass('fst')) {
                    obj.searchFuc();
                } else if ($('.g-search .m-tabs li').eq(1).hasClass('fst')) {
                    obj.serachSig();
                }
                else if ($('.g-search .m-tabs li').eq(2).hasClass('fst')) {
                    obj.searcnAbm();
                }
                else if ($('.g-search .m-tabs li').eq(3).hasClass('fst')) {
                    alert('暂未实现该功能!');
                }
            }
        },
        searchFuc: function () {    // 搜索歌曲是否存在
            var item = $('.g-search .pgsrch input').val();
            $('.g-search .srchsongst').empty();
            $('.g-search .snote').empty();
            // $('.g-search .snote span').html(item);
            $('.g-search .snote').html('搜索“<span>' + item + '</span>”，找到<em class="s-fc6"></em>首单曲');

            $.post('/search', { item }, function (data) {
                // console.log(data)
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");

                } else {
                    console.log(data);
                    if (data.length == 0) {
                        var str = '<p class="s-fc7" style="font-size:20px;">暂未收录该歌曲，请重新输入关键字!</p>'
                        $('.g-search .srchsongst').append(str);
                        $('.g-search .snote em').html($('.g-search .srchsongst .item').length)
                    } else {
                        $.each(data, function (i) {
                            var str = '<div class="item f-cb h-flag" date-id="'+ data[i].Id +'">\
                    <div class="td">\
                        <div class="hd">\
                            <a class="ply " title="播放" date-id="'+ data[i].Id +'"></a>\
                        </div>\
                        </div>\
                        <div class="td w0">\
                            <div class="sn">\
                                <div class="text">\
                                    <a href="void:0" id="songId" date-id="'+ data[i].Id +'"><b title="'+ data[i].MusicName + '">' + data[i].MusicName + '</b></a>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="td">\
                            <div class="opt hshow">\
                                <a class="u-icn u-icn-81 icn-add" href="javascript:;" title="添加到播放列表" hidefocus="true"></a>\
                                <span class="icn icn-fav" title="收藏"></span>\
                                <span class="icn icn-share" title="分享"></span>\
                                <a href="/resouce/music/'+ data[i].MusicUrl +'" download="'+ data[i].MusicUrl +'" title="下载">\
                                 <span class="icn icn-dl" title="下载"></span>\
                                </a>\
                            </div>\
                        </div>\
                        <div class="td w1">\
                            <div class="text">\
                                <a href="void:0" id="singerId" date-id="'+ data[i].SingerId+'">\
                                    <span>'+ data[i].singerName + '</span>\
                                </a>\
                            </div>\
                        </div>\
                        <div class="td w2">\
                            <div class="text">\
                                <a class="s-fc3" href="void:0" title="'+ data[i].CDName + '">《' + data[i].CDName + '》</a>\
                            </div>\
                        </div>\
                        <div class="td">'+ obj.formatSeconds(data[i].songTime) + '</div>\
                    </div>';
                            $('.g-search .srchsongst').append(str);

                            var a = $('.g-search .srchsongst').find('.text b').eq(i).html().split(item).join('<span class="s-fc7">' + item + '<span>')
                            $('.g-search .srchsongst').find('.text b').eq(i).html(a)

                            $('.g-search .snote em').html($('.g-search .srchsongst .item').length)

                        })
                    }
                }
            })
            // var len = $('.g-search .srchsongst .item').length;


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
        serachSig: function () {        // 搜索歌手是否存在
            $('.g-search .srchsongst').empty();
            var str = '<ul class="m-cvrlst m-cvrlst-5 f-cb"></ul>';
            $('.g-search .srchsongst').append(str);
            var item = $('.g-search .pgsrch input').val();
            $('.g-search .snote').html('搜索“<span>' + item + '</span>”，找到<em class="s-fc6"></em>个歌手');

            $.post('/search/singer', { item }, function (data) {
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");
                } else {
                    if (data.length == 0) {
                        var str = '<p class="s-fc7" style="font-size:20px;">暂未收录该歌手，请重新输入关键字!</p>'
                        $('.g-search .srchsongst').append(str);
                        $('.g-search .snote em').html($('.g-search .srchsongst .item').length)
                    } else {
                        $.each(data, function (i) {
                            var str1 = '<li>\
                            <div class="u-cover u-cover-5">\
                                <a href="void:0" id="singerId" date-id="'+ data[i].singerID+'">\
                                    <img src="../../../public/images/singer/' + data[i].singerImg + '">\
                                    <span title="' + data[i].singerName + '" class="msk"></span>\
                                </a>\
                            </div>\
                            <p style="margin-top: 8px;">\
                                <a class="nm f-thide s-fc0" id="singerId" href="void:0" date-id="'+ data[i].singerID +'" title="' + data[i].singerName + '">' + data[i].singerName + '</a>\
                            </p>\
                        </li>';
                            $('.g-search .srchsongst .m-cvrlst').append(str1);

                            var a = $('.g-search .srchsongst').find('.m-cvrlst li').eq(i).find('p a').html().split(item).join('<span class="s-fc7">' + item + '<span>')
                            $('.g-search .srchsongst').find('.m-cvrlst li p a').eq(i).html(a);

                            $('.g-search .snote em').html($('.g-search .srchsongst .m-cvrlst li').length)
                        })
                    }
                }
            })
        },
        searcnAbm: function () {    //搜索专辑是否存在
            $('.g-search .srchsongst').empty();
            var str = '<ul class="m-cvrlst m-cvrlst-alb3 f-cb"> </ul>';
            $('.g-search .srchsongst').append(str);
            var item = $('.g-search .pgsrch input').val();
            $('.g-search .snote').html('搜索“<span>' + item + '</span>”，找到<em class="s-fc6"></em>张专辑');

            $.post('/search/album', { item }, function (data) {
                // console.log(data)
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");
                } else {
                    if (data.length == 0) {
                        var str = '<p class="s-fc7" style="font-size:20px;">暂未收录该专辑，请重新输入关键字!</p>'
                        $('.g-search .srchsongst').append(str);
                        $('.g-search .snote em').html($('.g-search .srchsongst .item').length)
                    } else {
                        $.each(data, function (i) {
                            var str1 = ' <li>\
                            <div class="u-cover u-cover-alb2">\
                                <a href="void:0" data-id="'+data[i].CDId+'">\
                                    <img src="../../../public/images/album/' + data[i].CDImg + '">\
                                    <span title="'+ data[i].CDName + '" class="msk"></span>\
                                </a>\
                            </div>\
                            <p class="dec">\
                                <a href="void:0" class="tit f-thide s-fc0" title="'+ data[i].CDName + '">' + data[i].CDName + '</a>\
                            </p>\
                            <p>\
                                <span class="nm f-thide" title="'+ data[i].singerName + '">\
                                    <a href="void:0" class="s-fc3">'+ data[i].singerName + '</a>\
                                </span>\
                            </p>\
                        </li>'

                            $('.g-search .srchsongst .m-cvrlst').append(str1);
                            console.log(i)
                            var a = $('.g-search .srchsongst').find('.m-cvrlst li').eq(i).find('.dec a').html().split(item).join('<span class="s-fc7">' + item + '<span>')
                            $('.g-search .srchsongst').find('.m-cvrlst li .dec').eq(i).html(a);

                            $('.g-search .snote em').html($('.g-search .srchsongst .m-cvrlst li').length)

                        })
                    }

                }
            });

        },
        init: function () {
            obj.search();
            obj.searchCli();
        }
    }
    obj.init();
})()
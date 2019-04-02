; (function () {
    var obj = {
        clickRank: function () {   //点击榜单列表
            $('#list').on('click', function () {
                $('.header').css({position:'relative'});
                $('.content').children().css({ display: 'none' });
                $('.m-top a.title').removeClass('active');
                $(this).addClass('active');
                $('.link').remove();
                $('.mine').removeClass('z-selected');
                $('.mine').eq(0).addClass('z-selected');
                // $('.content').children().css({ display: 'none' });
                $('.content').children(".rankList").css({ display: 'block' });
                $('tbody').empty();
                $.get("/newList", {}, function (data) {
                    if (data == "操作失败") {
                        alert("查询失败，请重新操作");
                    } else {
                        // console.log(data);
                        obj.renderData(data);
                    }
                });
            });
        },
        clickRankList: function () {        //点击热歌榜/新歌榜个当前li添加一个背景色，切换到对应li的界面
            $('.rankList .mine').on('click', function () {
                $('.rankList .mine').removeClass('z-selected');
                $(this).addClass('z-selected');
                $('.rankList tbody').empty();
                // console.log(this == $('.mine').eq(0))
                $('.rankList .g-wrap').children().css({ display: 'none' });
                var index = $('.mine').index(this);
                index == 0 ? obj.newSongsRank() : obj.hotSongsRank();
            })
        },
        newSongsRank: function () {     //如果当前点击的是新歌榜让g-wrap的第一个子元素显示
            $('.rankList .g-wrap').children('.newList').css({ display: 'block' });
            $.get("/newList", {}, function (data) {
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");
                } else {
                    // console.log(data);
                    obj.renderData(data);
                }
            });
        },
        hotSongsRank: function () {     //如果当前点击的是热歌榜让g-wrap的第二个子元素显示
            $('.rankList .g-wrap').children('.hotList').css({ display: 'block' });
            $.get("/hotList", {}, function (data) {
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");
                } else {
                    // console.log(data)
                    obj.renderData(data);
                }
            });
        },
        renderData: function (data) {
            $('.sep').text('最近更新' + data[0].addTime);
            obj.changeDate();
            $.each(data, function (i) {             //让歌手的作品渲染到div.hide上
                var oLi = '<tr class="even" date-id="'+ data[i].Id+'">\
                            <td>\
                                <div class="hd">\
                                    <span class="num">4</span>\
                                </div>\
                            </td>\
                            <td class="">\
                                <div class="f-cb">\
                                        <span class="ply ">&nbsp;</span>\
                                        <div class="ttc">\
                                            <span class="txt">\
                                                <a href="#" id="songId">\
                                                    <b title=" '+ data[i].MusicName+'&nbsp;">'+ data[i].MusicName+' &nbsp;\
                                                    </b>\
                                                </a>\
                                            </span>\
                                        </div>\
                                </div>\
                            </td>\
                            <td class=" s-fc3">\
                                <span class="u-dur ">02:47</span>\
                                <div class="opt hshow">\
                                    <a class="u-icn u-icn-81 icn-add" href="javascript:;" title="添加到播放列表"\
                                        hidefocus="true">\
                                    </a>\
                                    <span class="icn icn-fav ico-add" title="收藏"></span>\
                                    <a href="../resouce/music/'+ data[i].MusicUrl+'" download="'+data[i].MusicUrl+'">\
                                        <span class="icn icn-dl" title="下载"></span>\
                                    </a>\
                                </div>\
                            </td>\
                            <td class="">\
                                <div class="text" title="'+ data[i].singerName+'">\
                                    <span title="'+ data[i].singerName+'">\
                                        <a class="albumId" href="#" hidefocus="true">'+ data[i].singerName+'</a>\
                                    </span></div>\
                            </td>\
                        </tr>';

                $('.rankList tbody').append(oLi);
                $('tbody tr:nth-child(odd)').removeClass('even');
                $('.rankList .num').eq(i).text($('tbody tr').eq(i).index() + 1);
                // $('.rankList .txt b').eq(i).text(data[i].MusicName);
                $('.rankList .u-dur ').eq(i).text(data[i].songTime);
                var a = obj.formatSeconds($('.u-dur ').eq(i).text());
                $('.rankList .u-dur ').eq(i).text(a);
                // $('.rankList .text a').eq(i).text(data[i].singerName);
                $('.rankList .sub span').text($('.rankList tbody tr:last-child()').index() + 1)
            });
        },
        moveTr: function () {     //鼠标移动离开显示/隐藏歌曲时长
            $('.content').on('mouseenter mouseleave', 'tr', function () {
                $(this).children('.s-fc3').children('.u-dur').css('display', 'none');
            }).on('mouseleave', 'tr', function () {
                $(this).children('.s-fc3').children('.u-dur').css('display', 'block');
            });
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
        changeDate: function () {       //将数据库拿出的日期修改为yyyy-mm-dd格式
            if ($('.sep').html()) {
                var time = $('.sep').html();
                // console.log(time)
                var newTime = time.replace(/^\"|\"$/g, '').substring(0, 14);
                $('.sep').html(newTime)
                // console.log(time.replace(/^\"|\"$/g,'').substring(0, 10))
            }
        },
        init: function () {
            obj.clickRank();
            obj.clickRankList();
            obj.moveTr();
        }
    }
    obj.init();
})()
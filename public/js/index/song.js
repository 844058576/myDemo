// song.html页面的相关代码  进入歌曲详情页面
; (function () {
    var $socpe = $('.content .song');
    var flag = false;
    //歌手 ----- 点击歌曲链接进入详细的歌曲信息  //相关后端代码写在rankList.js
    $('.content .rankList').on('click', '#songId', function () {
        //隐藏content所有子元素显示歌曲详细内容
        var self = this;
        var songId = $(self).parents('tr').attr('date-id');
        detailSong(self, songId);
        //    $('.content .song').css({paddingTop: '0px'});
    })
    //榜单处进入歌曲详情
    $('.content .singer-content').on('click', '#songId', function () {
        var self = this;
        var songId = $(self).parents('tr').attr('date-id');
        detailSong(self, songId);
        // $('.content .song').css({paddingTop: '0px'});

    })
    //我的音乐处进入歌曲详情
    $('.content .userMusic').on('click', '#songId', function () {
        $('.link').remove();
        $('.header').css({ position: 'relative' });
        var self = this;
        var songId = $(self).parents('tr').attr('date-id');
        detailSong(self, songId);
        // $('.content .song').css({paddingTop: '70px'});
    })
    //搜索页面进入歌曲详情
    $('.content').on('click', '.g-search #songId', function () {
        // alert(111)
        var self = this;
        var songId = $(this).attr('date-id');
        detailSong(self, songId);
    });
    //首页 歌曲分类处点击歌曲进入歌曲详情
    $('.content').on('click', '.g-wrap3 .item .MusicName a', function () {
        var self = this;
        var songId = $(this).parents('div.item').attr('date-id');
        detailSong(self, songId);
    })

    //首页 榜单处进入歌曲详情
    $('.content').on('click', '.n-bill li.z-hvr a.nm', function () {
        var self = this;
        var songId = $(this).parents('li.z-hvr').attr('date-id');
        detailSong(self, songId);
    })
    $('.content ').on('click', '.g-bd5 .n-songtb td #MusicId', function () {
        var self = this;
        var songId = $(this).attr('date-id');
        detailSong(self, songId);

    })
    function detailSong(self, songId) {   //渲染歌曲页面
        $('.content .song').find('.m-lycifo').empty();
        $('.content').children().css({ display: 'none' });
        $('.content').children('.song').css({ display: 'block' });
        // 清除导航条active样式
        $('.header').find('li a.active').removeClass('active');
        $('.header').find('li a').eq(0).addClass('active');

        $.get('/song/id=' + songId, {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                var str = '<div class="f-cb">\
                    <div class="cvrwrap f-cb f-pr">\
                        <div class="u-cover u-cover-6 f-fl">\
                            <img src="../../../public/images/album/'+ data[0].CDImg + '" class="j-img">\
                            <span class="msk f-alpha"></span>\
                        </div>\
                    </div>\
                    <div class="cnt">\
                        <div class="hd">\
                            <i class="lab u-icn u-icn-37"></i>\
                            <div class="tit">\
                                <em class="f-ff2" date-id="'+ data[0].Id + '">' + data[0].MusicName + '</em>\
                            </div>\
                        </div>\
                        <p class="des s-fc4">歌手：\
                            <span title="'+ data[0].singerName + '">\
                                <a class="s-fc7" href="#" singerId= "'+ data[0].SingerId + '">' + data[0].singerName + '</a>\
                            </span>\
                        </p>\
                        <p class="des s-fc4">所属专辑：\
                            <a href="#" class="s-fc7" CDName="'+ data[0].CDName + '">' + data[0].CDName + '</a>\
                        </p>\
                        <div class="m-info">\
                            <div class="btns f-cb">\
                                <a href="#" class="u-btn2 u-btn2-2 u-btni-addply f-fl" hidefocus="true" title="播放">\
                                    <i><em class="ply"></em>播放</i>\
                                </a>\
                                <a href="#" class="u-btni u-btni-add" hidefocus="true" title="添加到播放列表"></a>\
                                <a class="u-btni u-btni-dl" href="../resouce/music/'+ data[0].MusicUrl + '" download="' + data[0].MusicUrl + '"><i>下载</i></a>\
                                <a href="#area" class="u-btni u-btni-cmmt j-cmt">\
                                    <i>(<span id="comment-count">评论</span>)</i>\
                                </a>\
                            </div>\
                        </div>\
                        <div class="bd bd-open f-brk f-ib">\
                            <div class="f-lrc">\
                            </div>\
                            <div class="crl">\
                                <a id="flag_ctrl" href="void:0" class="s-fc7">展开\
                                    <i class="u-icn u-icn-69"></i>\
                                </a>\
                            </div>\
                        </div>\
                    </div>\
                </div>'
                $('.content .song').find('.m-lycifo').append(str);


                var url = '../../../resouce/lyric/' + data[0].Lyric;
                lyricsAnaly(url);
                comments(songId);

                $("html,body").animate({ scrollTop: 0 }, 10);
            }
        })


    }
    function lyricsAnaly(url) {     //将歌曲渲染到歌曲页面        
        $.ajax({
            type: 'get',
            url: url,
            dataType: "text",
            success: function (data) {
                var lyric = parseLyric(data);
                var str = "";
                for (var i in lyric) {
                    str += '<p class="j-flag" date-time="' + i + '">' + lyric[i] + '</p>';
                    $('.content .song').find('.m-lycifo .f-lrc').html(str)
                }
                hidelrc();
                displaylrc();
            },
            error: function () {
                alert('操作异常,请重新尝试')
            }
        })

        // 解析lrc文件获取时间轴和歌词
        function parseLyric(lrc) {
            var lyrics = lrc.split("\n");
            var lrcObj = {};
            var t = {};
            for (var i = 0; i < lyrics.length; i++) {
                var lyric = decodeURIComponent(lyrics[i]);
                var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                var timeRegExpArr = lyric.match(timeReg);
                if (!timeRegExpArr) continue;
                var clause = lyric.replace(timeReg, '');
                for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                    var t = timeRegExpArr[k];
                    // var time = t.replace(/\[|]/g,'')
                    var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                        sec = Number(String(t.match(/\:\d*/i)).slice(1));
                    var time = min * 60 + sec;
                    // console.log(time)
                    lrcObj[time] = clause;
                }
            }
            return lrcObj;
        }
        //隐藏歌词
        function hidelrc() {
            var len = $('.content .song').find('.m-lycifo .f-lrc').children().length;
            for (i = 0; i < len; i++) {
                // console.log(i)
                i > 10 ? $('.content .song').find('.m-lycifo .f-lrc').children().eq(i).css({ display: 'none' }) : true;
            }
        }
        //点击展开隐藏歌词
        function displaylrc() {
            var flag = false;
            $('.content .song .crl').on('click', '#flag_ctrl', function () {
                console.log(111)
                if (flag) {
                    hidelrc();
                    $(this).html('展开 ' + '<i class="u-icn u-icn-69"></i>');
                    flag = false;
                } else {
                    // //展开歌词
                    $('.content .song').find('.m-lycifo .f-lrc').children().css({ display: 'block' })
                    $(this).html('隐藏 ' + '<i class="u-icn u-icn-69"></i>');
                    flag = true;
                }

            })
        }

        // //展开歌词
        // function showlrc() {
        //     $('.content .song').find('.m-lycifo .f-lrc').children().css({ display: 'block' })
        // }
    }

    //渲染评论页面
    function comments(songId) {
        $('.content .song').find('.cmmts h3.u-hd4').siblings().remove();
        $.get('/comment/songId=' + songId, {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                console.log(data);
                $.each(data, function (i) {
                    var str = ' <div class="itm" date-id="' + data[i].id + '">\
                            <div class="head">\
                                <a href="void:0">\
                                    <img src="../public/images/index/'+ data[i].photo + '">\
                                </a>\
                            </div>\
                            <div class="cntwrap">\
                                <div>\
                                    <div class="cnt f-brk">\
                                        <a href="void:0" class="s-fc7" date-id="'+ data[i].userId + '">' + data[i].nickname + '</a>：<span>' + data[i].content + '</span>\
                                    </div>\
                                    <!-- 这是回复内容 -->\
                                    <div class="que f-brk f-pr s-fc3">\
                                        <span class="darr">\
                                            <i class="bd">◆</i>\
                                            <i class="bg">◆</i>\
                                        </span>\
                                        <a class="s-fc7" href="void:0" data-id="'+ data[i].p_nick + '">' + data[i].p_nick + '</a>：' + data[i].p_content + '\
                                    </div>\
                                    <div class="rp">\
                                        <div class="time s-fc4">'+ conver(data[i].c_time) + '</div>\
                                        <span class="dlt">\
                                            <a href="javascript:void(0)" class="s-fc3 deleteCom" data-id="1408986259" data-type="delete">删除</a>\
                                            <span class="seep">|</span>\
                                        </span>\
                                        <a href="javascript:void(0)" class="s-fc3 reply" data-id="1408361783" data-type="reply">回复</a>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="showReply" style="display:none;">\
                        <div>\
                            <div class="rept m-quk m-quk-1 f-pr">\
                                <div class="iner">\
                                    <div class="corr u-arr u-arr-1">\
                                        <em class="arrline">◆</em>\
                                        <span class="arrclr">◆</span>\
                                    </div>\
                                    <div class="m-cmmtipt m-cmmtipt-1 f-cb f-pr">\
                                            <div class="u-txtwrap holder-parent f-pr j-wrap">\
                                                <textarea class="u-txt area j-flag" placeholder="回复'+ data[i].nickname + '：" maxlength="140" style="overflow-x: hidden; overflow-y: scroll;"></textarea>\
                                            </div>\
                                            <div class="btns f-cb f-pr">\
                                                    <a href="javascript:void(0)" class="btn u-btn u-btn-1 j-flag reply" >回复</a>\
                                            </div>\
                                        </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>';

                    setTimeout(function () {
                        $('.content .song').find('.cmmts h3.u-hd4').after(str);

                        JudgeSh();
                    }, 200)
                    // $('.content .song').find('.cmmts h3.u-hd4').after(str);

                    $('.content .song .n-cmt .u-title .j-flag').text(i + 1);
                })

            }
        })

    }

    // 将时间转换为2019-3-3的格式
    function conver(a) {
        var time = a;
        var d = new Date(time);
        var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        // $('.content .song').find('.itm').eq(i).find(' .rp .time').text(times);
        return times;
    }

    //判断留言是否有回复者id有则是回复评论，无则是评论留言
    function JudgeSh() {
        var len = $socpe.find('.itm').length;
        for (i = 0; i < len; i++) {
            if ($socpe.find('.itm').eq(i).find('.que a.s-fc7').html() == 'null') {
                $socpe.find('.itm ').eq(i).find('.que').css({ display: 'none' })
            }

            if ($socpe.find('.itm').eq(i).find('.cnt a').attr('date-id') != $('.header .getUserId').val() || !$('.header .getUserId').val()) {
                $socpe.find('.itm').eq(i).find(' .dlt').remove();
            }
        }
    }

    //点击收缩回复框
    $('.content').on('click', '.song .itm .reply', function () {
        $('.content').find('.song .showReply').css({ display: 'none' });
        if (flag == false) {
            $(this).parents('.itm').next().css({ display: 'block' });
            $socpe.find('.u-txtwrap textarea').focus();
            flag = true;
        } else {
            $(this).parents('.itm').next().css({ display: 'none' });
            flag = false;
        }
    })
    //计算文本框能够输入的数字
    $socpe.find('.m-cmmtipt .u-txtwrap textarea#area').on('keyup', function () {
        $socpe.find('.m-cmmtipt span.zs').html(140 - $(this).val().length);
    });

    $socpe.find('.m-cmmtipt .btns .commentBtn').on('click', function () {
        // alert(2222)
        var userId = $('.header .getUserId').val();
        var content = $socpe.find('.m-cmmtipt .u-txtwrap textarea#area').val();
        var songId = $socpe.find('.tit em.f-ff2').attr('date-id');
        var c_time = getNowFormatDate();
        console.log(userId, '111:', content, songId, c_time)
        if (content) {
            $.post('/comment/song', { userId, content, songId, c_time }, function (data) {
                if (data == "操作失败") {
                    alert("请先登录");
                } else {
                    Toast('评论成功！', songId)
                    $socpe.find('.m-cmmtipt span.zs').html(140);
                }
            })
        } else if (!userId) {
            alert('请先登录！')
        } else {
            Toast('输入内容不能为空！', songId)
        }

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

    //用户删除自己发表的评论
    $socpe.on('click', '.itm .deleteCom', function () {
        var id = $(this).parents('.itm').attr('date-id')
        var songId = $socpe.find('.tit em.f-ff2').attr('date-id');
        // console.log(id);
        $.get('/comment/delete=' + id, {}, function (data) {
            if (data == "操作失败") {
                alert("查询失败，请重新操作");
            } else {
                Toast('删除成功', songId)
            }
        })
    })

    //用户回复其他用户的评论
    $('.content').on('click', '.song .showReply .btns .reply', function () {
        var userId = $('.header .getUserId').val();
        // $(this).parents('.showReply').find('.u-txtwrap textarea').text();
        var content = $(this).parents('.showReply').find('.u-txtwrap textarea').val();
        var p_nick = $(this).parents('.showReply').prev().find('.cntwrap .cnt a').text();
        var p_content = $(this).parents('.showReply').prev().find('.cntwrap .cnt span').text();
        var songId = $socpe.find('.tit em.f-ff2').attr('date-id');
        var c_time = getNowFormatDate();
        // console.log(userId,content,p_nick,p_content,songId,c_time);
        if (content) {
            $.post('/comment/replay', { userId, content, p_nick, p_content, songId, c_time }, function (data) {
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");
                } else {
                    Toast('回复成功！', songId)
                }
            })
        } else if (!userId) {
            alert('请先登录！')
        } else {
            $('.content').children('.succEidt').text('内容不能为空')
            $('.content').children('.succEidt').css({ display: 'block' });
            setTimeout(function () {
                $('.content').children('.succEidt').css({ display: 'none' });
            }, 1000)
        }

    })

    function Toast(info, songId) {
        $('.content').children('.succEidt').text(info)
        $('.content').children('.succEidt').css({ display: 'block' });
        setTimeout(function () {
            $('.content').children('.succEidt').css({ display: 'none' });
        }, 1000)
        comments(songId);
        $socpe.find('textarea').val("");
    }
})()
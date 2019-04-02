//渲染播放器 展示歌曲/歌手/歌曲数量/歌词等信息
; (function (root) {
    var $scope = $('.app .g-btmbar');
    function renderList(info, index) {
        console.log(info, index)
        $scope.find('.musicmask').children('img').attr('src', '../../../public/images/album/' + info.CDImg);
        $scope.find('.words').children('.name').html(info.MusicName);
        $scope.find('.words').children('.name').attr({
            'date-id': info.Id,
            title: info.MusicName
        });

        $scope.find('.words').children('.singer').html(info.singerName);
        $scope.find('.words').children('.singer').attr({
            'date-id': info.SingerId,
            title: info.singerName
        });
        // $scope.find('.time').children('.duration').html('/' + root.render.formatTime(info.songTime));
        $scope.find('.lytit').text(info.MusicName);
        $scope.find('.wrap .s-fc3').text($(".app .m-playbar .f-cb li").length);
        $scope.find('.f-cb').children('li').removeClass('z-sel')
        $scope.find('.f-cb').children('li').find('.playicn').css({ display: 'none' });
        $scope.find('.f-cb').children('li').eq(index).addClass('z-sel')
        $scope.find('.f-cb').children('li').eq(index).find('.playicn').css({ display: 'block' });
        root.pro.renderAllTime(info.songTime);

        var url = '../../../resouce/lyric/' + info.Lyric;
        // console.log(url);
        $.ajax({
            type: 'get',
            url: url,
            dataType: "text",
            success: function (data) {
                // console.log(data)
                var lyric = parseLyric(data);
                var str = "";
                // console.log(lyric)
                for (var i in lyric) {
                    // console.log(lyric[i])
                    // console.log(i)
                    str += '<p class="j-flag" date-time="' + i + '">' + lyric[i] + '</p>';
                    $scope.find('.listlyric').html(str)
                }
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


    }
    root.renderList = renderList;
})(window.player || (window.player = {}))
//渲染播放器 歌曲列表信息
; (function (root) {
    var $scope = $('.app .g-btmbar');
    //渲染当前这首歌的信息
    function renderInfo(info) {
        console.log(info == "操作失败");
        $scope.find('ul.f-cb').empty();
        $.each(info, function (i) {
            console.log(info)
            var html = '<li date-id="'+ info[i].songId +'" col-id="'+ info[i].playId +'">\
            <div class="col clo-1">\
                <duv class="playicn"></duv>\
            </div>\
            <div class="col clo-2">'+ info[i].MusicName + '</div>\
            <div class="col clo-3">\
                <div class="icns">\
                    <i class="ico icn-del" title="删除">删除</i>\
                    <a href="../resouce/music/'+ info[i].MusicUrl+'" download="'+ info[i].MusicUrl+'">\
                     <i class="ico ico-dl" title="下载">下载</i>\
                    </a>\
                    <i class="ico ico-share" title="分享">分享</i>\
                    <i class="j-t ico ico-add" title="收藏">收藏</i>\
                </div>\
            </div>\
            <div class="col clo-4">\
                <span title="'+ info[i].singerName + '">\
                    <a class="singerName" href="#" hidefocus="true">'+ info[i].singerName + '</a>\
                </span>\
            </div>\
            <div class="col clo-5">'+ formatTime(info[i].songTime) + '</div>\
            <div class="col clo-6">\
                <a href="#" class="ico ico-src" title="来自专辑" date-cd="'+ info[i].CDId + '">来源</a>\
            </div>\
        </li>';
            $scope.find('ul.f-cb').append(html);
        })

    }


    //把秒转换成分和秒
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
    root.render = function (data) {
        renderInfo(data);
    }
    root.render.formatTime = formatTime;
})(window.player || (window.player = {}))

// 进度条模块
; (function (root) {
    // 渲染总时间  左侧经过时间 右侧总时间
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPer = 0;
    var startTime;
    function renderAllTime(time) {
        curDuration = time;
        lastPer = 0;
        time = formatTime(time);
        $scope.find('.duration').html(time);
    }
    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        return m + ':' + s;
    }
    // 暴露方法

    function start(p) {
        cancelAnimationFrame(frameId);
        lastPer = p === undefined ? lastPer : p;
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (curDuration * 1000);
            // console.log(per);
            renderLyr();
            if (per >= 0 && per <= 1) {
                upDate(per);
            } else {
                // per = 
            }
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }

    function renderLyr() {
        var t = $scope.find('.curtime').text();
        var min = Number(String(t.match(/\d*/)).slice(1)),
            sec = Number(String(t.match(/\:\d*/)).slice(1));
        var time = min * 60 + sec;
        var a = $scope.find('.listlyric').children('p').length;
        for (var i = 0; i < a; i++) {
            var curTime = $scope.find('.listlyric').children('p').eq(i).attr('date-time');
            var newTime = $scope.find('.listlyric').children('p').eq(i + 1).attr('date-time');
            // if (newTime) {
                // console.log(curTime + 'curTime')
                // console.log(newTime + 'newTime')
                if (time >= curTime ) {
                    // if (time < newTime ) {
                    $scope.find('.listlyric').children('p').removeClass('z-sel')
                    $scope.find('.listlyric').children('p').eq(i).addClass('z-sel')
                    if (i >= 4) {
                        $scope.find('.listlyric').children('p').css({ 
                            transform: 'translateY(' + (i - 3) * (-32) + 'px)' ,
                            transition: 'all 0.5s ease-in-out'
                        })
                    }
                }
            // } 
        } (i)
        // }

    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
    }

    function upDate(per) {
        var time = per * curDuration;
        time = formatTime(time);
        $scope.find('.curtime').html(time);
        var perX = (per - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            transform: 'translateX(' + perX + ')'
        })
    }

    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        upDate: upDate,
        stop: stop
    }

})(window.player || window.player == {})
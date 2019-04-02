// audioManager.js文件控制播放器加载歌曲路径、播放、暂停、时间跳转、音乐结束后循环，
; (function (root) {
    var $scope = $('.app .g-btmbar');
    function audioManager() {
        this.audio = new Audio();
        this.status = "pause";
        this.bindEvent();
    }
    audioManager.prototype = {
        //绑定监听歌曲是否播放完成事件
        bindEvent: function () {
            $(this.audio).on("ended", function () {
                if ($('.app .g-btmbar .ctrl ').children('.icn:last').hasClass('icn-one')) {
                    // console.log('单曲循环')
                    root.pro.start(0);
                    audio.play();
                } else if ($('.app .g-btmbar .ctrl ').children('.icn:last').hasClass('icn-loop')) {
                    // console.log('循环播放')
                    $scope.find(".next-btn").trigger("click");
                } else if ($('.app .g-btmbar .ctrl ').children('.icn:last').hasClass('icn-shuffle')) {
                    // console.log('随机')
                    var len = $scope.find('.f-cb li').length;
                    var index = Math.round(Math.random() * len);
                    $scope.trigger("play:change", index);
                    root.pro.start(0);
                }
            })
        },
        play: function () {
            this.audio.play();
            this.status = "play";
            
            audioManager.prototype.addPlay();
            
        },
        pause: function () {
            this.audio.pause();
            this.status = "pause";
        },
        setAudioSource: function (src) {
            console.log(src)
            this.audio.src = src;
            this.audio.load();
        },
        jumpToplay: function (time) {
            console.log(time)
            this.audio.currentTime = time;
            this.play();
        },
        addPlay:function(){
            var songId = $('.g-btmbar .words .name').attr('date-id');
            $.post('/comment/addplay',{songId},function(data){
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");
                } else {
                    console.log('点击次数 + 1');
                }
            })
        }

    }
    root.audioManager = audioManager;
})(window.player || (window.player = {}))
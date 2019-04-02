
var root = window.player;
var $scope = $('.app .g-btmbar');
var songList;
var controlmanager;
var audio = new root.audioManager();
var timer = null;
var userId = $('.header .h-user .getUserId').val();

function bindClick() {
    $scope.on("play:change", function (event, index, flag) {
        console.log(index);
        root.renderList(songList[index], index);
        audio.setAudioSource('../../../resouce/music/' + songList[index].MusicUrl);
        if (audio.status == "play" || flag) {
            audio.play();
            root.pro.start();
        }
    })
    $scope.on("click", ".prev-btn", function () {
        var index = controlmanager.prev();
        $scope.trigger("play:change", index);
        if (audio.status == "play") {
            root.pro.start(0);
        } else {
            root.pro.upDate(0);
        }
        controlmanager = new root.controlManager($scope.find('.f-cb li').length, $scope.find('.f-cb li.z-sel').index());
    })
    $scope.on("click", ".next-btn", function () {
        controlmanager = new root.controlManager($scope.find('.f-cb li').length, $scope.find('.f-cb li.z-sel').index());
        var index = controlmanager.next();
        $scope.trigger("play:change", index);
        if (audio.status == "play") {
            root.pro.start(0);
        } else {
            root.pro.upDate(0);
        }
        controlmanager = new root.controlManager($scope.find('.f-cb li').length, $scope.find('.f-cb li.z-sel').index());
    })
    $scope.on("click", ".play-btn", function () {
        // console.log('111')
        if (audio.status == "play") {
            audio.pause();
            root.pro.stop();
        } else {
            root.pro.start();
            audio.play();
        }
        $(this).toggleClass("playing");
    })

    $scope.on("click",'.one',function(){
        root.pro.start(0);
        audio.play();
    })
}
function bindTouch() {
    var $slider = $scope.find('.spot');
    var left = $('.pro-bottom').offset().left;
    var width = $('.pro-bottom').width();
    $slider.on('mousedown', function () {
        root.pro.stop();
        $slider.on('mousemove', function (e) {
            var x = e.clientX;
            var per = (x - left) / width;
            if (per >= 0 && per <= 1) {
                root.pro.upDate(per);
            }
        })

    })
    $scope.on('mouseup', '.m-pbar', function (e) {
        var x = e.clientX;
        var per = (x - left) / width;
        controlmanager = new root.controlManager($scope.find('.f-cb li').length, $scope.find('.f-cb li.z-sel').index());
        var index = $scope.find('.f-cb li.z-sel').index()
        if (per >= 0 && per <= 1) {
            var curTime = per * songList[controlmanager.index].songTime;
            audio.jumpToplay(curTime);
            $scope.find('.play-btn').addClass('playing');
            audio.status = 'play';
            root.pro.start(per, curTime);
        }
    })

}

function getData(url) {
    $.ajax({
        type: "GET",
        url: url + userId,
        success: function (data) {
            bindClick();
            bindTouch()
            // controlmanager = new root.controlManager(data.length);
            songList = data;
            console.log(controlmanager)
            root.render(data);
            //此处调用了renderList.js文件进行渲染
            root.renderList(songList[0], 0);
            audio.setAudioSource('../../../resouce/music/' + songList[0].MusicUrl);
            root.pro.renderAllTime(songList[0].songTime)
        },
        error: function () {
            console.log("error")
        }
    })
}
getData("/play=")








// 删除、添加、播放图标触发事件
    ; (function () {
        var obj = {
            deleteSong: function () {   // 删除播放列表歌曲

                $scope.find('.f-cb ').on('click', 'li .icn-del', function (e) {
                    e.stopPropagation();
                    var colId = $(this).parent().parent().parent().attr('col-id');
                    // console.log(colId)
                    $.get('/collect/del/' + colId, '', function (data) {
                        if (data == "操作失败") {
                            alert("查询失败，请重新操作");
                        } else {
                            $.ajax({
                                type: "GET",
                                url: '/play=' + userId,
                                success: function (data) {
                                    songList = data;
                                    root.render(data);
                                    $scope.find('.wrap .s-fc3').text($(".app .m-playbar .f-cb li").length);
                                },
                                error: function () {
                                    console.log("error")
                                }
                            })
                        }
                    });
                });
            },
            addplay: function () {  //点击添加图标

                $('.content .singer-content').find('.singerContent table').on('click', '.icn-add', function () {
                    var self = this;
                    var songId = $(self).parent().parent().parent().attr('date-id');
                    obj.clickAdd(songId);
                });
                $('.content .rankList').find('.g-wrap12 table').on('click', '.icn-add', function () {
                    var self = this;
                    var songId = $(self).parent().parent().parent().attr('date-id');
                    obj.clickAdd(songId);
                })
                $('.content .g-mymusic').find('.table table').on('click', '.icn-add', function () {
                    var self = this;
                    var songId = $(self).parent().parent().parent().attr('date-id');
                    obj.clickAdd(songId);
                })
                $('.content .g-search').on('click', '#m-search .hshow .icn-add', function () {
                    var self = this;
                    var songId = $(self).parent().parent().parent().attr('date-id');
                    obj.clickAdd(songId);
                })
                $('.content .g-wrap3').on('click','.item .icn-add',function(){
                    var self = this;
                    var songId = $(self).parents('div.item').attr('date-id');
                    obj.clickAdd(songId);
                })
                $('.content .n-bill ').on('click','.z-hvr .icn-add',function(){
                    var self = this;
                    var songId = $(self).parents('li.z-hvr').attr('date-id');
                    obj.clickAdd(songId);
                })
                $('.content .song').on('click','.m-info .u-btni-add',function(){
                    var songId = $('.content .song .tit em').attr('date-id');
                    obj.clickAdd(songId)
                })
                $('.content ').on('click','.g-bd5 .n-songtb tbody .icn-add',function(){
                    var songId = $(this).parents('tr').attr('date-id');
                    obj.clickAdd(songId)
                })
                
            },
            clickAdd: function (songId) {         //点击添加图标触发的事件
                var userId = $('.header .h-user .getUserId').val();
                console.log(songId)
                $.post('/saveSong', { userId, songId }, function (data) {
                    if (data == "操作失败") {
                        alert("请先登录");
                    } else if (data == "歌曲已存在") {
                        obj.Toast('歌曲已存在！');
                    }
                    else {
                        obj.Toast('添加成功！');
                        $.ajax({
                            type: "GET",
                            url: '/play=' + userId,
                            success: function (data) {
                                songList = data;
                                root.render(data);
                                $scope.find('.wrap .s-fc3').text($(".app .m-playbar .f-cb li").length);
                            },
                            error: function () {
                                console.log("error")
                            }
                        })
                    }
                });
            },
            songplay: function () { // 点击播放图标
                $('.content .singer-content').find('table').on('click', '.ply', function () {
                    var self = this;
                    var songId = $(self).parent().parent().parent().attr('date-id');

                    obj.clickPlay(songId);
                })
                $('.content .rankList').find('.g-wrap12 table').on('click', '.ply', function () {
                    var self = this;
                    var songId = $(self).parent().parent().parent().attr('date-id');

                    obj.clickPlay(songId);
                })
                $('.content .g-mymusic').find('.table table').on('click', '.ply', function () {
                    var self = this;
                    var songId = $(self).parent().parent().parent().attr('date-id');

                    obj.clickPlay(songId);
                })
                $('.content .g-search').on('click', '#m-search .hd .ply', function () {
                    var self = this;
                    var songId = $(self).attr('date-id');
                    obj.clickPlay(songId);
                })
                $('.content .g-wrap3').on('click','.item .ply',function(){
                    var self = this;
                    var songId = $(self).parents('div.item').attr('date-id');
                    obj.clickPlay(songId);
                })
                $('.content .n-bill ').on('click','.z-hvr .ply',function(){
                    var self = this;
                    var songId = $(self).parents('li.z-hvr').attr('date-id');
                    obj.clickPlay(songId);
                })
                $('.content .song').on('click','.m-info .u-btni-addply',function(){
                    var songId = $('.content .song .tit em').attr('date-id');
                    obj.clickPlay(songId)
                })
                $('.content .g-bd5').on('click','.n-songtb td.left .ply',function(){
                    var songId = $(this).parents('tr').attr('date-id');
                    obj.clickPlay(songId)
                })
            },
            clickPlay: function (songId) {       //点击播放图标触发的事件
                var userId = $('.header .h-user .getUserId').val();
                console.log(songId)
                $.post('/saveSong', { userId, songId }, function (data) {
                    if (data == "操作失败") {
                        alert("请先登录");
                    } else if (data == "歌曲已存在") {
                        $scope.find('.play-btn').addClass("playing");
                        var index = $('.g-btmbar .listbd ul').find("li[date-id  = " + songId + " ]").index();
                        $scope.trigger("play:change", index);
                        root.pro.start(0);
                        audio.play();
                    }
                    else {
                        $.ajax({
                            type: "GET",
                            url: '/play=' + userId,
                            success: function (data) {
                                songList = data;
                                root.render(data);
                                $scope.find('.play-btn').addClass("playing");
                                var index = $('.g-btmbar .listbd ul').find("li[date-id  = " + songId + " ]").index();
                                $scope.trigger("play:change", index);
                                root.pro.start(0);
                                audio.play();
                            },
                            error: function () {
                                console.log("error")
                            }
                        })
                    }
                });
            },
            Toast: function (info) {
                $('.content').children('.succEidt').text(info)
                $('.content').children('.succEidt').css({ display: 'block' });
                setTimeout(function () {
                    $('.content').children('.succEidt').css({ display: 'none' });
                }, 1000)
            },
            init: function () {
                obj.deleteSong();
                obj.addplay();
                obj.songplay();
            }
        }

        obj.init();
    })()




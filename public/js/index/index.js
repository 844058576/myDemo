
; (function () {
    //首页导航条功能
    var flag = true;     //开关
    var cli = {
        hide: function () {       //输入框提示文字隐藏
            // console.log('1')
            $('.parent').on('click', function () {
                if (flag) {
                    $('#tips').css('display', "none");
                    $('#serach').focus();
                    flag = false;
                }
            })
            cli.show();
            // cli.searchCli();
        },
        show: function () {        //输入框提示文字显示
            $('#serach').blur(function () {
                if (!$('#serach').val()) {
                    $('#tips').css('display', "block");
                    flag = true;
                }
            });
        },
        myAccounts: function () {
            var obj = $('.dropdown-current-user').html();
            if (obj) {
                var str = JSON.parse(obj.toString().replace(/\[|]/g, ''));
                $('.user-img').attr({ title: str.nickname })
            }
        },
        enter: function () {        //若已登录帐号个人帐号信息栏信息展示
            cli.hover('mouseenter', 'block');
            cli.confirmExit(); //询问是否退出帐号
            cli.myAccounts();   //鼠标移动到图片显示登录帐号
            cli.leave();        //鼠标离开个人信息消失，登录按钮出现
        },
        leave: function () {        //如果未登录帐号个人帐号信息栏隐藏
            cli.hover('mouseleave', 'none');
        },
        hover: function (mouse, display) {      //鼠标移动到帐号图片显示菜单栏
            // console.log(111)
            $('#lis').on(mouse, function () {
                var obj = $('.dropdown-current-user').html();
                if (obj) {
                    var str = JSON.parse(obj.toString().replace(/\[|]/g, ''));
                    $('.user-img').attr({ title: str.nickname })
                    $('#user-li').css('display', display);
                }
            })
        },
        login: function () {        //点击登录弹出登录窗口
            $('.h-user .h-login').on('click', function () {
                cli.forbidScroll();
                cli.createDom();
                cli.closeLogin();
                cli.postLogin();
                cli.drag();
            })
        },
        drag: function () {// 实现登录/注册窗口拖拽记忆最后一次top、left值
            var oDemo = document.getElementById('m_login');
            var oHead = document.getElementById('m_header');
            var manageCookie = {
                setCookie: function (name, value, data) {
                    document.cookie = name + '=' + value + ';max-age=' + data;
                    return this;
                },
                removeCookie: function (name) {
                    this.setCookie(name, '', -1);
                    return this;
                },
                getCookie: function (name, callback) {
                    var allCookieArr = document.cookie.split('; ');
                    var len = allCookieArr.length;
                    for (var i = 0; i < len; i++) {
                        var itemCookieArr = allCookieArr[i].split('=');
                        if (itemCookieArr[0] == name) {
                            callback(itemCookieArr[1]);
                            return this;
                        }
                    }
                    callback(null);
                    return this;
                }
            }


            var drag = {
                init: function (dom, head) {
                    this.dom = dom;
                    this.head = head;
                    var _this = this;
                    this.bindEvent();
                    manageCookie.getCookie('newLeft', function (data) {
                        _this.dom.style.left = data + 'px';
                    }).getCookie('newTop', function (data) {
                        _this.dom.style.top = data + 'px';
                        return data;
                    })
                },
                bindEvent: function () {
                    this.head.onmousedown = this.mouseDown.bind(this);
                },
                mouseDown: function (e) {
                    document.onmousemove = this.mouseMove.bind(this);
                    document.onmouseup = this.mouseUp.bind(this);

                    this.disY = e.clientY - this.dom.offsetTop;
                    this.disX = e.clientX - this.dom.offsetLeft;
                },
                mouseMove: function (e) {
                    this.newLeft = e.clientX - this.disX;
                    this.newTop = e.clientY - this.disY;


                    if (this.newLeft < 0) {
                        this.newLeft = 0;
                    }
                    if (this.newTop < 0) {
                        this.newTop = 0;
                    }
                    if (this.newLeft > document.documentElement.clientWidth - this.dom.offsetWidth) {
                        this.newLeft = document.documentElement.clientWidth - this.dom.offsetWidth;
                    }
                    if (this.newTop > document.documentElement.clientHeight - this.dom.offsetHeight) {
                        this.newTop = document.documentElement.clientHeight - this.dom.offsetHeight;
                    }


                    this.dom.style.left = this.newLeft + 'px';
                    this.dom.style.top = this.newTop + 'px';
                },
                mouseUp: function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    manageCookie.setCookie('newLeft', this.newLeft, 10000).setCookie('newTop', this.newTop, 100000);
                }
            }
            drag.init(oDemo, oHead);



        },
        createDom: function () {    //创建登录窗口与遮罩层
            var mask = '<div class="mask"></div>';
            var str =
                '<div class="m_header" id="m_header">登录</div>\
                    <div class="login-form">\
                    <form id="login_form" action="/login" type="post">\
                        <ul>\
                            <li>\
                                <input id="user" class="user" type="text" name="accounts" placeholder="请输入帐号" autocomplete="off" maxlength="10">\
                                <label class="label-img" for="user"><img src="../public/images/index/user.png" alt=""></label>\
                                <label class="label-error" for="user">\
                                    <div class="text-error user-error">请输入6-10位数的帐号</div>\
                                </label>\
                            </li>\
                            <li>\
                                <input id="key" class="key" type="password" name="password" placeholder="请输入密码" autocomplete="off" maxlength="10">\
                                <label class="label-img" for="key"><img src="../public/images/index/key.png" alt=""></label>\
                                <label class="label-error" for="key">\
                                    <div class="text-error key-error">请输入6-10位数的密码</div>\
                                </label>\
                            </li>\
                        </ul>\
                        <div class="error hide">输入错误，请检查帐号和密码格式</div>\
                        <div class="login-tab1">\
                            <div class="login-tab1-item1">\
                                <button type="" class="btn-login">登录</button>\
                                没有账号？\
                                <a href="#" class="register">去注册</a>\
                            </div>\
                            <div class="login-tab1-item2">\
                                <a href="#">忘记密码</a>\
                            </div>\
                        </div>\
                        </form>\
                    </div>\
                </div>\
                 <span class="zcls" title="关闭窗体">×</span>';
            $('body').append(mask);
            $('.m_login').html(str);

            $('.m_login').css('display', 'block');
        },
        forbidScroll: function () {     //当弹出登录窗口进制x,y轴滚动
            var left = $(document).scrollLeft();
            var top = $(document).scrollTop();
            $(document).on('scroll.unable', function (e) {
                $(document).scrollLeft(left);
                $(document).scrollTop(top);
            })
        },
        closeLogin: function () {      //关闭登录窗口
            // console.log(1)
            $('.zcls').on('click', function () {
                console.log(1)
                $('.m_login').css('display', 'none');
                $('.mask').css({ display: 'none' });
                $(document).unbind("scroll.unable");
            })
        },
        createRegister: function () {     //创建注册窗口
            var reg =
                '<form id="register_form" action="/register" type="post">\
                <ul>\
                <li>\
                    <input id="nickname" class="nickname" type="hidden" name="nickname">\
                    <input id="account" class="user account" type="text" name="accounts" placeholder="请输入帐号" autocomplete="off" maxlength="10">\
                    <label class="label-img" for="account"><img src="../public/images/index/user.png" alt=""></label>\
                    <label class="label-error" for="account">\
                        <div class="text-error account-err">请输入6-10位数的帐号</div>\
                    </label>\
                </li>\
                <li>\
                    <input id="password" class="key password" type="password" name="password" placeholder="请输入密码" autocomplete="off" maxlength="10">\
                    <label class="label-img" for="password"><img src="../public/images/index/key.png" alt=""></label>\
                    <label class="label-error" for="password">\
                        <div class="text-error password-err">请输入以字母开头6-10位数的密码</div>\
                    </label>\
                </li>\
            </ul>\
            <div class="error hide">输入错误，请检查帐号和密码格式</div>\
            <div class="register-tab1">\
                <div class="register-tab1-item1">\
                    <button type="" class="btn-register">注册</button>\
                    已有账号？\
                    <a href="#" class="login" id="login">去登录</a>\
                </div>\
                <div class="register-tab1-item2">\
                    <a href="#">忘记密码</a>\
            </div>\
            </form>'
            $('.login-form').html(reg);
            $('.m_login .m_header').text('注册')
            $('.m_login #nickname').val('用户' + Math.round(Math.random() * 1000000000));
        },
        Register: function () {         //注册帐号事件
            //为动态创建的元素绑定时间需要找到一个已经存在的父级元素
            $('.m_login').on('click', '.register', function () {
                // console.log($('.login-form'));
                $(".login-form").empty();
                cli.createRegister();
                cli.postRegister();
                cli.returnLogin();
            })
        },
        returnLogin: function () {  //返回登录窗口
            $('.m_login').on('click', '#login', function () {
                cli.forbidScroll();
                cli.createDom();
                cli.postLogin();
                cli.closeLogin();
            })
        },
        postLogin: function () {    //ajax验证帐号密码是否一致
            $('#login_form').on('submit', function (e) {
                e.preventDefault();
                var formData = $(this).serialize();
                console.log(formData);
                $.ajax({
                    url: '/login',
                    type: 'post',
                    data: formData,
                    dataType: 'json',
                    success: function (data) {
                        var err_code = data.err_code;
                        if (err_code === 0) {
                            window.alert('登录成功！');
                            // 服务端重定向针对异步请求无效
                            window.location.href = '/';
                        } else if (err_code === 1) {
                            window.alert('用户名或者密码错误');
                            // $('#text2').html('用户名或者密码错误').css({ color: 'red' })
                        } else if (err_code === 2) {
                            window.alert('用户名不能为空');
                            // $('#text1').html('用户名不能为空！').css({ color: 'red' })
                        } else if (err_code === 500) {
                            window.alert('服务器忙，请稍后重试！');
                        }
                    }
                })
            });
        },
        postRegister: function () {     //ajax验证用户是否可以注册
            $('#register_form').on('submit', function (e) {
                e.preventDefault();
                var formData = $(this).serialize();
                console.log(formData);
                $.ajax({
                    url: '/register',
                    type: 'post',
                    data: formData,
                    dataType: 'json',
                    success: function (data) {
                        // var timer = null;
                        var err_code = data.err_code;
                        if (err_code === 0) {
                            window.alert('注册成功！');
                            // 服务端重定向针对异步请求无效
                            window.location.href = '/';
                        } else if (err_code === 1) {
                            window.alert('用户名已存在');
                        } else if (err_code === 2) {
                            window.alert('用户名或密码不能为空');
                        } else if (err_code === 500) {
                            window.alert('服务器忙，请稍后重试！');
                        }
                    }
                })
            })
        },
        confirmExit: function () {      //询问是否退出登录 防止误点
            $('.my-item.exit').on('click', function (e) {
                if (!confirm('您确定退出吗？')) { return false; }
            });
        },
        myMicLog: function () {
            $('.musicContent a.btn').on('click', function () {
                cli.forbidScroll();
                cli.createDom();
                cli.postLogin();
                cli.closeLogin();
            })

        },
        init: function () {
            cli.hide();
            cli.enter();
            cli.login();
            cli.Register();
            cli.myMicLog();
        }
    }
    cli.init();


    var sub = {
        userLogin: function () {
            sub.account('#user', '.user-error', '#key', '.key-error');     //登录输入框验证
            sub.account('#account', '.account-err', '#password', '.password-err'); //注册输入框验证
        },
        account: function (user, account, key, password) {
            $('.m_login').on('blur', user, function () {
                $(user).val().length > 5 ? $(account).css('color', 'orange') : $(account).css('color', 'red');
            });
            $('.m_login').on('blur', key, function () {
                var str = $(key).val();
                var reg = /^[a-zA-Z]{1}[a-zA-Z_0-9]{5}/;//正则以字母开头后面可以为字母或数字不允许特殊字符
                reg.test(str) ? $(password).css('color', 'orange') : $(password).css('color', 'red');
            });
        },
        init: function () {
            sub.userLogin();
        }
    }
    sub.init();





    // 渲染首页分类 榜单事件
    (function () {
        var obj = {
            clickIndex: function () {       //点击首页
                $('#index').on('click', function () {
                    // console.log('#per')
                    $('.header').css({ position: 'relative' });
                    $('.content').children().css({ display: 'none' });
                    $('.m-top a.title').removeClass('active');
                    $('.link').remove();
                    $(this).addClass('active');
                    $('.content').children('.index').css({ display: 'block' });

                })
            },
            clickClass: function () {      //点击歌曲分类选项事件
                $('.content .g-wrap3 .recommend').children('a').on('click', function () {
                    $('.content').children().css({ display: 'none' });
                    $('.content').children('.classify').css({ display: 'block' });
                    $('.classify .srchsongst').empty();

                })
                //华语
                $('.content .g-wrap3 .recommend').children('a').eq(0).on('click', function () {
                    // obj.classify1();
                    $.get('/find/classify1', {}, function (data) {
                        if (data.length != 0) {
                            obj.calssFun(data);
                        } else {
                            $('.classify .srchsongst').append('<h1 style="color:#abcdef">暂未收录该类别歌曲</h1>');
                        }
                    })
                })
                //流行
                $('.content .g-wrap3 .recommend').children('a').eq(1).on('click', function () {
                    $.get('/find/classify2', {}, function (data) {
                        if (data.length != 0) {
                            obj.calssFun(data);
                        } else {
                            $('.classify .srchsongst').append('<h1 style="color:#abcdef">暂未收录该类别歌曲</h1>');
                        }

                    })
                })
                //摇滚
                $('.content .g-wrap3 .recommend').children('a').eq(2).on('click', function () {
                    $.get('/find/classify3', {}, function (data) {
                        if (data.length != 0) {
                            obj.calssFun(data);
                        } else {
                            $('.classify .srchsongst').append('<h1 style="color:#abcdef">暂未收录该类别歌曲</h1>');
                        }
                    })
                })
                //民谣
                $('.content .g-wrap3 .recommend').children('a').eq(3).on('click', function () {
                    $.get('/find/classify4', {}, function (data) {
                        if (data.length != 0) {
                            obj.calssFun(data);
                        } else {
                            $('.classify .srchsongst').append('<h1 style="color:#abcdef">暂未收录该类别歌曲</h1>');
                        }
                    })
                })
                //电子
                $('.content .g-wrap3 .recommend').children('a').eq(4).on('click', function () {
                    $.get('/find/classify5', {}, function (data) {
                        if (data.length != 0) {
                            obj.calssFun(data);
                        } else {
                            $('.classify .srchsongst').append('<h1 style="color:#abcdef">暂未收录该类别歌曲</h1>');
                        }
                    })
                })
            },
            appendHtml: function (data, i) { //创建歌曲标签
                var str = '<div class="item f-cb h-flag" date-id="' + data[i].Id + '" date-singer="' + data[i].SingerId + '" date-ablum="' + data[i].CDId + '">\
                <div class="td">\
                    <div class="hd">\
                        <a id="song_30431367" class="ply " title="播放"></a>\
                    </div>\
                </div>\
                <div class="td w0">\
                    <div class="sn">\
                        <div class="text MusicName">\
                            <a href="void:0"><b title="'+ data[i].MusicName + '">' + data[i].MusicName + '</b></a>\
                        </div>\
                    </div>\
                </div>\
                <div class="td">\
                    <div class="opt hshow">\
                        <a class="u-icn u-icn-81 icn-add" href="javascript:;" title="添加到播放列表" hidefocus="true"></a>\
                        <span class="icn icn-fav" title="收藏"></span>\
                        <span class="icn icn-share" title="分享"></span>\
                        <a href="../../../resouce/music/'+ data[i].MusicUrl + '" download="' + data[i].MusicUrl + '">\
                            <span class="icn icn-dl" title="下载"></span>\
                        </a>\
                    </div>\
                </div>\
                <div class="td w1">\
                    <div class="text singerName">\
                        <a href="void:0">\
                            <span class="s-fc7">'+ data[i].singerName + '</span>\
                        </a>\
                    </div>\
                </div>\
                <div class="td w2">\
                    <div class="text">\
                        <a class="s-fc3" href="void:0" date-id="'+ data[i].CDId + '" title="' + data[i].CDName + '">' + data[i].CDName + '</a>\
                    </div>\
                </div>\
                <div class="td">'+ data[i].songTime + '</div>\
            </div>';

                $('.classify .srchsongst').append(str);
            },
            calssFun: function (data) {
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");
                } else {

                    $.each(data, function (i) {
                        obj.appendHtml(data, i);
                    })

                }
            },
            clickIfy: function () {    //在歌曲分类页面点击各个分类
                $('.classify .g-wrap3 .recommend').children('a').on('click', function () {
                    $('.content').children().css({ display: 'none' });
                    $('.content').children('.classify').css({ display: 'block' });
                    $('.classify .srchsongst').empty();
                })
                //华语
                $('.classify .g-wrap3 .recommend').children('a').eq(0).on('click', function () {
                    // obj.classify1();
                    $.get('/find/classify1', {}, function (data) {
                        console.log(data)
                        if (data.length != 0) {
                            obj.calssFun(data);
                        } else {
                            $('.classify .srchsongst').append('<h1 style="color:#abcdef">暂未收录该类别歌曲</h1>');
                        }
                    })
                })
                //流行
                $('.classify .g-wrap3 .recommend').children('a').eq(1).on('click', function () {
                    $.get('/find/classify2', {}, function (data) {
                        console.log(111)
                        console.log(data)
                        if (data.length != 0) {
                            obj.calssFun(data);
                        } else {
                            $('.classify .srchsongst').append('<h1 style="color:#abcdef">暂未收录该类别歌曲</h1>');
                        }

                    })
                })
                //摇滚
                $('.classify .g-wrap3 .recommend').children('a').eq(2).on('click', function () {
                    $.get('/find/classify3', {}, function (data) {
                        console.log(111)
                        if (data.length != 0) {
                            console.log(111)
                            obj.calssFun(data);
                        } else {
                            $('.classify .srchsongst').append('<h1 style="color:#abcdef">暂未收录该类别歌曲</h1>');
                        }
                    })
                })
                //民谣
                $('.classify .g-wrap3 .recommend').children('a').eq(3).on('click', function () {
                    $.get('/find/classify4', {}, function (data) {
                        if (data.length != 0) {
                            obj.calssFun(data);
                        } else {
                            $('.classify .srchsongst').append('<h1 style="color:#abcdef">暂未收录该类别歌曲</h1>');
                        }
                    })
                })
                //电子
                $('.classify .g-wrap3 .recommend').children('a').eq(4).on('click', function () {
                    $.get('/find/classify5', {}, function (data) {
                        if (data.length != 0) {
                            obj.calssFun(data);
                        } else {
                            $('.classify .srchsongst').append('<h1 style="color:#abcdef">暂未收录该类别歌曲</h1>');
                        }
                    })
                })
            },
            judgeFun: function () {    //将首页分类列表歌曲时间改为分秒形式
                if ($('.content .g-wrap3 .item .songTime').text()) {
                    var len = $('.content .g-wrap3 .item .songTime').length;
                    for (i = 0; i < 10; i++) {
                        var duration = $('.content .g-wrap3 .item .songTime').eq(i).text();
                        $('.content .g-wrap3 .item .songTime').eq(i).text(formatTime(duration));
                    }
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
            },
            init: function () {
                obj.clickIndex();
                obj.clickClass();
                obj.clickIfy();
                obj.judgeFun();
            }
        }
        obj.init();
    })();

    //点击进入专辑详情页面
    (function () {
        $('.content .g-wrap3 .w2 a.s-fc3').on('click', function () {
            var CDId = $(this).attr('date-id');
            ablumAjax(CDId);
        })
        $('.content').on('click', '.g-search #m-search li .u-cover a', function () {
            var CDId = $(this).attr('data-id');
            ablumAjax(CDId);
        })
        $('.content').on('click', '.singer-content .allAlbum li .u-cover a', function () {
            var CDId = $(this).attr('date-id');
            ablumAjax(CDId);
        })
        $('.content').on('click', '.index #perspective .wrap_img', function () {
            var CDId = $(this).attr('date-id');
            ablumAjax(CDId);
        })
        function ablumAjax(CDId) {
            $('.content').children().css({ display: 'none' });
            $('.content .g-bd5').css({ display: 'block' })
            $('.g-bd5 .m-table tbody').empty();
            $.get('/artist/CDId=' + CDId, {}, function (data) {
                if (data == "操作失败") {
                    alert("查询失败，请重新操作");
                } else {
                    console.log(data);
                    $('.g-bd5 .cover img').attr({ src: '../../../public/images/album/' + data[0].CDImg })
                    $('.g-bd5 .cntc .tit h2').text(data[0].CDName)
                    $('.g-bd5 .cntc .intr a.s-fc7').text(data[0].singerName);

                    $.each(data, function (i) {
                        var str = '<tr date-id="' + data[i].Id + '">\
                        <td class="left">\
                            <div class="hd">\
                                <span class="ply ">&nbsp;</span>\
                                <span class="num">'+ parseInt(i + 1) + '</span>\
                            </div>\
                        </td>\
                        <td class="">\
                            <div class="f-cb">\
                                <div class="tt">\
                                    <div class="ttc">\
                                        <span class="txt">\
                                            <a  id="MusicId" href="void:0" date-id="'+ data[i].Id + '">\
                                                <b title="'+ data[i].MusicName + '">' + data[i].MusicName + '</b>\
                                            </a>\
                                        </span>\
                                    </div>\
                                </div>\
                            </div>\
                        </td>\
                        <td class="s-fc3">\
                            <span class="u-dur ">'+ formatTime(data[i].songTime) + '</span>\
                            <div class="opt hshow">\
                                <a class="u-icn u-icn-81 icn-add" href="javascript:;" title="添加到播放列表"></a>\
                                <span class="icn icn-fav" title="收藏"></span>\
                            </div>\
                        </td>\
                        <td>\
                            <div class="text" title="'+ data[i].singerName + '">\
                                <span title="'+ data[i].singerName + '">\
                                    <a class="" href="void:0" hidefocus="true">'+ data[i].singerName + '</a>\
                                </span>\
                            </div>\
                        </td>\
                    </tr>';

                        $('.g-bd5 .m-table tbody').append(str);
                    })
                }
            })
        }


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


        $(window).bind("scroll", function () {
            var sTop = $(window).scrollTop();
            var sTop = parseInt(sTop);
            if (sTop >= window.innerHeight / 2) {
                $('.back-top').css({display:'block'})
            }
            else {
                $('.back-top').css({display:'none'})
            }
        });
        $('.back-top').on('click',function(){
            $('html , body').animate({scrollTop: 0},'fast');
        })
    })();

    //滚轮事件 播放器
    (function () {
        var drag = document.getElementsByClassName('scrol-1')[0],
            drag1 = document.getElementsByClassName('scrol')[0];
        container = document.getElementsByClassName('listlyric')[0],
            container1 = document.getElementsByClassName('listbdc')[0],
            duration = document.getElementsByClassName('bline-1')[0],
            contants = document.getElementsByClassName('listlyric')[0],
            containerHeight = document.getElementsByClassName('listlyric')[0].offsetHeight,
            contantsHeight = $('.listlyric').children('p').length * $('.listlyric').children('p').height();
        var drageHeight = Math.floor(containerHeight / contantsHeight * duration.offsetHeight);
        console.log(drag, container);
        drag.style.height = drageHeight + 'px';
        init()
        function init() {
            starDrag(drag, duration);
            scrollWheen(drag, container);
            scrollSong(drag1, container1);
            btnScoll(drag)
        }
        function starDrag(item, duration) {//拖拽滑动条

            addEvent(item, 'mousedown', function (e) {
                e = e || window.event;
                var topY = e.pageY;
                document.onmousemove = function (e) {
                    e = e || window.event;
                    var chay = e.pageY - topY;
                    //console.log(chay);
                    if (chay > 0) {
                        console.log('往下走');
                        item.style.top = chay + item.offsetTop + 'px';
                        if ((chay + item.offsetHeight + item.offsetTop) > duration.offsetHeight) {
                            item.style.top = duration.offsetHeight - item.offsetHeight + 'px';
                        }
                    } else {
                        console.log('往上走');
                        item.style.top = chay + item.offsetTop + 'px';
                        if ((chay + item.offsetTop) <= 0) {
                            item.style.top = 0 + 'px';
                        }
                    }
                    topY = e.pageY;
                    gunScoll(item);
                }

                document.onmouseup = function () {
                    document.onmousemove = null;
                }

            })

        }


        function scrollWheen(item, box) {//滑轮滚动  歌词
            var t = 32;

            addEvent(box, 'mousewheel', fnwheel)
            function fnwheel(e) {
                e.preventDefault();
                if (e.wheelDeltaY < 0) {
                    var a = t += 32;
                    console.log(a);
                    console.log('往下走');
                    $('.listlyric').children('p').css({
                        transform: 'translateY(' + (-a) + 'px)',
                        transition: 'all 0.1s ease-in-out'
                    })
                    // 比例
                    // console.log(a)
                    var x = a / ($('.listlyric').children('p').length * $('.listlyric').children('p').height());
                    // console.log(x)
                    // 移动top
                    var y = x * 158;
                    // console.log(y);
                    $('.g-btmbar .list .bline .scrol-1').css({
                        top: y + 'px'
                    });
                    if (a > $('.listlyric').children('p').length * $('.listlyric').children('p').height() - $('.g-btmbar .list .listlyric').height()) {
                        t = $('.listlyric').children('p').length * $('.listlyric').children('p').height() - $('.g-btmbar .list .listlyric').height();
                        $('.g-btmbar .list .bline .scrol:last').css({
                            top: '158px'
                        })
                    }

                } else {
                    var a = t -= 32;
                    $('.listlyric').children('p').css({
                        transform: 'translateY(' + (-a) + 'px)',
                        transition: 'all 0.1s ease-in-out'
                    })
                    if (a <= 0) {
                        t = 32
                    }
                    // 比例
                    // console.log(a)
                    var x = a / ($('.listlyric').children('p').length * $('.listlyric').children('p').height());
                    // console.log(x)
                    // 移动top
                    var y = x * 158;
                    // console.log(y);
                    $('.g-btmbar .list .bline .scrol-1').css({
                        top: y + 'px'
                    });
                }

                gunScoll(item);
            }

        }

        function scrollSong(item, box) {//滑轮滚动  歌曲
            var t = 28;

            addEvent(box, 'mousewheel', fnwheel)
            function fnwheel(e) {
                e.preventDefault();
                if (e.wheelDeltaY < 0) {
                    var a = t += 28;
                    // console.log(a);
                    // console.log('往下走');
                    $('.list .listbdc ul').css({
                        position: 'absolute',
                        top: (-a) + 'px'
                    });
                    // 比例
                    var x = a / $('.g-btmbar .list .listbdc ul').height();
                    // 移动top
                    var y = x * $('.g-btmbar .list .listbdc').height();
                    console.log(y);
                    $('.g-btmbar .list .bline .scrol:first').css({
                        top: y + 'px'
                    });

                    if (a > $('.list .listbdc ul').height() - $('.g-btmbar .list .listbdc').height()) {
                        t = $('.list .listbdc ul').height() - $('.g-btmbar .list .listbdc').height();
                        $('.g-btmbar .list .bline .scrol:first').css({
                            top: '158px'
                        });
                    }
                } else {
                    var a = t -= 28;
                    $('.list .listbdc ul').css({
                        position: 'absolute',
                        top: (-a) + 'px'
                    })
                    if (a <= 0) {
                        t = 28
                    }
                    // 比例
                    var x = a / $('.g-btmbar .list .listbdc ul').height();
                    // 移动top
                    var y = x * $('.g-btmbar .list .listbdc').height();
                    console.log(y);
                    $('.g-btmbar .list .bline .scrol:first').css({
                        top: y + 'px'
                    });
                }

                gunScoll(item);
            }

        }

        function gunScoll(item) {
            var scale = item.offsetTop / (duration.offsetHeight - item.offsetHeight);
            var scollContents = scale * (contantsHeight - containerHeight);
            // console.log(contantsHeight-contantsHeight);
            contants.style.top = -scollContents + 'px';
        }

        //点击上下按钮
        function btnScoll(item) {
            var btnUl = document.getElementsByTagName('ul')[0];
            addEvent(btnUl, 'click', function (e) {
                // console.log(e.target.parentNode.className);
                if (e.target.parentNode.className == 'ico up') {
                    console.log('上');
                    item.style.top = -10 + item.offsetTop + 'px';
                    if ((item.offsetTop) <= 0) {
                        item.style.top = 0 + 'px';
                    }

                } else if (e.target.parentNode.className == 'ico down') {
                    console.log('下');
                    item.style.top = item.offsetTop + 10 + 'px';
                    if ((item.offsetHeight + item.offsetTop) > duration.offsetHeight) {
                        item.style.top = duration.offsetHeight - item.offsetHeight + 'px';
                    }

                }
                gunScoll(item);
            })


        }


        //兼容添加事件库
        function addEvent(obj, type, fn, bool) {
            bool = bool || false;//默认冒泡
            //一般情况
            if (obj.addEventListener) {
                obj.addEventListener(type, handle, bool);
                //火狐下的滚轮事件
                if (type == 'mousewheel') {
                    obj.addEventListener('DOMMouseScroll', handle, bool);
                }
            } else {
                obj.attachEvent('on' + type, handle);
            }
            //兼容函数
            function handle(e) {
                e = e || window.event;//event兼容
                e.wheel = e.wheelDelta || e.detail * -40;//滚轮方向兼容；
                fn.call(obj, e); //统一this指向
                e.preventDefault ? e.preventDefault() : e.returnValue = false;//阻止默认；
            }

        }
        //兼容移除事件库
        function removeEvent(obj, type, fn, bool) {
            bool = bool || false;//默认冒泡
            //一般情况
            if (obj.removeEventListener) {
                obj.removeEventListener(type, fn, bool);
                // alert('yichu')
                //火狐下的滚轮事件
                if (type == 'mousewheel') {
                    obj.removeEventListener('DOMMouseScroll', fn, bool);
                }
            } else {
                obj.detachEvent('on' + type, fn);
            }

        }


    })()
})()
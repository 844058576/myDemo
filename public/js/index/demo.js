;(function () {
    var oImg = document.getElementsByClassName('wrap_img');

    var deg = 360 / oImg.length;
    //越往后的图片，旋转的单位度数+1
    window.onload = function () {
        for (var i = 0; i < oImg.length; i++) {
            oImg[i].style.transform = "rotateY(" + deg * i + "deg) translateZ(350px)";
            oImg[i].style.transition = "1s " + (oImg.length - i) * 0.1 + "s";
        }
    }

    //按下  移动  松开事件
    var newX, newY, sX, sY, lX, lY, rotateX = -10, rotateY = 0;
    var oWrap = document.getElementById('wrap');
    var oBody = document.getElementById('perspective')
    oBody.onmousedown = function (event) {
        // console.log("按下");
        lX = event.clientX;
        lY = event.clientY;
        this.onmousemove = function (event) {
            // console.log("移动");
            newX = event.clientX;
            newY = event.clientY;

            sX = newX - lX; //求2次鼠标移动的距离
            sY = newY - lY;
            rotateX -= sY * 0.2;
            rotateY += sX * 0.1;
            //把已经计算的差值给旋转的度数
            oWrap.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
            //当新的值用完之后就变成了旧的值
            lX = newX;
            lY = newY;
        }

        this.onmouseup = function (event) {
            // console.log("松开");
            this.onmousemove = null; //清空移动事件
            var timer = setInterval(function () {
                sX *= 0.95;
                sY *= 0.95;

                rotateX -= sY * 0.2;
                rotateY += sX * 0.1;

                oWrap.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

                if (Math.abs(sX) < 0.1 && Math.abs(sY) < 0.1) {
                    clearInterval(timer);//清除定时器
                }
            })
        }
    }
})()


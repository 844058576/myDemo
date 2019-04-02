(function(){
    function unScroll() {
        var left = $(document).scrollLeft();
        $(document).on('scroll.unable', function (e) {
            $(document).scrollLeft(left);
        })
    }
    unScroll();
})()
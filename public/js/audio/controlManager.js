// controlManager.js文件控制上一首、播放/暂停、下一首按钮index值的计算和实现功能。
; (function(root){
    function controlManager(len,index){
        this.index = index;
        this.len = len;
    }
    controlManager.prototype = {
        prev : function(){
            return this.getIndex(-1);
        },
        next : function(){
            return this.getIndex(1);
        },
        getIndex : function(val){
            var index = this.index;
            var len = this.len;
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlManager = controlManager;
})(window.player || (window.player = {}));
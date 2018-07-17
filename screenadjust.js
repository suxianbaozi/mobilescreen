var ScreenAdJust = {
    _loadingCss:false,
    _loadingIndex:-1,
    _cssList:[],
    psdWidth:1080,
    setPsdWidth:function(width){
        this.psdWidth = width;
    },
    addCss:function(css) {
        this._cssList.push(css);
        this._loadCss();
    },
    _loadCss:function(){
        if(!this._loadingCss) {
            if((this._cssList.length-1)>this._loadingIndex) {
                this._loadingCss = true;
                this._loadCssContent(this._cssList[this._loadingIndex+1],function(content){

                    content = this._formatCss(content);
                    var style = document.createElement('style');
                    style.innerHTML = content;
                    document.head.appendChild(style);


                    this._loadingIndex ++ ;
                    this._loadingCss = false;

                    this._loadCss();
                }.bind(this))
            }
        }
    },
    _formatCss:function(content){
        content = content.replace(new RegExp("\\/\\*\\{([\\-\\d]+)\\}\\*\\/", "g"),function(all,v){
            return this.getRealPx(parseInt(v))+'px';
        }.bind(this));
        return content;
    },
    getRealPx : function(px){
        return  Math.round(screen.availWidth/this.psdWidth*px);
    },
    _loadCssContent:function(css,complete){
        this.getCssContent(css,complete);
    },
    //跨域的情况,请重写这个方法
    getCssContent:function(css,complete) {
        //这里可能产生跨域问题,特别是带cdn的情况,可以采取
        $.get(css,function(content){
            complete(content);
        })
    }
};
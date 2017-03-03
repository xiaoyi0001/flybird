(function (Fly) {
    var Pipe = function (config) {

        //上面的管道
        this.imgTop = config.imgTop;
        //下面的管道
        this.imgBottom = config.imgBottom;
        //上下文
        this.context = config.context;
        //管道的宽
        this.w = this.imgTop.width;
        //管道的高
        this.h = this.imgTop.height;
        //管道的x坐标
        this.x = config.x;
        this.topY = 0;
        this.bottomY = 0;
        //上下管道的间距
        this.space = 150;
        //管道的移动速度
        this.vt = 0.2;
        //第一次调用生成管道高度的方法
        this.changeH();

    };
    Pipe.prototype.render = function (t) {
        this.drawWay();

        //绘制上面的管道
        this.context.drawImage(this.imgTop, this.x, this.topY);

        //绘制下面的管道
        this.context.drawImage(this.imgBottom, this.x, this.bottomY);

        // this.context.fillStyle="blue";
        // this.context.fill();
        //改变管道的x坐标使管道移动
        this.x -= this.vt * t;
        //如果第一个上下管道出了画布,重新生成一对上下管道,并放到最后
        if (this.x < -this.w) {
            this.x += this.w * 3 * 6;

            //调用生成高度方法
            this.changeH();
        }

    };
    //绘制路径的方法
    Pipe.prototype.drawWay = function () {
        //绘制上面管道的路径
        this.context.rect(this.x, this.topY, this.w, this.h);
        //绘制下面管道的路径
        this.context.rect(this.x, this.bottomY, this.w, this.h);
    };
    //生成管道高度的方法
    Pipe.prototype.changeH = function () {
        //管道的随机高度
        this.randomH = Math.random() * 200 + 50;
        //上面管道的y坐标
        this.topY = this.randomH - this.h;
        //下面管道的y坐标
        this.bottomY = this.randomH + this.space;
    };
    Fly.pipe = Pipe;
    // Fly.getPipe = function (config) {
    //     return new Pipe(config);
    // }
})(Fly);
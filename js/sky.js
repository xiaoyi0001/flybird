(function (Fly) {
    var Sky = function (config) {
        //天空对象
        this.img = config.img;
        //上下文
        this.context = config.context;
        //天空的x坐标
        this.x = config.x || 0;
        //天空的y坐标
        this.y = config.y || 0;
        //天空的宽度
        this.w = this.img.width;
        //天空的高度
        this.h = this.img.height;
        //画布为匀速运动,声明画布移动速度
        this.vt = 0.2;
    };
    Sky.prototype.render = function (t) {
        //渲染天空到画布中
        this.context.drawImage(this.img, this.x, this.y);
        //改变天空的x坐标使天空移动
        this.x -= this.vt * t;
        //当前面的天空出了画布,将他移到后面天空的后面
        if (this.x <= -this.w) {
            this.x += 2 * this.w;
        }
    };
    Fly.sky = Sky;
    // Fly.getSky = function (config) {
    //     return new Sky(config);
    // }
})(Fly);

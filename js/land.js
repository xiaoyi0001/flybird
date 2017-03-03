(function (Fly) {
    var Land = function (config) {
        this.img = config.img;
        this.context = config.context;
        this.w = this.img.width;
        this.h = this.img.height;
        this.x = config.x || 0;
        this.y = config.y || this.context.canvas.height - this.h;
        //画布为匀速运动,声明画布移动速度
        this.vt = 0.2;
    };
    Land.prototype.render = function (t) {
        //渲染陆地到画布中
        this.context.drawImage(this.img, this.x, this.y);
        this.x -= this.vt * t;
        if (this.x <= -this.w) {
            this.x += 4 * this.w;
        }
    };
    Fly.land = Land;
    // Fly.getLand = function (config) {
    //     return new Land(config);
    // }
})(Fly);

(function (Fly) {
    var Bird = function (config) {
        //vt=v0+at; s=vt*t+1/2*a*t*t;
        //保存小鸟图片对象
        this.img = config.img;
        //上下文
        this.context = config.context;
        this.cv = this.context.canvas;
        this.index = 0;
        //初始速度
        this.vt = 0;
        //加速度
        this.a = 0.0005;
        this.x = 50;
        this.y = 0;
        //给小鸟定义一个最大旋转角度
        this.maxAngle = 45;
        //最大瞬时速度
        this.maxVt = 0.5;
        this.w = this.img.width / 3;
        this.h = this.img.height;
    };
    //小鸟的渲染方法
    Bird.prototype.render = function (t) {

        //移动坐标系到小鸟当前位置
        this.context.translate(this.x, this.y);

        //判断小鸟当前速度
        if (this.vt > this.maxVt) {
            this.vt = this.maxVt;
        } else if (this.vt < -this.maxVt) {
            this.vt = -this.maxVt;
        }
        //计算小鸟的旋转角度
        this.angle = this.vt / this.maxVt * this.maxAngle;
        //旋转坐标系
        this.context.rotate(Fly.toRadian(this.angle));
        this.context.drawImage(this.img, this.w * this.index++, 0, this.w, this.h, -1 / 2 * this.w, -1 / 2 * this.h, this.w, this.h);
        this.index %= 3;
        //让小鸟可以下落
        this.y += this.vt * t + 1 / 2 * this.a * t * t;
        this.vt += this.a * t;


    };
    Bird.prototype.changSpeed = function () {
        var that = this;
        //给画布添加一个点击事件,点击画布,让小鸟向上运动
        that.context.canvas.addEventListener('click', function () {
            that.vt = -0.3;
        })
    };
    Bird.prototype.listenerList = [];
    Bird.prototype.addListener = function (callback) {
        //判断小鸟是否碰撞
        this.listenerList.push(callback);

    };
    Bird.prototype.die = function (obj) {

        if (this.y >= (this.cv.height - obj['land'].height - 10) ||
            this.context.isPointInPath(this.x, this.y)) {
            this.listenerList.forEach(function (value) {
                value();
            })
        }
    };
    Fly.bird = Bird;

    // Fly.getBird = function (config) {
    //     return new Bird(config);
    // }

})(Fly);

(function (Fly) {
    var Game = function (config) {
        this.context = config.context;
        //创建一个数组保存图片名称
        this.imgList = ['birds', 'land', 'pipe1', 'pipe2', 'sky'];
        //上一帧的时间
        this.lastTime = new Date();
        //当前帧的时间
        this.currentTime = new Date();
        //定义一个变量判断是否执行绘制
        this.flag = true;
        this.t = 0;

    };
    Game.prototype = {
        constructor: Game,
        initRoles  : function (obj) {
            var ctx = this.context;
            var that = this;
            //创建小鸟对象
            // this.birdObj = Fly.getBird({
            //     img    : obj['birds'],
            //     context: ctx
            // });
            this.birdObj = Fly.factory('birds', {
                img    : obj['birds'],
                context: ctx
            });
            //订阅发布者的消息
            this.birdObj.addListener(function () {
                that.gameOver();
            });

            //创建一个数组保存所有除小鸟以外的对象
            this.roles = [];
            //创建天空对象
            for (var i = 0; i < 2; i++) {
                var skyObj = Fly.factory('sky', {
                    img    : obj['sky'],
                    context: ctx,
                    x      : obj['sky'].width * i
                });
                this.roles.push(skyObj);
            }
            //创建管道对象
            for (var i = 0; i < 6; i++) {
                var pipeObj = Fly.factory('pipe', {
                    imgTop   : obj['pipe2'],
                    imgBottom: obj['pipe1'],
                    context  : ctx,
                    x        : 300 + obj['pipe1'].width * 3 * i
                });
                this.roles.push(pipeObj);
            }

            //创建陆地对象
            for (var i = 0; i < 4; i++) {
                var landObj = Fly.factory('land', {
                    img    : obj['land'],
                    context: ctx,
                    x      : obj['land'].width * i
                });
                this.roles.push(landObj);
            }
        },
        //绘制画面
        draw       : function () {
            var that = this;
            var ctx = this.context;
            var cv = this.context.canvas;
            Fly.loadImg(this.imgList, function (obj) {
                //图片加载完成时调用初始化方法
                that.initRoles(obj);
                function render() {
                    //开启新路径
                    ctx.beginPath();
                    //保留当前状态
                    ctx.save();
                    //当前帧的时间
                    that.currentTime = new Date();
                    //时间间隔
                    that.t = that.currentTime - that.lastTime;
                    that.lastTime = that.currentTime;
                    //清除画布
                    ctx.clearRect(0, 0, cv.width, cv.height);

                    //调用渲染方法
                    that.roles.forEach(function (role) {
                        role.render(that.t);
                    });

                    //调用渲染小鸟方法
                    that.birdObj.render(that.t);
                    //检测小鸟是否发生碰撞
                    that.birdObj.die(obj);
                    //调用点击画布事件
                    that.birdObj.changSpeed();
                    //还原状态
                    ctx.restore();
                    if (that.flag == true) {
                        window.requestAnimationFrame(render);
                    }
                }

                window.requestAnimationFrame(render);
            })

        },
        //游戏开始方法
        startGame  : function () {
            this.draw();
        },
        //游戏结束方法
        gameOver   : function (obj) {
            this.flag = false;
        }

    };

    Fly.game = Game;
})(Fly);

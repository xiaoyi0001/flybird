//使用沙箱模式
(function (window) {
    var Fly = {};
    //加载图片函数
    //callback为一个函数
    Fly.loadImg = function (imgList, callback) {
        //声明一个变量记录图片加载的数量
        var count = 0;
        //声明一个对象保存每个图片对象
        var imgs = {};
        //遍历该数组,创建图片对象
        imgList.forEach(function (val) {
            var img = new Image();
            //设置图片对象的src属性
            img.src = 'imgs/' + val + '.png';
            //将图片对象放入到imgs中
            imgs[val] = img;
            //添加加载事件
            img.addEventListener('load', function () {
                count++;
                if (count >= 5) {
                    //执行绘图等操作的代码
                    callback(imgs);
                }
            })
        })
    };
    Fly.toRadian = function (angle) {
        return angle / 180 * Math.PI;
    };
    Fly.factory = function (objName, config) {
        switch (objName) {
            case 'birds':
                return new Fly.bird(config);
            case 'sky' :
                return new Fly.sky(config);
            case 'pipe' :
                return new Fly.pipe(config);
            case 'land' :
                return new Fly.land(config);
            default :
                return null;
        }
    };

    var gameInstance = null;
    Fly.getGame = function (config) {
        if (gameInstance === null) {
            gameInstance = new Fly.game(config);
        }
        return gameInstance;
    };

    window.Fly = Fly;
})(window);

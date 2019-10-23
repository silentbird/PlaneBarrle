var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 球的管理类
 */
var MapBall = /** @class */ (function (_super) {
    __extends(MapBall, _super);
    function MapBall() {
        var _this = _super.call(this) || this;
        /**
         * 场景里 所有球的数组
         */
        _this.ballArr = [];
        /**
        * 场景里 所有金币的数组
        */
        _this.propArr = [];
        _this.gameState = true;
        _this.TYPE1 = "type1";
        _this.TYPE2 = "type2";
        _this.TYPE3 = "type3";
        _this.TYPE4 = "type4";
        GlobleFun.map = _this;
        _this.init();
        MapBall.mapball = _this;
        return _this;
    }
    MapBall.prototype.init = function () {
        // this.addBall();
        Laya.timer.loop(1, this, this.onLoop);
        this.updataBall();
        // this.addBall();
    };
    MapBall.getMapBall = function () {
        return MapBall.mapball;
    };
    MapBall.prototype.onLoop = function () {
        //游戏状态判断 游戏结束 初始化 ballArr
        if (GlobleFun.isOver && this.gameState) {
            this.gameState = false;
            //this.again();
        }
        if (!GlobleFun.isOver) {
            this.gameState = true;
        }
    };
    MapBall.prototype.addBall = function (data) {
        var ball;
        // ball.destroy
        if (data) //如果是分裂的球的话 执行
         {
            if (data.ballLevel <= 1) {
                return;
            } //球的等级小于等于1 不分裂
            var type = this.getType();
            ball = new Ball(data, type); //实例化 球 并设置球的类型
            ball.splitCount = data.splitCount; //设置已分裂次数
            var ran = Math.random();
            if (ran > 0.5) {
                data.x < Laya.stage.width * 0.2 ? ball.x = data.x + 20 : ball.x = data.x - 20;
                ball.y = data.y;
                this.dropItem(data);
            }
            else {
                data.x > Laya.stage.width * 0.8 ? ball.x = data.x - 20 : ball.x = data.x + 20;
                ball.y = data.y;
                this.dropItem(data);
            }
        }
        else {
            var type = this.getType();
            var r = Math.random();
            ball = new Ball(null, type);
            if (r > 0.5) {
                ball.x = -30;
                Laya.Tween.to(ball, { x: ball.x + 180 }, 800);
            }
            else {
                ball.x = Laya.stage.width + 30;
                ball.speedx = -ball.speedx;
                Laya.Tween.to(ball, { x: ball.x - 180 }, 800);
            }
            ball.y = GlobleFun.RandomNumBoth(100, 300);
            Laya.Tween.to(ball, { y: ball.y + 30 }, 800);
        }
        this.setBallEvent(ball); //监听球的各种事件
        this.ballArr.push(ball);
        this.addChild(ball);
    };
    /**
    * 分裂掉落道具物品 dir 右1 左2
    */
    MapBall.prototype.addprop = function (dir, type) {
        switch (type) {
            case 1: // 分裂红币 威力
                var prop = Laya.Pool.getItemByCreateFun("bulletPower", function () {
                    return new Prop(1);
                });
                break;
            case 2: //分裂蓝币 子弹数量
                var prop = Laya.Pool.getItemByCreateFun("bulletSpeed", function () {
                    return new Prop(2);
                });
                break;
            case 3: //分裂散弹道具
                var prop = Laya.Pool.getItemByCreateFun("bulletShotgun", function () {
                    return new Prop(3);
                });
                break;
            case 4: //分裂发射器道具 
                var prop = Laya.Pool.getItemByCreateFun("bulletLauncher", function () {
                    return new Prop(4);
                });
                break;
            case 5: //分裂无敌保护道具
                var prop = Laya.Pool.getItemByCreateFun("bulletInvincible", function () {
                    return new Prop(5);
                });
                break;
            case 6: //分裂激光道具
                var prop = Laya.Pool.getItemByCreateFun("bulletLaser", function () {
                    return new Prop(6);
                });
                break;
        }
        prop.onload(); // 初始化 item 的参数
        prop.setDir(dir); //设置道具的初始x 轴运动方向
        this.propArr.push(prop); //添加进数组
        prop.once("over", this, this.removeProp); //游戏结束监听
        prop.once("hitProp", this, this.onHitProp); //和玩家碰撞监听
        prop.once("fadeOut", this, this.onFadeOut); //和玩家碰撞监听
        this.addChild(prop);
        return prop;
    };
    MapBall.prototype.dropItem = function (data) {
        var nn = 2 + Math.floor(GlobleFun.checkpoint / 10);
        for (var i = 0; i < 1; i++) {
            var prop = void 0;
            var prop2 = void 0;
            var rrr = Math.random();
            var blue = false;
            var red = false;
            if (rrr >= 0.1) { //红币 90%
                red = true;
            }
            if (rrr >= 0.5) { //蓝币 50%
                blue = true;
            }
            if (data.x > Laya.Browser.clientWidth * 0.85) {
                if (red) {
                    prop = this.addprop(2, 1);
                }
                if (blue) {
                    prop2 = this.addprop(2, 2);
                }
            }
            else if (data.x < Laya.Browser.clientWidth * 0.15) {
                if (red) {
                    prop = this.addprop(1, 1);
                }
                if (blue) {
                    prop2 = this.addprop(1, 2);
                }
            }
            else {
                var dir = 0;
                var rdir = Math.random();
                rdir > 0.5 ? dir = 1 : dir = 2;
                if (red) {
                    prop = this.addprop(dir, 1);
                }
                if (blue) {
                    prop2 = this.addprop(dir, 2);
                }
            }
            var x = data.x - data.width / 2;
            var y = data.y - data.height / 2;
            var xx = GlobleFun.RandomNumBoth(x, x + data.width);
            var yy = GlobleFun.RandomNumBoth(y, y + data.height);
            if (prop) {
                prop.pos(xx, yy);
            }
            if (prop2) {
                prop2.pos(xx, yy);
            }
        }
        this.dropSpecialItem(data);
    };
    MapBall.prototype.dropSpecialItem = function (data) {
        if (GlobleFun.specialBall) { //类型5的球 不掉落 特殊道具
            return;
        }
        var prop3;
        var prop4;
        var prop5;
        var prop6;
        var Shotgun = false;
        var Launcher = false;
        var Invincible = false;
        var Laser = false;
        var rrrrrr = Math.random();
        if (rrrrrr >= 0.95 && rrrrrr < 1 && !Launcher && !Invincible && !Laser && this.isdropItem() && !GlobleFun.haveProp && GlobleFun.bulletInterval < 120) { //散弹 5% 
            Shotgun = true;
        }
        if (rrrrrr >= 0.9 && rrrrrr < 0.95 && !Shotgun && !Invincible && !Laser && this.isdropItem() && !GlobleFun.haveProp) { //发射器 5%
            Launcher = true;
        }
        if (rrrrrr >= 0.88 && rrrrrr < 0.9 && !Launcher && !Shotgun && !Laser && this.isdropItem() && !GlobleFun.haveProp) { //无敌保护 2%
            Invincible = true;
        }
        if (rrrrrr >= 0.85 && rrrrrr < 0.88 && !Launcher && !Shotgun && !Invincible && this.isdropItem() && !GlobleFun.haveProp && GlobleFun.Score >= 200000) { //激光3%（当分数到达200000时有几率掉落）
            Laser = true;
        }
        if (Shotgun) {
            prop3 = this.addprop(2, 3);
            GlobleFun.haveProp = true;
        }
        if (Launcher) {
            prop4 = this.addprop(2, 4);
            GlobleFun.haveProp = true;
        }
        if (Invincible) {
            prop5 = this.addprop(2, 5);
            GlobleFun.haveProp = true;
        }
        if (Laser) {
            prop6 = this.addprop(2, 6);
            GlobleFun.haveProp = true;
        }
        if (prop3) {
            prop3.pos(data.x, data.y);
        }
        if (prop4) {
            prop4.pos(data.x, data.y);
        }
        if (prop5) {
            prop5.pos(data.x, data.y);
        }
        if (prop6) {
            prop6.pos(data.x, data.y);
        }
    };
    /**
     * 判断是否处于 特殊道具的状态
     */
    MapBall.prototype.isdropItem = function () {
        var is = false;
        if (GlobleFun.player.shotgunState == 1 || GlobleFun.player.launcherState == 1 || GlobleFun.player.InvincibleState == 1 || GlobleFun.player.laserState == 1) {
            is = false;
        }
        else {
            is = true;
        }
        return is;
    };
    MapBall.prototype.onFadeOut = function (prop) {
        for (var i = 0; i < this.propArr.length; i++) {
            if (this.propArr[i] == prop) {
                this.propArr.splice(i, 1);
                prop.removeSelfAddPool();
                break;
            }
        }
    };
    /**
     * 当玩家和道具发生碰撞时
     */
    MapBall.prototype.onHitProp = function (prop) {
        // console.log("onHitGold");
        for (var i = 0; i < this.propArr.length; i++) {
            if (this.propArr[i] == prop) {
                this.propArr.splice(i, 1);
                prop.removeFromParent();
                break;
            }
        }
    };
    /**
     * 监听球的 事件
     */
    MapBall.prototype.setBallEvent = function (ball) {
        ball.once(Ball.SMASH, this, this.onSmash); //监听球的粉碎事件
        ball.on("dropItem", this, this.onEffect); //监听球的特殊事件
        ball.once("again", this, this.removeBall); //监听重新开始按钮
        // ball.on(this.TYPE1,this,this.effect1); //监听病毒1的特殊事件；
    };
    //监听球的 分裂事件
    MapBall.prototype.onSmash = function (ball) {
        var _this = this;
        // ball.removeFromParent();
        if (ball.ballType == 5) { //如果球的类型时5 着3秒后 删除球 
            //3秒后 执行一次
            Laya.timer.once(3000, this, function () {
                for (var i = 0; i < _this.ballArr.length; i++) {
                    if (_this.ballArr[i] == ball) {
                        _this.ballArr.splice(i, 1);
                        ball.removeFromParent();
                        GlobleFun.specialBall = false;
                        GlobleFun.haveSpecialBall = false;
                        GlobleFun.GameScene.isSpecialBall = false;
                        GlobleFun.Background.changeBg(); //切换背景
                        break;
                    }
                }
            });
            return; //返回 不执行 下面的语句
        }
        for (var i = 0; i < this.ballArr.length; i++) {
            if (this.ballArr[i] == ball) {
                this.ballArr.splice(i, 1);
                ball.removeFromParent();
                break;
            }
        }
        //球太小就不分裂
        if (ball.ballSize < 20) {
            return;
        }
        else if (ball.ballSize >= 20) {
            var num = 2;
        }
        else {
            var num = 1;
        }
        for (var i = 0; i < num; i++) {
            if (ball.ballLevel > 1) { //球只分裂一次 !ball.data  //球最多可以分裂两次 ball.splitCount<=2 //球的大小等级大于1时 分裂 ball.ballLevel>1
                this.addBall(ball);
            }
        }
    };
    MapBall.prototype.onEffect = function (ball) {
        console.log("type======" + ball.ballType + "     xxxx=" + ball.x);
        this.dropItem(ball);
    };
    //游戏结束删除球
    MapBall.prototype.removeBall = function (ball) {
        ball.removeFromParent();
        console.log("removeFromParent");
        for (var i = 0; i < this.ballArr.length; i++) {
            if (this.ballArr[i] == ball) {
                this.ballArr.splice(i, 1);
                console.log("splice");
                break;
            }
        }
    };
    //游戏结束删除删除道具
    MapBall.prototype.removeProp = function (prop) {
        prop.removeFromParent();
        console.log("removeFromParent");
        for (var i = 0; i < this.propArr.length; i++) {
            if (this.propArr[i] == prop) {
                this.propArr.splice(i, 1);
                console.log("splice");
                break;
            }
        }
    };
    /**
     * 得到 球的类型
     */
    MapBall.prototype.getType = function () {
        var type = 0;
        var typeRandom = Math.random() * 100 + 1;
        //根据随机得到的数值 设置球的类型
        if (GlobleFun.specialBall && !GlobleFun.haveSpecialBall) { //特殊球 直接返回5
            GlobleFun.haveSpecialBall = true;
            return 5;
        }
        if (typeRandom >= 80) //超大 20%
         {
            type = 1;
        }
        else if (typeRandom >= 70 && typeRandom < 80) { //小型 10%
            type = 2;
        }
        else if (typeRandom >= 30 && typeRandom < 70) { //大型 40%
            type = 3;
        }
        else if (typeRandom >= 1 && typeRandom < 30) { //中型 30%
            type = 4;
        }
        return type;
    };
    //刷新一个球后，判定场上球的数量，然后根据场上数量计算下一个球要多久后刷新，单位是秒
    //①　刷新频率：1.5秒刷新一个（场上数量大等于12时不再刷新）（0.009*xx*x + 0.1493x + 0.5664）/1.7（x为场中血小板数量，公式具体待定）；
    /**
     * 球的刷新频率
     */
    MapBall.prototype.updataBall = function () {
        var _this = this;
        var nn = this.ballArr.length;
        var seconds = (0.009 * nn * nn + 0.1493 * nn + 0.5664); //得到几秒刷新
        var delay = seconds * 1000; //单位为毫秒 
        Laya.timer.once(delay, this, function () {
            _this.updataBall();
            if (_this.ballArr.length >= 1) {
                return;
            } //如果场景中 有12个球 就不刷新
            if (GlobleFun.isOver) {
                return;
            }
            if (GlobleFun.specialBall) {
                return;
            }
            _this.addBall();
        });
    };
    MapBall.prototype.explosionEffect = function () {
        for (var i = 0; i < this.ballArr.length; i++) {
            var ball = this.ballArr[i];
            // this.ballArr.splice(i,1);
            ball.destroy();
            GlobleFun.Score = Math.floor(GlobleFun.Score + ball.score);
        }
        this.ballArr = [];
    };
    return MapBall;
}(Laya.Sprite));
//# sourceMappingURL=MapBall.js.map
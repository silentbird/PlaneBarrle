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
 * 道具
 */
var Prop = /** @class */ (function (_super) {
    __extends(Prop, _super);
    function Prop(type) {
        var _this = _super.call(this) || this;
        /**
         * 金币的数值
         */
        _this.Price = 1;
        _this.ape = "prop/main_icon_power.png"; //子弹威力
        _this.ape2 = "prop/main_icon_speed.png"; //子弹速度
        _this.ape3 = "prop/main_icon_bullet.png"; //散弹
        _this.ape4 = "prop/main_icon_launcher.png"; //发射器
        _this.ape5 = "prop/shield_icon.png"; //无敌
        _this.ape6 = "prop/main_icon_laser.png"; //激光
        _this.speed = -6; //初始y轴速度为负的  会先先上做抛物线
        _this.downSpeed = 0.2;
        _this.maxDownSpeed = 20;
        _this.speedX = 1;
        _this.direction = 0; //1右边  2左边
        _this.itemType = 1; //道具类型 1为增加威力  2为增加子弹速度
        _this.isFadeOut = false;
        _this.itemType = type;
        _this.init();
        return _this;
        // this.fadeOut(); 
    }
    Prop.prototype.onload = function () {
        this.alpha = 1;
        this.isFadeOut = false;
        this.maxDownSpeed = 20;
        this.speedX = GlobleFun.RandomNumBoth(1, 3);
        this.downSpeed = GlobleFun.RandomNumBoth(0.1, 0.4);
        this.speed = GlobleFun.RandomNumBoth(-2, -8);
        this.onLoop();
    };
    Prop.prototype.fadeOut = function () {
        var _this = this;
        //第5秒消失 
        Laya.timer.once(5000, this, function () {
            if (_this.speedX != 0 || _this.y <= GlobleFun.bgY - 10 || _this.maxDownSpeed != 0 || _this.speed != 0) {
                return;
            }
            _this.event("fadeOut", _this); //发送 道具的消失事件
        });
        Laya.timer.once(4000, this, function () {
            if (_this.speedX != 0 || _this.y <= GlobleFun.bgY - 10 || _this.maxDownSpeed != 0 || _this.speed != 0) {
                return;
            }
            //   if(this.y <= GlobleFun.bgY-10){return}
            Laya.Tween.to(_this, { alpha: 0 }, 1000);
            //     console.log("this.speedx=渐隐渐隐渐隐渐隐渐隐渐隐渐隐==="+this.speedX);
        });
    };
    Prop.prototype.init = function () {
        switch (this.itemType) {
            case 1:
                this.loadImage(this.ape);
                break;
            case 2:
                this.loadImage(this.ape2);
                break;
            case 3:
                this.loadImage(this.ape3);
                break;
            case 4:
                this.loadImage(this.ape4);
                break;
            case 5:
                this.loadImage(this.ape5);
                break;
            case 6:
                this.loadImage(this.ape6);
                break;
        }
        //this.itemType ==1?  this.loadImage(this.ape): this.loadImage(this.ape2);
        this.pivot(this.width / 2, this.height / 2);
    };
    Prop.prototype.onLoop = function () {
        this.timer.once(1, this, this.onLoop);
        if (GlobleFun.isOver) //游戏结束 发送金币的结束事件
         {
            this.event("over", this);
            return;
        }
        this.y += this.speed;
        this.speed += this.downSpeed;
        this.x += this.speedX;
        if (this.x - this.width / 2 <= 0 || this.x >= Laya.stage.width - this.width / 2) //碰到左右的墙壁
         {
            if (this.x + this.width >= Laya.stage.width - this.width) {
                this.x -= 5;
            }
            ;
            this.speedX = -this.speedX;
        }
        if (this.maxDownSpeed <= 0) {
            //this.speedX = 0;
            this.speedX <= 0 ? this.speedX = 0 : this.speedX = this.speedX - 0.1;
        }
        if (Math.abs(this.speed) >= this.maxDownSpeed) {
            // this.speed = this.maxDownSpeed
            this.speed > 0 ? this.speed = this.maxDownSpeed : this.speed = -this.maxDownSpeed;
        }
        ;
        if (this.y + this.height / 2 >= GlobleFun.maxY) //落到地面时
         {
            this.speed = this.maxDownSpeed;
            this.speed = Math.floor(-this.speed * 0.3);
            this.maxDownSpeed < 5 ? this.maxDownSpeed = 0 : this.maxDownSpeed = Math.floor(this.maxDownSpeed / 2);
        }
        if (!this.isFadeOut && this.y >= GlobleFun.bgY - 2 && this.maxDownSpeed <= 0 && this.speedX == 0) {
            //  console.log("this.speedx===="+this.speedX);
            //console.log("555555555555555555555");
            this.isFadeOut = true;
            this.fadeOut();
        }
    };
    /**
     * 设置金币的初始X 轴 方向 右1，左2
     * @param n
     */
    Prop.prototype.setDir = function (n) {
        this.direction = n;
        if (this.direction == 2) {
            this.speedX = (this.speedX < 0 ? this.speedX : -this.speedX);
            //this.speedX = -this.speedX;
        }
        else if (this.direction == 1) {
            this.speedX = (this.speedX < 0 ? -this.speedX : this.speedX);
        }
        // console.log("xxxxxxxxxxxxxxxx"+this.speedX);
    };
    /**
     * 更新玩家的金币数量
     */
    Prop.prototype.updataPlayerGold = function () {
        if (GlobleFun.isOver) {
            return;
        }
        switch (this.itemType) {
            case 1:
                GlobleFun.bulletPower += 0.1; //吃到增加威力的道具
                // console.log("子弹威力========"+GlobleFun.bulletPower);
                break;
            case 2:
                GlobleFun.bulletInterval += this.Price; //吃到增加子弹数量的道具
                break;
            case 3:
                console.log("散弹");
                GlobleFun.player.shotgunState = 1;
                GlobleFun.time(10, 1);
                //散弹
                break;
            case 4:
                console.log("发射器");
                GlobleFun.player.launcherState = 1;
                GlobleFun.player.loopLauncher();
                GlobleFun.time(10, 2);
                //发射器
                break;
            case 5:
                console.log("无敌");
                GlobleFun.player.InvincibleState = 1;
                GlobleFun.time(10, 3);
                //无敌
                break;
            case 6:
                GlobleFun.player.laserState = 1;
                GlobleFun.time(8, 4);
                console.log("发射激光");
                break;
        }
        // if(this.itemType ==1){
        //      GlobleFun.bulletPower += 0.1;  //吃到增加威力的道具
        //      console.log("子弹威力========"+GlobleFun.bulletPower);
        // }else{
        //     GlobleFun.bulletInterval += this.Price; //吃到增加子弹数量的道具
        // }
    };
    /**
     * 删除道具并增加玩家的金币数量
     */
    Prop.prototype.removeFromParent = function () {
        //console.log("removeFromParent");
        this.updataPlayerGold();
        this.removeSelf();
        switch (this.itemType) {
            case 1:
                Laya.Pool.recover("bulletPower", this); //子弹威力
                break;
            case 2:
                Laya.Pool.recover("bulletSpeed", this); //子弹数量
                break;
            case 3:
                Laya.Pool.recover("bulletShotgun", this); //散弹
                break;
            case 4:
                Laya.Pool.recover("bulletLauncher", this); //发射器
                break;
            case 5:
                Laya.Pool.recover("bulletInvincible", this); //无敌
                break;
            case 6:
                Laya.Pool.recover("bulletLaser", this); //激光
                break;
        }
    };
    Prop.prototype.removeSelfAddPool = function () {
        this.removeSelf();
        switch (this.itemType) {
            case 1:
                Laya.Pool.recover("bulletPower", this); //子弹威力
                break;
            case 2:
                Laya.Pool.recover("bulletSpeed", this); //子弹数量
                break;
            case 3:
                Laya.Pool.recover("bulletShotgun", this); //散弹
                break;
            case 4:
                Laya.Pool.recover("bulletLauncher", this); //发射器
                break;
            case 5:
                Laya.Pool.recover("bulletInvincible", this); //无敌
                break;
            case 6:
                Laya.Pool.recover("bulletLaser", this); //无敌
                break;
        }
    };
    return Prop;
}(Laya.Sprite));
//# sourceMappingURL=Prop.js.map
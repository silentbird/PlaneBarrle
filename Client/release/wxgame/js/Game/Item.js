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
 * 金币
 */
var Prop = /** @class */ (function (_super) {
    __extends(Prop, _super);
    function Prop(type) {
        var _this = _super.call(this) || this;
        /**
         * 金币的数值
         */
        _this.Price = 1;
        _this.ape = "face_16.png";
        _this.ape2 = "score_star0.png";
        _this.speed = -6; //初始y轴速度为负的  会先先上做抛物线
        _this.downSpeed = 0.2;
        _this.maxDownSpeed = 20;
        _this.speedX = 1;
        _this.direction = 0; //1右边  2左边
        _this.itemType = 1; //道具类型 1为增加威力  2为增加子弹速度
        _this.itemType = type;
        _this.init();
        _this.timer.frameLoop(1, _this, _this.onLoop);
        return _this;
    }
    Prop.prototype.onload = function () {
        this.maxDownSpeed = 20;
        this.speedX = 1;
        this.downSpeed = 0.2;
        this.speed = -6;
    };
    Prop.prototype.init = function () {
        this.itemType == 1 ? this.loadImage(this.ape) : this.loadImage(this.ape2);
        this.pivot(this.width / 2, this.height / 2);
        //  this.loadImage(this.ape);
        // this.setgoldPrice();
        this.speedX = GlobleFun.RandomNumBoth(1, 3);
        //this.speed = GlobleFun.RandomNumBoth(-6,2);
        this.downSpeed = GlobleFun.RandomNumBoth(0.1, 0.4);
        //  this.maxDownSpeed = Math.random()%(30-15)+15;
    };
    /**
     * 根据关卡和球的等级设置金币的价值
     */
    Prop.prototype.setgoldPrice = function () {
        var price = Math.floor(Math.random() * 100);
        this.Price = price;
    };
    Prop.prototype.onLoop = function () {
        if (GlobleFun.isOver) //游戏结束 发送金币的结束事件
         {
            this.event("over", this);
            return;
        }
        this.y += this.speed;
        this.speed += this.downSpeed;
        this.x += this.speedX;
        if (this.x <= 0 || this.x + this.width >= Laya.stage.width - this.width) //碰到左右的墙壁
         {
            if (this.x + this.width >= Laya.stage.width - this.width) {
                this.x -= 5;
            }
            ;
            this.speedX = -this.speedX;
        }
        if (this.maxDownSpeed <= 0) {
            //this.speedX = 0;
            this.speedX <= 0 ? this.speedX = 0 : this.speedX = this.speedX - 0.001;
        }
        if (Math.abs(this.speed) >= this.maxDownSpeed) {
            // this.speed = this.maxDownSpeed
            this.speed > 0 ? this.speed = this.maxDownSpeed : this.speed = -this.maxDownSpeed;
        }
        ;
        if (this.y >= GlobleFun.bgY) //落到地面时
         {
            this.speed = this.maxDownSpeed;
            this.speed = Math.floor(-this.speed * 0.3);
            this.maxDownSpeed < 5 ? this.maxDownSpeed = 0 : this.maxDownSpeed = Math.floor(this.maxDownSpeed / 2);
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
        else {
            this.speedX = (this.speedX < 0 ? -this.speedX : this.speedX);
        }
    };
    /**
     * 更新玩家的金币数量
     */
    Prop.prototype.updataPlayerGold = function () {
        if (GlobleFun.isOver) {
            return;
        }
        if (this.itemType == 1) {
            GlobleFun.bulletPower += this.Price;
        }
        else {
        }
        // GlobleFun.PlayerGold += this.goldPrice;
        // console.log(GlobleFun.PlayerGold+" 玩家金币");
        console.log(GlobleFun.bulletPower + " 玩家子弹威力");
    };
    /**
     * 删除金币并增加玩家的金币数量
     */
    Prop.prototype.removeFromParent = function () {
        //console.log("removeFromParent");
        this.updataPlayerGold();
        this.removeSelf();
        this.itemType == 1 ? Laya.Pool.recover("bulletPower", this) : Laya.Pool.recover("bulletSpeed", this);
        // this.destroy();
    };
    return Prop;
}(Laya.Sprite));
//# sourceMappingURL=Item.js.map
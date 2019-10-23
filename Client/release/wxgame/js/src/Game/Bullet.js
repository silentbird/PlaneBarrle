//威力 初始为1  文本显示为100%
//碰到 增加威力的道具 威力增加0.1
//速度 
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
 * 子弹类
 */
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(type) {
        var _this = _super.call(this) || this;
        //子弹图片
        _this.texture1 = "bullet1.png";
        _this.texture2 = "bullet2.png";
        _this.texture3 = "bullet3.png";
        _this.speedByFly = 10; //子弹飞行速度
        _this.speedByX = 6; //子弹X 偏移速度
        _this.power = 1; //子弹威力
        // private angleY:number =90; //子弹Y轴的射击角度
        _this.angleX = 0; //子弹X轴的射击角度
        _this.init(type);
        // this.pivot(this.width/2,this.height/2);
        Laya.timer.loop(1, _this, _this.onLoop);
        Laya.timer.frameLoop(1, _this, _this.checkHit);
        return _this;
    }
    Bullet.prototype.init = function (type) {
        this.angleX = Math.atan2(20, 0);
        switch (type) {
            case 1:
                this.loadImage(this.texture1);
                this.power = 1;
                break;
            case 2:
                this.loadImage(this.texture2);
                this.power = 2;
                break;
            case 3:
                this.loadImage(this.texture3);
                this.power = 3;
                break;
            default:
                this.loadImage(this.texture1);
        }
    };
    /**
     * 设置子弹的射击角度
     * @param num
     */
    Bullet.prototype.setAngle = function (num) {
        // this.angleX = num;
        var _this = this;
        this.angleX = Math.atan2(20, num);
        Laya.timer.once(50, this, function () {
            _this.angleX = Math.atan2(20, 0);
        });
    };
    /**
     * 散弹的角度
     * @param num
     */
    Bullet.prototype.setAngleshotgun = function (num) {
        // this.angleX = num;
        //  console.log("++++++++++++++++"+num);
        this.angleX = Math.atan2(20, num);
    };
    Bullet.prototype.onLoop = function () {
        this.speedByFly = GlobleFun.bulletSpeedByFly;
        this.updataPower();
        this.x += this.speedByX * Math.cos(this.angleX);
        this.y -= this.speedByFly;
        //this.y -= this.speedByFly;
        //  this.checkHit();
        if (this.y < -20) {
            this.removeSelf();
            Laya.Pool.recover("bullet", this);
            // this.destroy();
        }
        //   
    };
    /**
     * 更新子弹威力
     */
    Bullet.prototype.updataPower = function () {
        this.power = GlobleFun.bulletPower;
        // let num = Math.floor(GlobleFun.PlayerGold/100);
        // if(num < 1){num = 1};
        // this.power =num;
    };
    /**
     * 检查碰撞 子弹和球
     */
    Bullet.prototype.checkHit = function () {
        var parent = GlobleFun.map;
        if (!parent) {
            return;
        }
        ;
        var list = parent.ballArr;
        for (var i = 0; i < list.length; i++) {
            var ball = list[i];
            var l = Math.abs(Math.sqrt((this.x - ball.x) * (this.x - ball.x) + (this.y - ball.y) * (this.y - ball.y)));
            if (l < ball.height || l < ball.height) {
                // console.log(ball.width+'  '+ball.height);
                // console.log('checkHit');
                this.visible = false;
                //ball.updataScore(this.power);
                // this.removeSelf();
                this.destroy();
                // Laya.Pool.recover("bullet",this); 
                ball.updataScore(this.power);
                // this.destroy();
                break;
            }
        }
    };
    return Bullet;
}(Laya.Sprite));
//# sourceMappingURL=Bullet.js.map
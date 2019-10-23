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
        _this.texture1 = "prop/main_weapon_bullet.png";
        _this.speedByFly = 10; //子弹飞行速度
        _this.speedByX = 6; //子弹X 偏移速度
        _this.ss = 2;
        _this.ty = 1;
        _this.power = 1; //子弹威力
        // private angleY:number =90; //子弹Y轴的射击角度
        _this.angleX = Math.atan2(20, 0); //子弹X轴的射击角度
        _this.cc = 0;
        _this.issetAngleshotgun = false;
        _this.init(type);
        // this.pivot(this.width/2,this.height/2);
        _this.onLoop();
        Laya.timer.frameLoop(1, _this, _this.checkHit);
        return _this;
    }
    Bullet.prototype.init = function (type) {
        this.cc = 0;
        this.issetAngleshotgun = false;
        ;
        //this.angleX = Math.atan2(20,0);
        this.pivot(this.width / 2, this.height / 2);
        this.loadImage(this.texture1);
    };
    /**
     * 设置子弹的射击角度
     * @param num
     */
    Bullet.prototype.setAngle = function (num) {
        this.angleX = Math.atan2(20, num);
        // this.timer.once(200,this,()=>{
        //     this.angleX = Math.atan2(20,0);
        //    // this.ss =0;
        //     //console.log("Math.cos(this.angleX)=="+this.speedByX* Math.cos(this.angleX));
        //    // console.log("this.angleX=="+this.angleX);
        //    // console.log("this.x==="+this.x+"            dir="+this.ty+"   cc=="+this.cc);
        // });
    };
    /**
     * 散弹的角度
     * @param num
     */
    Bullet.prototype.setAngleshotgun = function (num) {
        // this.angleX = num;
        //  console.log("++++++++++++++++"+num);
        this.issetAngleshotgun = true;
        this.angleX = Math.atan2(10, num);
    };
    Bullet.prototype.onLoop = function () {
        this.timer.once(1, this, this.onLoop);
        this.cc += 1;
        if (this.cc >= 8 && !this.issetAngleshotgun) {
            this.angleX = Math.atan2(20, 0);
        }
        this.speedByFly = GlobleFun.bulletSpeedByFly;
        this.updataPower();
        //this.x += this.speedByX* Math.cos(this.angleX);
        this.x += this.speedByX * Math.cos(this.angleX);
        this.y -= this.speedByFly;
        //this.y -= this.speedByFly;
        //  this.checkHit();
        if (this.y < -20) {
            //  this.removeSelf();
            // Laya.Pool.recover("bullet",this); 
            this.destroy();
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
            if (l < ball.height / 2 + this.height / 2 || l < ball.width / 2 + this.width / 2) {
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
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
 * 球 测试类
 */
var BallTest = /** @class */ (function (_super) {
    __extends(BallTest, _super);
    function BallTest() {
        var _this = _super.call(this) || this;
        _this.isAlive = true;
        _this.scoreCount = 0;
        _this.speedx = 1;
        _this.speedy = 2;
        /**
         * 基础重力
         */
        _this.downSpeed = 0.1; //基础重力
        /**
         * 最大下落速度
         */
        _this.maxSpeedY = 20; //最大下落速度
        /**
         * 球的分数
         */
        _this.score = 0; //球的分数
        _this.maxY = GlobleFun.bgY;
        _this.maxX = 512;
        _this.timeCount = 0;
        _this.isaddspeed = false;
        /**
         * 球的类型
         */
        _this.ballType = 0; //球的类型   
        _this.ballSize = 0; //球的大小
        _this.ballLevel = 1; //球的等级1,2,3,4 小到大
        // this.data = data;
        // this.ballType = type; //在实例化的时候就 设置球的类型
        _this.init();
        Laya.timer.once(1, _this, function () {
            Laya.timer.frameLoop(1, _this, _this.onLoop);
        });
        return _this;
    }
    BallTest.prototype.init = function () {
        // this.ballSize=Math.floor(this.data.ballSize*0.5); 
        // this.score = Math.floor(this.data.scoreCount*0.5);
        this.setAttributive();
        this.setSpeed();
        this.scoreCount = this.score;
        this.addBall();
        this.addScore();
    };
    BallTest.prototype.onLoop = function () {
        if (GlobleFun.isOver) {
            this.event("again", this);
            return;
        } //游戏结束
        if (this.score < 1 && this.isAlive) {
            this.isAlive = false;
            this.event(Ball.SMASH, this); //发送 球的分裂事件
        }
        //y 轴上下跳动
        if (this.y >= this.maxY) { //落到地面时
            if (this.data && this.speedy <= 10 && !this.isaddspeed) { //当时分裂出来的球时 增加速度
                this.isaddspeed = true;
                this.speedy = -this.speedy - 1.6;
            }
            else {
                this.speedy = -this.speedy;
            }
            // let ran = Math.random();
            // ran>0.5?this.speedx=-this.speedx:this.speedx=this.speedx;//随机 左右方向
        }
        if (this.y <= 20) //球 太高时 
         {
            //this.speedy += 5;
            // this.y += 5;
            this.speedy += 1;
        }
        if (this.speedy >= this.maxSpeedY) {
            this.speedy = this.maxSpeedY;
        }
        this.y += this.speedy;
        this.speedy += this.downSpeed;
        //x 轴 左右移动
        if (this.x >= this.maxX - 20) { //碰到右边墙壁
            this.speedx = -this.speedx;
        }
        if (this.x <= 20) { //碰到左边墙壁
            this.speedx = -this.speedx;
        }
        this.x += this.speedx;
        // if(this.speedx >= this.maxSpeedX){this.speedx = this.maxSpeedX}
    };
    BallTest.prototype.addBall = function (type) {
        this.graphics.drawCircle(0, 0, this.ballSize, "fff0ff");
        this.size(this.ballSize, this.ballSize);
    };
    /**
     * 添加球的分数文本
     */
    BallTest.prototype.addScore = function () {
        this.text = new Laya.Text();
        this.text.text = this.score.toString();
        this.text.color = "#00ff00";
        this.text.fontSize = Math.floor(this.ballSize * 0.8); //球的分数大小和球的大小相关
        this.text.align = "center";
        this.text.pivot(this.text.width / 2, this.text.height / 2);
        this.addChild(this.text);
    };
    /**
     * 被击中更新球的分数
     */
    BallTest.prototype.updataScore = function (power) {
        if (this.score < 1 || !this.isAlive) {
            return;
        }
        this.text.pivot(this.text.width / 2, this.text.height / 2);
        this.y -= 2; //被击中向上移动一点
        this.score -= power;
        GlobleFun.Score += power;
        this.text.text = this.score.toString();
        // console.log("updataScore");
    };
    BallTest.prototype.removeFromParent = function () {
        this.destroy();
    };
    /**
    * 设置球的 等级  和球的大小
    */
    BallTest.prototype.setAttributive = function (level) {
        this.ballLevel = level;
        //根据球的类型 计算球的大小 
        switch (this.ballType) {
            case 1:
                this.ballLevel = 4;
                this.ballSize = 60;
                console.log("type1111");
                break;
            case 2:
                this.ballLevel = 1;
                this.ballSize = 15;
                console.log("type 2222");
                break;
            case 3:
                this.ballLevel = 3;
                this.ballSize = 45;
                console.log("type 3333");
                break;
            case 4:
                this.ballLevel = 2;
                this.ballSize = 25;
                console.log("type 4444");
                break;
        }
        this.setScore(); //设置分数
    };
    /**
     * 根据球的等级和关卡设置球的分数
     */
    BallTest.prototype.setScore = function () {
        if (GlobleFun.checkpoint == 1) {
            this.score = Math.floor(Math.random() * 15 + 1);
        }
        else if (GlobleFun.checkpoint == 2) {
            this.score = Math.floor(Math.random() * 50 + 6);
        }
        else {
            this.score = 1.666 * Math.pow(10, 0.4654 * GlobleFun.checkpoint);
        }
    };
    /**
    * 根据球的类型设置 球的速度
    */
    BallTest.prototype.setSpeed = function () {
        switch (this.ballType) {
            case 1: //大小 超大  速度 慢  高度 高
                this.maxSpeedY = 12;
                this.downSpeed = 0.1;
                //   this.speedx = 0.5;
                this.speedy = 3;
                break;
            case 2: //大小 小  速度 快  高度 低
                this.maxSpeedY = 12;
                this.downSpeed = 0.3;
                this.speedx = 1;
                this.speedy = 4;
                break;
            case 3: ///大小 大  速度 慢  高度 中
                this.maxSpeedY = 9;
                this.downSpeed = 0.1;
                //  this.speedx = 0.5;
                this.speedy = 3;
                break;
            case 4: //大小 中  速度 中  高度 中
                this.maxSpeedY = 15;
                this.downSpeed = 0.4;
                this.speedy = 6;
                //  this.speedx = 1;
                break;
        }
    };
    BallTest.SMASH = "smash"; //球的粉碎事件
    return BallTest;
}(Laya.Sprite));
//# sourceMappingURL=BallTest.js.map
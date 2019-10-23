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
 * 球
 */
var Ball = /** @class */ (function (_super) {
    __extends(Ball, _super);
    function Ball(data, type) {
        var _this = _super.call(this) || this;
        _this.isAlive = true;
        _this.scoreCount = 0;
        _this.speedx = 1;
        _this.speedy = 2;
        _this.downSpeed = 0.1; //基础重力
        _this.maxSpeedY = 20; //最大下落速度
        _this.maxY = GlobleFun.bgY;
        _this.maxX = 512;
        _this.timeCount = 0;
        _this.isaddspeed = false;
        _this.ballType = 0; //球的类型   
        _this.ballSize = 0; //球的大小
        _this.score = 0; //球的分数
        _this.ballLevel = 1; //球的等级1,2,3,4 小到大
        _this.countType1 = 0;
        _this.splitCount = 0; //分裂次数
        _this.shakeNum = -10;
        _this.data = data;
        _this.ballType = type; //在实例化的时候就 设置球的类型
        _this.init();
        var delay = 1;
        if (!_this.data) {
            delay = 800;
        }
        Laya.timer.once(delay, _this, function () {
            Laya.timer.loop(1, _this, _this.onLoop);
        });
        return _this;
    }
    Ball.prototype.init = function () {
        this.speedx = GlobleFun.RandomNumBoth(0.8, 1.5); //随机x 轴速度
        // console.log("随机x 轴速度==="+this.speedx);
        if (this.data) //如果是分裂的球 
         {
            //分裂条件：1<细胞等级大小<5;
            //分裂细胞大小：比原细胞小一等级；
            //分裂细胞血量：为原细胞的1/2（小数点四舍五入）；
            var dir = Math.random();
            dir > 0.5 ? this.speedx = this.speedx : this.speedx = -this.speedx; //分裂的球 随机初始x轴 方向
            this.setballLevel(this.data.ballLevel - 1); //比原细胞小一等级；
            // if(this.data.ballSize <= 15){
            //      this.ballSize=Math.floor(this.data.ballSize*0.8); 
            // }else {
            //     this.ballSize=Math.floor(this.data.ballSize*0.5); 
            // }   
            this.score = Math.round(this.data.scoreCount * 0.5); //为原细胞的1/2（小数点四舍五入）；
        }
        else {
            //  this.ballSize = 10+Math.floor(Math.random()*60);
            //  this.score = 5+Math.floor(Math.random()*20)+Math.floor(this.ballSize*0.8);
            this.setAttributive();
        }
        //  this.maxSpeedY = this.maxSpeedY-Math.floor(this.ballSize*0.1);
        // this.speedx = this.speedx - Math.floor(this.ballSize*0.008);
        this.setSpeed();
        this.scoreCount = this.score;
        this.addBall(); //设置球的 图片资源
        this.addScoreText(); //在球上加载text文本
    };
    Ball.prototype.onLoop = function () {
        if (GlobleFun.isOver) {
            this.event("again", this); //游戏结束 发送事件
            return;
        } //游戏结束
        if (this.score < 1) { //球的分数为0 时
            this.isAlive = false;
            this.splitCount += 1; //分裂次数
            this.event(Ball.SMASH, this); //发送 球的分裂事件
            return;
        }
        //y 轴上下跳动--------------------------------------------
        if (this.y >= this.maxY) { //落到地面时
            this.speedy = -this.speedy - 4;
            // this.speedy = -this.speedy; //反转 速度
            //  this.effect(); //球 落到地面时
        }
        if (this.y <= 20) //球 太高时 
         {
            this.speedy += 1;
        }
        if (Math.abs(this.speedy) >= this.maxSpeedY) {
            this.speedy > 0 ? this.speedy = this.maxSpeedY : this.speedy = -this.maxSpeedY;
        } //限制最大速度
        this.y += this.speedy;
        this.speedy += this.downSpeed;
        //x 轴 左右移动--------------------------------
        if (this.x >= Laya.stage.width - this.ballSize) { //碰到右边墙壁
            this.speedx = -this.speedx;
        }
        if (this.x - this.ballSize / 2 <= 0) { //碰到左边墙壁
            this.speedx = -this.speedx;
        }
        this.x += this.speedx;
    };
    Ball.prototype.addBall = function (type) {
        this.graphics.drawCircle(0, 0, this.ballSize, "fff0ff");
        this.size(this.ballSize, this.ballSize);
    };
    Ball.prototype.addScoreText = function () {
        this.text = new Laya.Text();
        this.text.text = this.conversionScore(this.score);
        this.text.color = "#00ff00";
        this.text.fontSize = Math.floor(this.ballSize * 0.8); //球的分数大小和球的大小相关
        this.text.pivot(this.text.width / 2, this.text.height / 2);
        this.text.align = "center";
        this.text.valign = "middle";
        this.addChild(this.text);
        //this.text.pos(0,0);
    };
    /**
     * 被子弹击中，根据子弹的威力更新球的分数
     */
    Ball.prototype.updataScore = function (power) {
        if (this.score < 1) {
            if (this.ballType == 5) {
                this.score = 0;
                this.text.text = this.conversionScore(this.score);
                this.event("dropItem", this); //类型5的球 当分数为0时 被子弹击中掉落 红币 和蓝币
                this.shakeAction();
            }
            return;
        }
        this.y -= 2; //被击中向上移动一点
        //this.score -=power;
        this.score = Math.round(this.score - power);
        //console.log("this.score="+this.score +"power="+power);
        GlobleFun.Score = Math.floor(GlobleFun.Score + power);
        if (this.score < 1) {
            return;
        }
        //  this.text.changeText(this.conversionScore(this.score));
        this.text.text = this.conversionScore(this.score);
        this.text.pivot(this.text.width / 2, this.text.height / 2);
        this.text.align = "center";
        this.text.valign = "middle";
    };
    Ball.prototype.shakeAction = function () {
        this.x += this.shakeNum;
        this.y -= this.shakeNum;
        this.shakeNum = -this.shakeNum;
    };
    Ball.prototype.removeFromParent = function () {
        this.destroy();
    };
    /**
    * 根据球的类型设置球的大小等级
    */
    Ball.prototype.setAttributive = function () {
        //根据球的类型 计算球的大小 
        switch (this.ballType) {
            case 1:
                this.setballLevel(4);
                //   console.log("type1111");
                break;
            case 2:
                this.setballLevel(1);
                //   console.log("type 2222");
                break;
            case 3:
                this.setballLevel(3);
                //  console.log("type 3333");
                break;
            case 4:
                this.setballLevel(2);
                //  console.log("type 4444");
                break;
            case 5:
                this.setballLevel(5);
                break;
        }
        this.setScore(); //设置分数
    };
    /**
     * 自定义设置 球的 大小等级 并根据等级设置球的大小
     */
    Ball.prototype.setballLevel = function (num) {
        switch (num) {
            case 1:
                this.ballLevel = 1;
                this.ballSize = 40;
                break;
            case 2:
                this.ballLevel = 2;
                this.ballSize = 50;
                break;
            case 3:
                this.ballLevel = 3;
                this.ballSize = 70;
                break;
            case 4:
                this.ballLevel = 4;
                this.ballSize = 90;
                break;
            case 5:
                this.ballLevel = 5;
                this.ballSize = 120;
                break;
            default:
                this.ballLevel = 1;
                this.ballSize = 40;
                break;
        }
    };
    /**
     * 根据特定的公式 计算球的血量
     */
    Ball.prototype.setScore = function () {
        //刷新血量：当前攻速值*当前威力*0.4*m<=x<=当前攻速*当前威力值*1.2*m（m随着分数提升，具体待定，暂使用1）
        //类型5的球的血量：当前攻速数值*当前威力数值*9*m<=x<=当前攻速数值*当前威力数值*11*m（m随着分数提升，具体待定，m随着分数提升，具体待定，暂使用1）；
        var m = 1;
        if (this.ballType == 5) {
            var min = GlobleFun.bulletInterval * GlobleFun.bulletPower * 9 * m;
            var max = GlobleFun.bulletInterval * GlobleFun.bulletPower * 11 * m;
        }
        else {
            var min = GlobleFun.bulletInterval * GlobleFun.bulletPower * 0.4 * m;
            var max = GlobleFun.bulletInterval * GlobleFun.bulletPower * 1.2 * m;
        }
        this.score = Math.round(GlobleFun.RandomNumBoth(min, max));
    };
    /**
     * 把球的分数进行转换 大于1000的为1K 10000为1M
     */
    Ball.prototype.conversionScore = function (score) {
        var str;
        var symbol = "";
        if (score >= 1000 && score < 10000) {
            str = score / 1000;
            str = str.toFixed(2);
            symbol = "k";
        }
        else if (score >= 10000 && score < 100000) {
            str = score / 10000;
            str = str.toFixed(2);
            symbol = "M";
        }
        else if (score >= 100000 && score < 1000000) {
            str = score / 100000;
            str = str.toFixed(2);
            symbol = "B";
        }
        else {
            str = score;
        }
        //let ss:string = str.toString();
        return (str.toString() + symbol);
    };
    /**
    * 根据球的类型设置 球的速度
    */
    Ball.prototype.setSpeed = function () {
        switch (this.ballType) {
            case 1: //大小 超大  速度 慢  高度 高
                this.maxSpeedY = 10;
                this.downSpeed = 0.08;
                this.data ? this.speedy = -4 : this.speedy = 2; //如果是分裂出来的球 向上做抛物线
                break;
            case 2: //大小 小  速度 快  高度 低
                this.maxSpeedY = 8;
                this.downSpeed = 0.13;
                this.speedx = 1.2;
                this.data ? this.speedy = -4 : this.speedy = 2; //如果是分裂出来的球 向上做抛物线
                break;
            case 3: ///大小 大  速度 慢  高度 中
                this.maxSpeedY = 8;
                this.downSpeed = 0.08;
                //  this.speedx = 0.5;
                this.data ? this.speedy = -4 : this.speedy = 2; //如果是分裂出来的球 向上做抛物线
                break;
            case 4: //大小 中  速度 中  高度 中
                this.maxSpeedY = 10;
                this.downSpeed = 0.13;
                this.data ? this.speedy = -4 : this.speedy = 2; //如果是分裂出来的球 向上做抛物线
                break;
            case 5: //大小 中  速度 中  高度 中
                this.maxSpeedY = 10;
                this.downSpeed = 0.08;
                this.data ? this.speedy = -4 : this.speedy = 2; //如果是分裂出来的球 向上做抛物线
                break;
        }
    };
    Ball.SMASH = "smash";
    return Ball;
}(Laya.Sprite));
//# sourceMappingURL=Ball.js.map
/**
 * 球
 */
class Ball extends Laya.Sprite {

    private ballTexture1: string = "ball/main_cells_01.png";
    private ballTexture2: string = "ball/main_cells_02.png";
    private ballTexture3: string = "ball/main_cells_03.png";
    private ballTexture4: string = "ball/main_cells_04.png";
    private ballTexture5: string = "ball/main_cells_06.png";
    private isAlive: boolean = true;
    //private ball:any;
    private text: Laya.Text;

    private scoreCount: number = 0;
    public static SMASH: string = "smash";

    public data: any;//粉碎的主球的数据

    public speedx: number = 1;
    private speedy: number = 2;
    private downSpeed: number = 0.1; //基础重力
    private maxSpeedY: number = 20;//最大下落速度

    private maxY: number = GlobleFun.maxY;
    private maxX: number = 512;

    private timeCount: number = 0;

    private isaddspeed: boolean = false;

    public ballType: number = 0;//球的类型   
    public ballSize: number = 0;//球的大小
    public score: number = 0;//球的分数
    public ballLevel: number = 1;//球的等级1,2,3,4 小到大

    private countType1: number = 0;
    public splitCount: number = 0;  //分裂次数
    private shakeNum: number = -10;//特殊球的抖动幅度
    public specialBallRedCount: number = 0;//特殊球 掉落的红币数量 35
    public specialBallBlueCount: number = 0;//特殊球 掉落的蓝币数量 20

    constructor(data?: any, type?: number) {
        super();
        this.data = data;
        this.ballType = type; //在实例化的时候就 设置球的类型
        this.init();
        let delay = 1;
        if (!this.data) { delay = 1000 }
        Laya.timer.once(delay, this, () => {
            Laya.timer.loop(1, this, this.onLoop);
        });

    }
    private init(): void {
        this.speedx = GlobleFun.RandomNumBoth(0.8, 1.5);//随机x 轴速度
        // console.log("随机x 轴速度==="+this.speedx);
        if (this.data)//如果是分裂的球 
        {
            //分裂条件：1<细胞等级大小<5;
            //分裂细胞大小：比原细胞小一等级；
            //分裂细胞血量：为原细胞的1/2（小数点四舍五入）；
            let dir = Math.random();
            dir > 0.5 ? this.speedx = this.speedx : this.speedx = -this.speedx;  //分裂的球 随机初始x轴 方向
            this.setballLevel(this.data.ballLevel - 1);//比原细胞小一等级；
            // if(this.data.ballSize <= 15){
            //      this.ballSize=Math.floor(this.data.ballSize*0.8); 
            // }else {
            //     this.ballSize=Math.floor(this.data.ballSize*0.5); 
            // }   
            this.score = Math.round(this.data.scoreCount * 0.5);//为原细胞的1/2（小数点四舍五入）；

        } else {
            //  this.ballSize = 10+Math.floor(Math.random()*60);
            //  this.score = 5+Math.floor(Math.random()*20)+Math.floor(this.ballSize*0.8);
            this.setAttributive();
        }
        //  this.maxSpeedY = this.maxSpeedY-Math.floor(this.ballSize*0.1);
        // this.speedx = this.speedx - Math.floor(this.ballSize*0.008);
        if (this.ballType == 5) {
            this.setballLevel(this.ballType);
        }

        this.setSpeed();

        this.scoreCount = this.score;
        this.addBall(); //设置球的 图片资源
        this.addScoreText(); //在球上加载text文本

    }


    private onLoop(): void {
        if (GlobleFun.isOver) {
            this.event("again", this); //游戏结束 发送事件
            return
        } //游戏结束

        if (this.score < 1 && this.isAlive) { //球的分数为0 时 并活着
            // this.scoreEvent();
            this.isAlive = false;
            this.splitCount += 1; //分裂次数
            //  console.log("//      if( this.score < 1 && this.isAlive){ //球的分数为0 时 并活着");
            if (this.ballType == 5 && (this.specialBallRedCount < 35 && this.specialBallBlueCount < 18)) {
                this.event("countdown", this); //发送 3秒 倒计时 事件
                //  console.log("//发送 3秒 倒计时 事件");
                // this.event("dropItem",this);
                return
            }
            this.event(Ball.SMASH, this); //发送 球的分裂事件
            return
        }
        if (!this.isAlive || this.score <= 0) { return }

        //y 轴上下跳动--------------------------------------------
        if (this.y >= this.maxY) { //落到地面时

            if (Math.abs(this.speedy) < this.maxSpeedY * 0.5) {
                this.speedy = -this.speedy - 5;
            } else {
                this.speedy = - this.speedy;
            }
            // this.speedy = -this.speedy; //反转 速度
            //  this.effect(); //球 落到地面时
        }
        if (this.y <= 20)//球 太高时 
        {
            this.speedy += 1;
        }
        if (Math.abs(this.speedy) >= this.maxSpeedY) { this.speedy > 0 ? this.speedy = this.maxSpeedY : this.speedy = -this.maxSpeedY; }//限制最大速度
        this.y += this.speedy;
        this.speedy += this.downSpeed;

        //x 轴 左右移动--------------------------------
        if (this.x >= Laya.stage.width - this.ballSize / 2) { //碰到右边墙壁
            this.speedx = - this.speedx;
        }
        if (this.x - this.ballSize / 2 <= 0) {//碰到左边墙壁
            this.speedx = - this.speedx;
        }
        this.x += this.speedx;

    }
    private scoreEvent(): void {
        if (!this.isAlive) { return }
        this.isAlive = false;
        this.splitCount += 1; //分裂次数
        if (this.ballType == 5 && (this.specialBallRedCount < 35 || this.specialBallBlueCount < 18)) {

            this.event("countdown", this); //发送 3秒 倒计时 事件
            // this.event("dropItem",this);
            return
        }
        this.event(Ball.SMASH, this); //发送 球的分裂事件
        return
    }

    private addBall(type?: number): void {
        var t = this.ballTexture1;
        switch (this.ballType) {
            case 1:
                t = this.ballTexture1;
                break;
            case 2:
                t = this.ballTexture2;
                break;
            case 3:
                t = this.ballTexture3;
                break;
            case 4:
                t = this.ballTexture4;
                break;
            case 5:
                t = this.ballTexture5;
                break;
            default:
                t = this.ballTexture1;
        }
        this.pivot(this.ballSize / 2, this.ballSize / 2);  //没效果
        this.loadImage(t, 0, 0, this.ballSize, this.ballSize);


        // var sn = Math.floor(this.ballSize/this.width);
        //    this.scaleX = sn;
        //    this.scaleY = sn;

        //this.graphics.drawCircle(0,0,this.ballSize,"fff0ff");
        this.size(this.ballSize, this.ballSize);
    }
    private addScoreText(): void {
        var fontSize = 0;
        switch (this.ballLevel) {
            case 1:
                fontSize = 25;
                break;
            case 2:
                fontSize = 32;
                break;
            case 3:
                fontSize = 42;
                break;
            case 4:
                fontSize = 60;
                break;
            case 5:
                fontSize = 80;
                break;
        }
        this.text = new Laya.Text();
        this.text.text = this.conversionScore(this.score);
        this.text.color = "#f5e8ee";
        this.text.bold = true;
        this.text.fontSize = fontSize;
        this.text.pivot(this.text.width / 2, this.text.height / 2);
        this.text.align = "center";
        this.text.valign = "middle";
        this.addChild(this.text);
        this.text.pos(this.ballSize / 2, this.ballSize / 2);
    }
    /**
     * 被子弹击中，根据子弹的威力更新球的分数
     */
    public updataScore(power: number): void {
        if (this.score < 1) {
            if (this.ballType == 5) {
                this.score = 0;
                // this.isAlive = false;
                this.text.text = this.conversionScore(this.score);
                this.text.pivot(this.text.width / 2, this.text.height / 2);
                this.text.align = "center";
                this.text.valign = "middle";
                this.event("dropItem", this); //类型5的球 当分数为0时 被子弹击中掉落 红币35个 和蓝币20个
                this.shakeAction();
                if (!(this.specialBallRedCount < 35 || this.specialBallBlueCount < 18)) {
                    this.event(Ball.SMASH, this); //发送 球的分裂事件
                }
            }
            return;
        }
        if (this.ballType != 5) {
            this.y -= 0.5; //被击中向上移动一点
        }
        //this.speedy -= 0.1;
        //this.score -=power;
        if (this.score <= power) {
            GlobleFun.Score = Math.floor(GlobleFun.Score + this.score);
            this.score = 0;

        } else {
            this.score = Math.round(this.score - power);
            GlobleFun.Score = Math.floor(GlobleFun.Score + power);
        }

        //if(this.score <1){return}
        //  this.text.changeText(this.conversionScore(this.score));
        this.text.text = this.conversionScore(this.score);
        this.text.pivot(this.text.width / 2, this.text.height / 2);
        this.text.align = "center";
        this.text.valign = "middle";
        if (this.score <= 0) {
            if (this.ballType != 5) {
                // this.scoreEvent();
                this.isAlive = false;
                this.splitCount += 1; //分裂次数
                this.event(Ball.SMASH, this); //发送 球的分裂事件
            }
        }

    }

    private shakeAction(): void  //特殊球的抖动动作
    {
        //this.openShakeAction = true;
        this.x += this.shakeNum * 2;
        this.y -= this.shakeNum * 2;
        this.shakeNum = - this.shakeNum;
    }
    public removeFromParent(): void {
        this.destroy();
        if (this.ballType == 5 || GlobleFun.isOver) { //如果 是特殊球 没有 爆炸特效
            return
        }

        //播放  分裂 动画
        var t = "type" + this.ballType;
        var p: Laya.Animation = new Laya.Animation();
        Laya.stage.addChild(p)
        //  p.zOrder = 1001;
        p.on(Laya.Event.COMPLETE, this, () => {
            p.destroy();
        });
        p.pos(this.x - 260, this.y - 259);
        p.interval = 35;
        p.play(0, false, t, true);
    }

    /**
    * 根据球的类型设置球的大小等级
    */
    public setAttributive(): void {

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

        this.setScore();//设置分数

    }
    /**
     * 自定义设置 球的 大小等级 并根据等级设置球的大小
     */
    public setballLevel(num: number): void {
        switch (num) {
            case 1:
                this.ballLevel = 1;
                this.ballSize = 80;
                break;
            case 2:
                this.ballLevel = 2;
                this.ballSize = 100;
                break;
            case 3:
                this.ballLevel = 3;
                this.ballSize = 140;
                break;
            case 4:
                this.ballLevel = 4;
                this.ballSize = 180;
                break;
            case 5:
                this.ballLevel = 5;
                this.ballSize = 350;
                break;
            default:
                this.ballLevel = 1;
                this.ballSize = 80;
                break;
        }
    }
    /**
     * 根据特定的公式 计算球的血量 
     */
    private setScore(): void {
        //刷新血量：当前攻速值*当前威力*0.4*m<=x<=当前攻速*当前威力值*1.2*m（m随着分数提升，具体待定，暂使用1）
        //类型5的球的血量：当前攻速数值*当前威力数值*10*(1+0.1n)<=x<=当前攻速数值*当前威力数值*12*(1+0.1n)（n为关卡序号），
        //刷新血量：当前攻速值*当前威力*0.4*(1+0.1m)<=x<=当前攻速*当前威力值*1.2*(1+0.1m)（m为当前关卡序号）
        var m = 1 + GlobleFun.checkpoint * 0.1;
        if (this.ballType == 5) {

            var min = GlobleFun.bulletInterval * GlobleFun.bulletPower * 10 * m;
            var max = GlobleFun.bulletInterval * GlobleFun.bulletPower * 12 * m;
        } else {
            var min = GlobleFun.bulletInterval * GlobleFun.bulletPower * 0.4 * m;
            var max = GlobleFun.bulletInterval * GlobleFun.bulletPower * 1.2 * m;
        }
        this.score = Math.round(GlobleFun.RandomNumBoth(min, max));
    }
    /**
     * 把球的分数进行转换 大于1000的为1K 10000为1M
     */
    private conversionScore(score: number): string {
        let str;
        let symbol: string = "";
        if (score >= 1000 && score < 10000) {
            str = score / 1000;
            str = str.toFixed(2);
            symbol = "k";

        } else if (score >= 10000 && score < 100000) {
            str = score / 10000;
            str = str.toFixed(2);
            symbol = "M";
        } else if (score >= 100000 && score < 1000000) {
            str = score / 100000;
            str = str.toFixed(2);
            symbol = "B";
        } else {
            str = score;
        }

        //let ss:string = str.toString();
        return (str.toString() + symbol)
    }
    /**
    * 根据球的类型设置 球的速度
    */
    private setSpeed(): void {
        switch (this.ballType) {
            case 1://大小 超大  速度 慢  高度 高
                this.maxSpeedY = 13;
                this.downSpeed = 0.03;
                this.data ? this.speedy = -4 : this.speedy = 2; //如果是分裂出来的球 向上做抛物线
                break;
            case 2://大小 小  速度 快  高度 低
                this.maxSpeedY = 10;
                this.downSpeed = 0.06;
                this.speedx = 1.2;
                this.data ? this.speedy = -4 : this.speedy = 2;//如果是分裂出来的球 向上做抛物线
                break;
            case 3:///大小 大  速度 慢  高度 中
                this.maxSpeedY = 10;
                this.downSpeed = 0.06;
                //  this.speedx = 0.5;
                this.data ? this.speedy = -4 : this.speedy = 2;//如果是分裂出来的球 向上做抛物线
                break;
            case 4: //大小 中  速度 中  高度 中
                this.maxSpeedY = 13;
                this.downSpeed = 0.06;
                this.data ? this.speedy = -4 : this.speedy = 2;//如果是分裂出来的球 向上做抛物线
                break;
            case 5: //大小 中  速度 中  高度 中
                this.maxSpeedY = 10;
                this.downSpeed = 0.03;
                this.data ? this.speedy = -4 : this.speedy = 2; //如果是分裂出来的球 向上做抛物线
                break;
        }
    }

}
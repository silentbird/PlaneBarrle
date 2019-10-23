/**
 * 玩家
 */
class Player extends Laya.Sprite {
    private player: any;
    private isDown: boolean = false;
    private timeCount = 0;
    //  private main:any;
    private jgUrl: string = "prop/main_weapon_laser_2.png";
    private shieldUrl: string = "prop/main_weapon_shield.png"
    private launchPic: any;
    public static DIE: string = "die";

    private gameState: boolean = true;

    private moveX: number = 0;

    public shotgunState: number = 0; //是否处于散弹状态 1为是 0为否
    public launcherState: number = 0//是否处于发射器状态 1为是 0为否
    public InvincibleState: number = 0;//是否处于无敌保护状态 1为是 0为否
    public laserState: number = 0;//是否处于发射激光状态 

    private delay: number = Math.floor(1000 / GlobleFun.bulletNum);
    private bulletNumList: number = 0;
    private angleArr: any[] = [0, 8, -8, 16, -16]; //子弹弹道的角度
    private shotgunAngleArr: any[] = [-5, -3, -1, 1, 3, 5]; //散弹的发射角度
    private nn: number = 0;
    private dd: number = 0;

    private shield: Laya.Image;
    private laserPic: Laya.Image

    constructor(player: any, parent: any) {
        super();
        this.player = player;
        this.launchPic = this.player.getChildAt(0);

        this.player.pivot(this.player.width / 2, this.player.height / 2);
        // this.main = parent;
        GlobleFun.maxY = this.player.y + this.player.height / 2;
        GlobleFun.player = this;
        //--------------护盾
        this.shield = new Laya.Image();
        this.shield.loadImage(this.shieldUrl);
        this.shield.visible = false;
        this.player.addChild(this.shield);
        this.shield.pos(71, 66);
        this.shield.anchorX = 0.5;
        this.shield.anchorY = 0.5;
        // this.shield.pivot(this.shield.width/2,this.shield.height/2);
        this.shield.alpha = 0.5;
        this.shield.zOrder = 10000;
        this.handleTouchEvent();
        this.bulletBallistic();
        //----------------激光
        this.laserPic = new Laya.Image();
        this.laserPic.loadImage(this.jgUrl);
        this.player.addChild(this.laserPic);
        this.laserPic.pos(71, 26);
        this.laserPic.anchorX = 0.5;
        this.laserPic.anchorY = 1;
        // this.laserPic .pivotY=this.laserPic .height/2;
        // this.laserPic.rotation = -90;
        //  this.laserPic.scaleX = 1;
        this.laserPic.visible = false;

        this.player.on("again", this, this.open);
        Laya.timer.loop(1, this, this.checkHItLoop);//每毫秒 检查碰撞


    }
    /**
     * 玩家移动事件
     */
    private handleTouchEvent(): void {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {
            if (e.target.name === "功能按钮") {
                return
            }
            // console.log(e.target.name+"00000000000000000");
            this.isDown = true;
            this.moveX = Laya.stage.mouseX;
            Laya.Tween.to(this.player, { x: this.moveX }, 100)
        });
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, (event) => {
            if (this.isDown) {
                var xx: number = this.moveX - Laya.stage.mouseX;

                this.player.x -= xx;

                this.moveX = Laya.stage.mouseX;
                //  Laya.Tween.to(this.player,{x:Laya.stage.mouseX},500,Laya.Ease.expoOut);
                // this.player.x = Laya.stage.mouseX;

            }
        });
        Laya.stage.on(Laya.Event.MOUSE_UP, this, (event) => {
            if (this.isDown) {

                this.isDown = false;
            }
        })

        this.player.on("off", this, this.offState);//监听 玩家死亡 取消 移动监听

    }
    private offState(): void {
        this.shotgunState = 0; //是否处于散弹状态 1为是 0为否
        this.launcherState = 0//是否处于发射器状态 1为是 0为否
        this.InvincibleState = 0;//是否处于无敌保护状态 1为是 0为否
        this.laserState = 0;//是否处于发射激光状态 
        console.log("off");
        Laya.stage.offAll();

    }
    public open(): void {
        console.log("open");
        this.handleTouchEvent();
        this.nn = 0;
        this.shotgunState = 0;
        this.launcherState = 0;
        this.InvincibleState = 0;
        this.laserState = 0;
    }
    private checkHItLoop(): void {
        if (GlobleFun.isOver) {
            this.shotgunState = 0;
            this.laserState = 0;
            this.launcherState = 0;
            this.InvincibleState = 0;
            return
        }
        this.checkHit();//检测碰撞和球
        this.checkHitByProp();//检测碰撞和金币
        this.checkHitByLaser();
        this.checkHitByShield();
        //  if(this.laserState==1 || this.launcherState==1){return}
        this.bulletNumList = Math.floor(GlobleFun.bulletInterval / GlobleFun.bulletNum);//弹道
        this.nn = GlobleFun.bulletInterval % GlobleFun.bulletNum;//多余几发子弹
        this.dd = 1000 - this.nn * 100;
        // this.dd = Math.floor(1000/this.nn);//多余的子弹 多少毫秒发射一发
    }
    /**
     * 计算有几条子弹弹道 并发射子弹
     */
    private bulletBallistic(): void {
        //    this.bulletNumList = Math.floor(GlobleFun.bulletInterval/GlobleFun.bulletNum);//弹道
        //    this.nn = GlobleFun.bulletInterval%GlobleFun.bulletNum; //多余的 子弹
        var angle1 = [0];
        var angle2 = [5, -5];
        var angle3 = [10, 0, -10];
        var angle4 = [15, 5, -5, -15];
        var angle5 = [25, 10, 0, -10, -25];
        var listNUm;
        Laya.timer.once(this.delay, this, this.bulletBallistic);

        if (GlobleFun.isOver) { return }
        this.timeCount += this.delay;
        // console.log("nn===="+this.nn+"  shotgunState==="+this.shotgunState+"   timeCount=="+this.timeCount+"   dd==="+this.dd);
        if (this.nn != 0 && this.shotgunState == 0 && this.timeCount % this.dd == 0) {
            if (this.dd == 100 && this.timeCount % 900 == 0) {
                listNUm = this.bulletNumList;
            } else {
                listNUm = this.bulletNumList + 1;
            }

            // console.log("********")
        } else {
            listNUm = this.bulletNumList;
        }
        if (GlobleFun.isOver) { return }

        if (this.shotgunState == 1) {//如果状态时散弹 这发射散弹 
            this.shotgun()
            return
        }

        for (let i = 0; i < listNUm; i++) {

            if (listNUm == 1) {
                this.fireBullet(angle1[i]);
            } else if (listNUm == 2) {
                this.fireBullet(angle2[i]);
            } else if (listNUm == 3) {
                this.fireBullet(angle3[i]);
            } else if (listNUm == 4) {
                this.fireBullet(angle4[i]);
            } else if (listNUm == 5) {
                this.fireBullet(angle5[i]);
            } else {
                this.fireBullet(angle5[i]);
            }

        }

    }

    /**
     * 发射子弹
     */
    private fireBullet(angle?: number): void {
        if (this.laserState == 1 || this.shotgunState == 1) { return }
        this.addBullet(angle);
    }

    /**
     * 散弹------------------------------------------
     */
    private shotgun(): void {
        // let angle:number = 2;
        for (let i = 0; i < 6; i++) {
            // let an = -5+i*angle;
            this.addBullet(this.shotgunAngleArr[i]);
        }
    }
    //发射器循环
    public loopLauncher(): void {
        if (GlobleFun.isOver) { return }
        this.launchPic.visible = true;
        var delay = GlobleFun.bulletInterval <= GlobleFun.bulletNum ? Math.floor(1000 / GlobleFun.bulletInterval) : this.delay;
        Laya.timer.loop(delay, this, this.launcher);
    }
    /**
     * 发射器--------------------------------------
     */
    private launcher(): void {
        if (GlobleFun.isOver) { return }
        if (this.launcherState == 0 || GlobleFun.isOver) {
            this.launchPic.visible = false;
            Laya.timer.clear(this, this.launcher);
            return
        }
        let pos: any[] = [100, -100];
        for (let i = 0; i < 2; i++) {
            this.addBullet(null, pos[i]);
        }

    }

    /**
    * 添加子弹
    */
    private addBullet(angle?: number, px?: number): void {
        if (GlobleFun.isOver) { return }
        let bullet = Laya.Pool.getItemByClass("bullet", Bullet);
        bullet.init();
        //console.log("++++++++++++++++"+angle);
        // if(this.shotgunState==1){
        //     bullet.setAngleshotgun(angle);  //设置散弹的射击角度
        // }else{
        //      bullet.setAngle(angle)  //普通模式的 子弹角度
        // }

        if (angle) {
            if (this.shotgunState == 1) {
                // console.log("9999999999999999999");
                bullet.setAngleshotgun(angle);  //设置散弹的射击角度
            } else {
                bullet.setAngle(angle)  //普通模式的 子弹角度

            }
        }
        bullet.visible = true;
        if (px) { //px是 发射器的 左右 两个发射器的偏移x量
            if (GlobleFun.isOver) { return }
            // console.log("this.player.x +px ======="+this.player.x +px );
            bullet.pos(this.player.x + px, this.player.y);
        } else {
            bullet.pos(this.player.x, this.player.y - this.player.height / 2 - 25);
        }
        // bullet.pos(this.player.x-5 , this.player.y- 15);
        //  bullet.pos(100 , this.player.y- 15);
        bullet.zOrder = 10000;

        let p: MapBall = GlobleFun.map;
        p.addChild(bullet);

    }

    /**
    * 检查碰撞 玩家和球
    */
    private checkHit(): void {
        if (this.InvincibleState == 1) //如果时无敌保护状态 着不检查和球的碰撞
        {
            this.shield.visible = true;
            return
        } else {
            this.shield.visible = false;
        }

        var map = MapBall.getMapBall();
        let list = map.ballArr;
        for (let i = 0; i < list.length; i++) {
            let ball = list[i];
            let l = Math.abs(Math.sqrt((this.player.x - ball.x) * (this.player.x - ball.x) + (this.player.y - ball.y) * (this.player.y - ball.y)));
            if (l < ball.height / 2 + this.player.height / 2 - 15 || l < ball.width / 2 + this.player.width / 2 - 15) {
                if (ball.ballType == 5 && ball.score == 0) {
                    return;
                }
                this.player.event(Player.DIE, this);
                //  console.log("die");

                break;
            }
        }
    }
    /**
     * 检测碰撞 玩家和 道具 
     */
    private checkHitByProp(): void {

        let list = MapBall.mapball.propArr;
        for (let i = 0; i < list.length; i++) {
            let prop = list[i];
            let l = Math.abs(Math.sqrt((this.player.x - prop.x) * (this.player.x - prop.x) + (this.player.y - prop.y) * (this.player.y - prop.y)));
            if (l < prop.width / 2 + this.player.width / 2 || l < prop.height / 2 + this.player.height / 2) {
                prop.event("hitProp", prop);
                //  this.setLoop(); 
                break;

            }

        }
    }
    /**
    * 检查碰撞 护盾和球 
    */
    private checkHitByShield(): void {
        // this.timer.once(1,this,this.checkHit);
        if (this.InvincibleState == 0) {
            return
        }
        var map = MapBall.getMapBall();
        let list = map.ballArr;
        for (let i = 0; i < list.length; i++) {
            let ball = list[i];
            let l = Math.abs(Math.sqrt((this.player.x - ball.x) * (this.player.x - ball.x) + (this.player.y - ball.y) * (this.player.y - ball.y)));
            if (l < ball.height / 2 + this.shield.height / 2 + 10 || l < ball.width / 2 + this.shield.width / 2 + 10) {
                if (ball.ballType == 5) { return }  //护盾 不能秒杀 特殊球
                ball.updataScore(ball.score);
                console.log("shiled++++++++++++++++++++++++++++++++++++");

                break;
            }
        }
    }

    /**
    * 检查碰撞 激光和球 
    */
    private checkHitByLaser(): void {
        // this.timer.once(1,this,this.checkHit);
        if (this.laserState == 0 || GlobleFun.isOver) {
            this.laserPic.visible = false;
            return
        }
        this.laserPic.visible = true;
        var map = GlobleFun.map;
        let list = map.ballArr;
        let hitArr: any[] = [];
        //  let hitBall;
        for (let i = 0; i < list.length; i++) {
            let ball = list[i];
            let lx = Math.abs(ball.x - this.player.x);
            if (lx < this.player.width / 2 + ball.width / 2) {
                hitArr.push(ball);

            }

        }
        var index: number = 0;
        for (let i = 0; i < hitArr.length; i++) {

            if (hitArr[i].y > hitArr[index]) {
                console.log("laser++++++++++++++++++++++++++++++++++++");
                index = i;
                // hitBall = hitArr[index];
            }
        }
        if (!hitArr[index]) {
            this.laserPic.scaleY = 2;
            return
        }
        let power = GlobleFun.bulletPower * 6;
        hitArr[index].updataScore(power);

        let ly = this.player.y - hitArr[index].y - hitArr[index].ballSize / 2;
        let scalNum = ly / this.laserPic.height;
        this.laserPic.scaleY = scalNum;
        console.log("laser++++++++++++++++++++++++++++++++++++");
    }
}
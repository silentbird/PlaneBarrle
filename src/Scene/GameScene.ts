/**
 * 
 */
class GameScene extends ui.sceneUI {
    public static instance: GameScene;
    public ballArr: any[] = [];
    private text: Laya.Text;
    private over: GameOver;

    private gameState: boolean = true;
    private map: MapBall;
    public isSpecialBall: boolean = false;
    private bggggg: Background;
    // public checkpoint:number = 0; //在gameOver onAgain 里赋值了
    constructor() {
        super();
        this.init();
        GameScene.instance = this;
        GlobleFun.GameScene = this;
        GlobleFun.bulletPower = 1;
        GlobleFun.bulletInterval = GlobleFun.bulletInterval;
        //console.log(GlobleFun.formatScore(1425000));
        //  GlobleFun.Main = this;
        // console.log(" GlobleFun.bulletInterval ======="+GlobleFun.bulletInterval);
        Laya.timer.frameLoop(1, this, this.onLoop);

    }
    private init(): void {
        //加载背景
        this.bggggg = new Background();
        this.bggggg.pos(0, 0);
        // this.bggggg.centerX=0;
        this.bggggg.layoutEnabled = true;
        this.bggggg.zOrder = -100;
        this.bggggg.left = 0;
        this.bggggg.right = 0;
        this.bggggg.top = 0;
        this.bggggg.bottom = 0;
        this.addChild(this.bggggg);

        //设置玩家
        var p = new Player(this.player, this); //玩家

        this.player.once(Player.DIE, this, this.onOver);

        //加载 球的管理类
        this.map = new MapBall();
        this.addChild(this.map);
        this.ballArr = this.map.ballArr;

        //加载结束界面
        this.over = new GameOver();
        this.over.zOrder = 10000;
        Laya.stage.addChild(this.over);
        // this.addChild(this.over);
        this.over.visible = false;

        this.invincible.name = "功能按钮";
        this.invincible.size(79, 87);
        this.invincible.on(Laya.Event.CLICK, this, (e: Laya.Event) => { //无敌保护按钮
            e.stopPropagation();
            //console.log(e.target.name);
            if (GlobleFun.invincibleNum == 0) { return }
            if (GlobleFun.specialBall) { return } //场景中有特殊球的时候 不能使用
            this.invincible.mouseEnabled = false;
            GlobleFun.player.InvincibleState = 1;
            GlobleFun.time(10, 3);
            GlobleFun.invincibleNum -= 1;//使用次数 -1
            console.log("无敌保护按钮");
            this.invincibleText.visible = false;
            this.updataTimeText("invincible");
            Laya.timer.once(60000, this, () => {
                console.log("-----无敌保护可以使用啦-----");
                this.invincibleText.visible = true;
                this.invincible.mouseEnabled = true;
                this.invincibleTime.text = "60s";
                this.invincibleTime.visible = false;
            });
        });
        this.explosion.name = "功能按钮";
        this.explosion.size(68, 94);
        this.explosion.on(Laya.Event.CLICK, this, (e: Laya.Event) => { //清屏按钮
            e.stopPropagation();
            if (GlobleFun.explosionNum == 0) { return }
            if (GlobleFun.specialBall) { return } //场景中有特殊球的时候 不能使用
            this.explosion.mouseEnabled = false;
            GlobleFun.map.explosionEffect();
            GlobleFun.explosionNum -= 1; //使用次数 -1
            console.log("清屏清屏清屏清屏清屏清屏清屏清屏清屏清屏清屏清屏清屏清屏清屏清屏");
            this.explosionText.visible = false;
            this.updataTimeText("explosion");
            Laya.timer.once(60000, this, () => {
                console.log("-----清屏爆炸可以使用啦-----");
                this.explosion.mouseEnabled = true;
                this.explosionTime.text = "60s";
                this.explosionText.visible = true;
                this.explosionTime.visible = false;
            });
        });

        this.updataProgress();
        //  this.flashingEffect();
    }
    private updataTimeText(button: string): void //更新 清屏爆炸 和无敌保护的CD文本
    {

        var tt = 60;
        if (button == "explosion") {
            this.explosionTime.visible = true;
            Laya.timer.loop(1000, this, () => {
                if (GlobleFun.isOver) {
                    this.explosionTime.visible = false;
                    this.explosion.mouseEnabled = true;
                    return
                }
                if (this.explosion.mouseEnabled == true) {
                    tt = 60;
                    return
                }
                tt -= 1;
                this.explosionTime.text = tt.toString() + "s";
            });
        } else if (button == "invincible") {
            this.invincibleTime.visible = true;
            Laya.timer.loop(1000, this, () => {
                if (GlobleFun.isOver) {
                    this.invincibleTime.visible = false;
                    this.invincible.mouseEnabled = true;
                    return
                }
                if (this.invincible.mouseEnabled == true) {
                    tt = 60;
                    return
                }
                tt -= 1;
                this.invincibleTime.text = tt.toString() + "s";
            });
        }

    }
    /**
     * 实时更新
     */
    private onLoop(): void {
        if (GlobleFun.isOver && this.gameState) {
            this.gameState = false;
            this.againInit();
        }

        if (!GlobleFun.isOver) {
            this.gameState = true;
        }
        if (!GlobleFun.specialBall) {  //没有特殊 球 时
            this.effectPicture_1.visible = false;
            this.effectPicture_2.visible = false;
            this.invincible.visible = true;
            this.explosion.visible = true;
        }
        var bestScore = Laya.LocalStorage.getItem("bestScore");
        this.currentScore.text = this.conversionScore(GlobleFun.Score); //更新当前分数
        // this.MaxSocre.text = bestScore; //更新最高分
        this.bulletPower.text = (GlobleFun.bulletPower * 100).toFixed(0) + "%";//更新玩家的子弹威力文本
        this.bulletSpeed.text = (GlobleFun.bulletInterval).toString();//更新玩家的子弹速度 文本
        this.explosionNumText.text = "x" + GlobleFun.explosionNum.toString();
        this.invincibleNumText.text = "x" + GlobleFun.invincibleNum.toString();

        this.updataCheckpoint();
        // this.updataProgress();
    }
    public static getMain(): GameScene {
        return GameScene.instance;
    }
    /**
     * 玩家死亡 游戏结束
     */
    private onOver(): void {
        Laya.timer.clear(this, this.flashingEffect);
        this.explosion.mouseEnabled = true;
        this.explosionTime.text = "60s";
        this.explosionText.visible = true;
        this.explosionTime.visible = false;
        this.invincibleText.visible = true;
        this.invincible.mouseEnabled = true;
        this.invincibleTime.text = "60s";
        this.invincibleTime.visible = false;

        this.propTimeIcon.visible = false;

        this.isSpecialBall = false;
        this.player.event("off", this.player);//取消玩家的移动监听
        this.setItem();
        GlobleFun.isOver = true;
        this.over.visible = true;

    }
    /**
     * 检查分数 设置最高分 和最高解锁关卡
     */
    private setItem(): void {

        // if(GlobleFun.checkpoint > GlobleFun.Maxcheckpoint){
        //     GlobleFun.Maxcheckpoint = GlobleFun.checkpoint;
        // }
        console.log("更新最高分");
        var score = GlobleFun.Score;
        var bestScore = Laya.LocalStorage.getItem("bestScore");

        if (bestScore && parseInt(bestScore) > score) {
            score = Number(bestScore);
            //  Laya.LocalStorage.setItem("bestScore",score.toString()); 
        }

        Laya.LocalStorage.setItem("bestScore", score.toString());

    }
    /**
     * 玩家死亡 初始化玩家位置和监听
     */
    public againInit(): void {
        console.log("main");
        //GlobleFun.Score = 0;//初始分数
        // this.player.pos(200,630);//初始玩家位置
        //this.player.x = Laya.Browser.clientWidth/2;
        this.player.centerX = 0;
        //this.player.y = Laya.Browser.clientHeight*0.8;
        // console.log(" this.player.x = "+Laya.Browser.clientWidth/2+"      this.player.y ="+ Laya.Browser.clientHeight*0.8)
        //  console.log(this.player.x+"    "+this.player.y);
        this.player.once(Player.DIE, this, this.onOver);//重新设置玩家的死亡监听
    }
    /**
     * 根据得分更新关卡
     */
    private updataCheckpoint(): void {
        //  var arr:number[]=[3000,20000,80000,200000,500000,1000000]; //初始关卡序列为 0关 分数达到要求 这进入下一关
        if (GlobleFun.Score >= GlobleFun.checkpointScoreArr[GlobleFun.checkpoint]) {
            GlobleFun.checkpoint++;
        }
        this.nextCheckpointScore.text = GlobleFun.checkpointScoreArr[GlobleFun.checkpoint].toString();//更新下一关卡需要的分数文本 进度条上的文本
        this.indexCheckpointScore.text = GlobleFun.Score.toString();//更新 当前分数 进度条上的文本
        //   this.checkpointText.text = "第 "+GlobleFun.checkpoint.toString()+" 关"; //更新关卡文本
        //if(this.checkpoint >=5 && GlobleFun.checkpoint > this.checkpoint){this.checkpoint=0};

    }
    /**
     * 更新关卡进度条
     */
    private updataProgress(): void {
        Laya.timer.once(10, this, this.updataProgress);
        //var arr:number[]=[3000,20000,80000,200000,500000,1000000]; //初始关卡序列为 0关 分数达到要求 这进入下一关
        if (GlobleFun.specialBall && !this.isSpecialBall) {    ///刷新 特殊球
            GlobleFun.checkpoint % 2 == 0 ? this.effectPicture_1.visible = true : this.effectPicture_2.visible = true; //显示特殊边框
            this.flashingEffect();
            //this.effectPicture_1.visible = true
            console.log(this.effectPicture_1.visible + "+++++++++++");
            this.effectPicture_1.zOrder = 1500;
            this.effectPicture_2.zOrder = 1500;

            this.isSpecialBall = true;

            this.invincible.visible = false; //出现 特殊球 时 隐藏 功能按钮
            this.explosion.visible = false;

            Laya.timer.once(2000, this, () => {  //设置 出现特效边框后 几秒出 特殊球
                Laya.timer.clear(this, this.flashingEffect);
                GlobleFun.map.addBall();
            });
            return;
        }

        var n = GlobleFun.checkpointScoreArr[GlobleFun.checkpoint - 1] || 0;
        var m = GlobleFun.checkpointScoreArr[GlobleFun.checkpoint];
        var s = GlobleFun.Score - n;
        var sss = m - n;
        var v = s / sss;
        if (v >= 0.95 && !GlobleFun.haveSpecialBall) {
            console.log("   * 更新关卡进度条");
            GlobleFun.specialBall = true;

        }
        this.progress.value = v;



    }
    /**
     * 转换传入的参数 1000=1K 10000=1M
     * @param score 
     */
    private conversionScore(score: number): string {
        let sym: string = ",";
        let str: string;
        let nnn: number;
        let n: number;
        let nnnn: number;
        let nnnnn: number;
        if (score / 1000 >= 1 && score < 1000000) //一千到一千万  1，000
        {
            let m: string;
            n = Math.floor(score / 1000);
            nnn = score - n * 1000;

            if (nnn < 10) {
                m = "00";
            } else if (nnn < 100) {
                m = "0";
            } else {
                m = "";
            }
            str = n.toString() + sym + m + nnn.toString();//1，000，000           999，000，000
        } else if (score / 1000000 >= 1 && score < 1000000000) {
            let m: string;
            let mm: string;
            n = Math.floor(score / 1000000);//最大单位的数
            nnn = score - n * 1000000;  //得到 000，000 范围的数
            nnnn = Math.floor(nnn / 1000); //得到 999，000，
            nnnnn = nnn - nnnn * 1000; //得到 999
            if (nnnnn < 10) {
                m = "00";
            } else if (nnnnn < 100) {
                m = "0";
            } else {
                m = "";
            }
            if (nnnn < 10) {
                mm = "00";
            } else if (nnnn < 100) {
                mm = "0";
            } else {
                mm = "";
            }
            str = n.toString() + sym + mm + nnnn.toString() + sym + m + nnnnn.toString()
        } else if (score >= 1000000000) {
            str = "你已超越地球人！"
        }
        if (score < 1000) {
            str = score.toString();
        }

        //let ss:string = str.toString();
        return str
    }
    /**
     * 特殊 球 出现时  特效边框的闪烁
     */
    private flashingEffect(): void {
        Laya.timer.once(900, this, this.flashingEffect);
        Laya.Tween.to(this.effectPicture_1, { alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
            Laya.Tween.to(this.effectPicture_1, { alpha: 1 }, 400, null);
        }))
        Laya.Tween.to(this.effectPicture_2, { alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
            Laya.Tween.to(this.effectPicture_2, { alpha: 1 }, 400, null);
        }))
    }

    private isSetTimeText: boolean = false; //是否正在 倒计时中
    //道具 使用倒计时 
    public updataTime(num: number, type: number): void {
        var res: string[] = ["prop/main_icon_bullet.png", "prop/main_icon_launcher.png", "prop/shield_icon.png", "prop/main_icon_laser.png",];
        this.propTimeIcon.visible = true;
        this.propTimeIcon.skin = res[type - 1]
        this.propTime.text = num.toString();
        if (!this.isSetTimeText) {
            this.setTimeText();
        }

    }
    private setTimeText(): void {
        Laya.timer.once(1000, this, () => {
            this.isSetTimeText = true;
            this.propTime.text = (parseInt(this.propTime.text) - 1).toString();
            if (parseInt(this.propTime.text) == 0) {
                this.propTimeIcon.visible = false;
                this.isSetTimeText = false;
                return
            }
            this.setTimeText();
        });
    }


}
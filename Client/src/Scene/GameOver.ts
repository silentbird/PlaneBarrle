/**
 * 游戏结束界面
 */
class GameOver extends ui.GameOverUI {

    private rankview: RankScene;
    constructor() {
        super();

        this.init();
        this.timerLoop(1, this, this.onLoop);
    }
    private init(): void {
        var bestScore = Laya.LocalStorage.getItem("bestScore");
        this.bestScoreText.text = bestScore;//更新最高分数
        this.scoreText.text = GlobleFun.Score.toString();//更新分数


        this.UiClickScale(this.Back);
        this.UiClickScale(this.showRank);
        this.Back.on(Laya.Event.CLICK, this, this.onBack); //监听返回按钮
        this.showRank.on(Laya.Event.CLICK, this, this.onShowRank); //显示所有的排行 显示排行榜

    }
    private onLoop(): void {
        var bestScore = Laya.LocalStorage.getItem("bestScore");
        this.bestScoreText.text = bestScore;//更新最高分数
        this.scoreText.text = GlobleFun.Score.toString();//更新分数
        GlobleFun.startScene.maxScoreText.text = bestScore; //更新 开始界面的最高得分

    }
    // private onAgain(e: Event): void {

    //     GlobleFun.map.intiinit();
    //     GlobleFun.resurgenceCount -= 1;
    //     if (GlobleFun.resurgenceCount <= 0) {
    //         this.Again.skin = "img/clear_btn_again.png"
    //         console.log("本局复活次数已用完");
    //         this.Again.disabled = true;
    //     }
    //     console.log("本局复活次数-1");
    //     GlobleFun.isOver = false;
    //     // GlobleFun.Score=0;
    //     //   GlobleFun.checkpoint = 0;
    //     //   GlobleFun.explosionNum = 2;
    //     //   GlobleFun.invincibleNum = 2;
    //     GlobleFun.specialBall = false;
    //     GlobleFun.haveProp = false;
    //     GlobleFun.haveSpecialBall = false;
    //     GlobleFun.GameScene.isSpecialBall = false;
    //     console.log("again++++++++++++");
    //     this.visible = false;
    //     var GameScene: GameScene = GlobleFun.GameScene;
    //     //      GlobleFun.bulletPower =1; 
    //     //    GlobleFun.bulletInterval =10; 
    //     Laya.timer.once(500, this, () => {
    //         GameScene.player.event("again");
    //     });


    //     //location.reload()
    // }

    private onBack(): void {
        // this.Again.skin = "img/clear_btn_resurrection.png"
        GlobleFun.map.intiinit();
        // this.Again.disabled = false;
        GlobleFun.resurgenceCount = 2;
        GlobleFun.isOver = true;
        GlobleFun.bulletPower = 1;
        GlobleFun.bulletInterval = 15;
        GlobleFun.checkpoint = 0;
        GlobleFun.explosionNum = 2;
        GlobleFun.invincibleNum = 2;
        GlobleFun.specialBall = false;
        GlobleFun.haveProp = false;
        GlobleFun.haveSpecialBall = false;
        GlobleFun.GameScene.isSpecialBall = false;
        GlobleFun.Score = 0;
        GlobleFun.startScene.visible = true;
        GlobleFun.GameScene.visible = false;
        GlobleFun.GameScene.player.event("again");



        this.visible = false;
    }
    private onShowRank(): void {
        console.log("showRank");
        this.rankview = new RankScene();
        this.rankview.zOrder = 10000;
        Laya.stage.addChild(this.rankview);
    }

    private UiClickScale(button: any): void {
        button.on(Laya.Event.MOUSE_DOWN, this, () => {
            Laya.Tween.to(button, { scaleX: 0.8, scaleY: 0.8 }, 100, null, Laya.Handler.create(this, () => {
                button.on(Laya.Event.MOUSE_OUT, this, () => {
                    Laya.Tween.to(button, { scaleX: 1, scaleY: 1 }, 100);
                    return;
                })
            }));

        });
    }
}
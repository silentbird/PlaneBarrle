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
 * 游戏结束界面
 */
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.init();
        _this.timerLoop(1, _this, _this.onLoop);
        return _this;
    }
    GameOver.prototype.init = function () {
        var bestScore = Laya.LocalStorage.getItem("bestScore");
        this.bestScoreText.text = bestScore; //更新最高分数
        this.scoreText.text = GlobleFun.Score.toString(); //更新分数
        this.Again.on(Laya.Event.MOUSE_DOWN, this, this.onAgain); //监听在玩一次按钮
        this.Back.on(Laya.Event.MOUSE_DOWN, this, this.onBack); //监听返回按钮
        this.showRank.on(Laya.Event.CLICK, this, this.onShowRank); //显示所有的排行 显示排行榜
    };
    GameOver.prototype.onLoop = function () {
        var bestScore = Laya.LocalStorage.getItem("bestScore");
        this.bestScoreText.text = bestScore; //更新最高分数
        this.scoreText.text = GlobleFun.Score.toString(); //更新分数
        GlobleFun.startScene.maxScoreText.text = bestScore; //更新 开始界面的最高得分
    };
    GameOver.prototype.onAgain = function () {
        GlobleFun.resurgenceCount -= 1;
        if (GlobleFun.resurgenceCount <= 0) {
            console.log("本局复活次数已用完");
            this.Again.disabled = true;
        }
        console.log("本局复活次数-1");
        GlobleFun.isOver = false;
        // GlobleFun.Score=0;
        //   GlobleFun.checkpoint = 0;
        //   GlobleFun.explosionNum = 2;
        //   GlobleFun.invincibleNum = 2;
        GlobleFun.specialBall = false;
        GlobleFun.haveProp = false;
        GlobleFun.haveSpecialBall = false;
        GlobleFun.GameScene.isSpecialBall = false;
        console.log("again++++++++++++");
        this.visible = false;
        var GameScene = GlobleFun.GameScene;
        //      GlobleFun.bulletPower =1; 
        //    GlobleFun.bulletInterval =10; 
        GameScene.player.event("again");
        //location.reload()
    };
    GameOver.prototype.onBack = function () {
        //  console.log("back");
        this.Again.disabled = false;
        GlobleFun.resurgenceCount = 2;
        GlobleFun.isOver = true;
        GlobleFun.bulletPower = 1;
        GlobleFun.bulletInterval = 10;
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
    };
    GameOver.prototype.onShowRank = function () {
        console.log("showRank");
        this.rankview = new RankScene();
        this.rankview.zOrder = 10000;
        Laya.stage.addChild(this.rankview);
    };
    return GameOver;
}(ui.GameOverUI));
//# sourceMappingURL=GameOver.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *  主管理 界面
 */
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.load();
        //this.init();
        //Laya.stage.on(Laya.Event.RESIZE,this,this.adapter);
        //socket
        GlobleFun.socket = io("http://localhost:3000");
        GlobleFun.socket.on('connect', function () {
            console.log("[LAYA]连接成功");
        });
        GlobleFun.socket.on('get_rank', function (data) {
            if (GlobleFun.RankScene) {
                GlobleFun.RankScene.setData(data);
            }
        });
        return _this;
    }
    Main.prototype.load = function () {
        Laya.loader.load([
            "res/atlas/img.atlas",
            "res/atlas/prop.atlas",
            "background/bg_start.jpg",
        ], Laya.Handler.create(this, this.init));
    };
    Main.prototype.init = function () {
        //界面
        this.startScene = new StartScene();
        Laya.stage.addChild(this.startScene);
        this.startScene.layoutEnabled = true;
        this.startScene.left = 0;
        this.startScene.right = 0;
        this.startScene.top = 0;
        this.startScene.bottom = 0;
        GlobleFun.startScene = this.startScene;
        var bestScore = Laya.LocalStorage.getItem("bestScore");
        this.startScene.maxScoreText.text = bestScore;
        this.startScene.on("onBegin", this, this.loadGameScene); //开始 加载游戏界面
        this.startScene.on("onRank", this, this.loadRankScene); //排行榜 加排行榜界面
        // this.startScene.on("onShare", this, this.loadShareScene); //分享 加载分享界面
        // this.startScene.on("onHelp", this, this.loadHelpScene); //加载帮助界面
        // this.startScene.on("onSing", this, this.loadSignScene); //加载签到界面
    };
    Main.prototype.loadGameScene = function () {
        if (!this.startScene.txtNameText.text) {
            return;
        }
        GlobleFun.currentName = this.startScene.txtNameText.text;
        GlobleFun.addCheckpointScore(); //增加 关卡的分数
        console.log("loadGameScene");
        // console.log(" GlobleFun.bulletInterval ======="+GlobleFun.bulletInterval);
        if (this.gameScene) {
            this.gameScene.visible = true;
        }
        else {
            this.gameScene = new GameScene();
            Laya.stage.addChild(this.gameScene);
        }
        //  this.gameScene = this.gameScene || new GameScene();
        GlobleFun.isOver = false;
        //  this.gameScene.visible = true;
        this.gameScene.layoutEnabled = true;
        this.gameScene.left = 0;
        this.gameScene.right = 0;
        this.gameScene.top = 0;
        this.gameScene.bottom = 0;
        this.startScene.visible = false;
    };
    Main.prototype.loadRankScene = function () {
        if (!GlobleFun.RankScene) {
            var r = new RankScene();
            GlobleFun.RankScene = r;
            r.zOrder = 1000;
            Laya.stage.addChild(r);
            console.log("[Game]打开rank scene");
        }
        GlobleFun.socket.emit("get_rank");
    };
    return Main;
}(Laya.Sprite));
//# sourceMappingURL=Main.js.map
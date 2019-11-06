/**
 *  主管理 界面
 */
class Main extends Laya.Sprite {
    private gameScene: GameScene; //游戏界面
    private startScene: StartScene;//开始准备姐界面
    private helpScene: HelpScene;//帮助界面
    //Socket
    private socket: SocketIOClient.Socket;

    constructor() {
        super();
        this.load();
        //this.init();
        //Laya.stage.on(Laya.Event.RESIZE,this,this.adapter);

        //socket
        GlobleFun.socket = io("http://localhost:3000");
        GlobleFun.socket.on('connect', () => {
            console.log("[LAYA]连接成功");
        });
    }

    private load(): void {
        Laya.loader.load([
            "res/atlas/img.atlas",
            "res/atlas/prop.atlas",
            "background/bg_start.jpg",
        ], Laya.Handler.create(this, this.init));
    }

    private init(): void {
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
    }

    private loadGameScene(): void {
        if (this.startScene.strName && this.startScene.numScore) {
            GlobleFun.socket.emit("end_game", { name: this.startScene.strName, score: this.startScene.numScore });
        }
        return;
        GlobleFun.addCheckpointScore(); //增加 关卡的分数

        console.log("loadGameScene");
        // console.log(" GlobleFun.bulletInterval ======="+GlobleFun.bulletInterval);
        if (this.gameScene) {
            this.gameScene.visible = true;
        } else {
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
    }

    private loadRankScene(): void {
        var r = new RankScene();
        r.zOrder = 1000;
        Laya.stage.addChild(r);
        console.log("loadRankScene");
    }

    // private loadHelpScene(): void {
    //     console.log("帮助界面");

    //     this.helpScene = new HelpScene();
    //     Laya.stage.addChild(this.helpScene);
    //     this.helpScene.zOrder = 10000;
    // }

    // private loadSignScene(): void {
    //     console.log("加载签到 界面");
    // }
}
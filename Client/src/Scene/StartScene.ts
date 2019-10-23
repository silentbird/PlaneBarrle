/**
 * 开始准备界面
 */
class StartScene extends ui.StartSceneUI {
    constructor() {
        super();
        GlobleFun.startScene = this;
        this.init();
        // this.tubiao.removeSelf();
        // Laya.stage.addChild(this.tubiao);
        // this.tubiao.layoutEnabled = true;
        // //  this.tubiao.left = 210;
        // // this.tubiao.right = 208;
        // this.tubiao.centerX=0;
        // this.tubiao.top = 608;
        // this.tubiao.bottom = 48;
        // this.tubiao.zOrder = 1000;
    }

    private init(): void {
        //this.beginButton.on(Laya.Event.CLICK,this,this.onBegin);
        GlobleFun.UiClickScale(this.signButton, () => {
            this.event("onSing", this);
        });
        GlobleFun.UiClickScale(this.beginButton, () => {
            this.event("onBegin", this);
        });
        GlobleFun.UiClickScale(this.rankingButton, () => {
            this.event("onRank", this);
        });
        GlobleFun.UiClickScale(this.shareButton, () => {
            this.event("onShare", this);
        });
        GlobleFun.UiClickScale(this.helpButton, () => {
            this.event("onHelp", this);
        });
        //  this.beginButton.on(Laya.Event.MOUSE_DOWN,this,this.onBegin);
        // this.rankingButton.on(Laya.Event.MOUSE_DOWN,this,this.onRank);
        // this.shareButton.on(Laya.Event.MOUSE_DOWN,this,this.onShare);
        // this.helpButton.on(Laya.Event.MOUSE_DOWN,this,this.onHelp);
        //  this.signButton.on(Laya.Event.MOUSE_DOWN,this,this.onSing);
        this.maxScoreText.text = "00" || Laya.LocalStorage.getItem("bestScore");
        // this.bg.on(Laya.Event.CLICK,this,this.onclick);
    }

    private onBegin(btn): void {
        GlobleFun.UiClickScale(this.beginButton, () => {
            this.event("onBegin", this);
        });
    }
    private onRank(): void {
        GlobleFun.UiClickScale(this.rankingButton, () => {
            this.event("onRank", this);
        });
        //  this.event("onRank",this);
    }
    private onShare(): void {
        GlobleFun.UiClickScale(this.shareButton, () => {
            this.event("onShare", this);
        });
        //this.event("onShare",this);
    }
    private onHelp(): void {
        GlobleFun.UiClickScale(this.helpButton, () => {
            this.event("onHelp", this);
        });
        // this.event("onHelp",this);
    }
    private onSing(): void {
        GlobleFun.UiClickScale(this.signButton, () => {
            this.event("onSing", this);
        });
    }
}
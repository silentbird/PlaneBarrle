/**
 * 开始准备界面
 */
class StartScene extends ui.StartSceneUI {
    public strName: string;
    public numScore: number;
    constructor() {
        super();
        GlobleFun.startScene = this;
        this.init();
    }

    private init(): void {
        //this.beginButton.on(Laya.Event.CLICK,this,this.onBegin);
        GlobleFun.UiClickScale(this.beginButton, () => {
            this.event("onBegin", this);
        });
        GlobleFun.UiClickScale(this.rankingButton, () => {
            this.event("onRank", this);
        });
        this.strName = this.txtNameText.text;
        this.numScore = Number(this.maxScoreText.text);
    }
}
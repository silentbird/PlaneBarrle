
/**
 * 排行榜 界面
 */
class RankScene extends ui.RankUI {
    private t: any;
    constructor() {
        super();
        this.init();

    }
    private init(): void {
        this.backBtn.on(Laya.Event.MOUSE_DOWN, this, this.onBack);
    }
    private onBack(): void {
        this.moreRankBtn.visible = true;
        this.destroy();
    }
}
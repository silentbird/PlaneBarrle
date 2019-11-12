
/**
 * 排行榜 界面
 */
class RankScene extends ui.RankUI {
    private rankDataList: object[];
    constructor() {
        super();
        this.init();

    }

    private init(): void {
        GlobleFun.UiClickScale(this.backBtn, this.onBack);
        this.rankList.itemRender = RankItem;
        this.rankList.repeatX = 1;
        this.rankList.repeatY = 99;
    }

    private onBack(): void {
        GlobleFun.RankScene.rankList.destroy(true);
        GlobleFun.RankScene.destroy();
        GlobleFun.RankScene = null;
    }

    /**
     * 设置排行榜数据
     */
    public setData(data: object[]) {
        if (data) {
            this.rankDataList = this.sortData(data);
            var itemList = new Array();
            for (let i = 0; i < this.rankDataList.length; i++) {
                var item: RankItem = new RankItem();
                item.setData(this.rankDataList[i], i + 1);
                itemList.push(item);
            }
        }
        this.rankList.array = itemList;
    }

    private sortData(data: object[]) {
        for (let i = 0; i < data.length - 1; i++) {
            for (let j = 0; j < data.length - i - 1; j++) {
                if (data[j]["score"] < data[j + 1]["score"]) {
                    let tmp = data[j];
                    data[j] = data[j + 1];
                    data[j + 1] = tmp;
                }
            }
        }
        return data;
    }
}

/**
 * 排行榜 单项
 */
class RankItem extends ui.RankItemUI {
    constructor() {
        super();
    }

    /**
     * setData
     */
    public setData(data: object, idx: number) {
        this.nickname.text = data["name"];
        this.score.text = data["score"];
        this.rankingNum.text = String(idx);
    }
}
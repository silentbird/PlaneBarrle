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
 * 排行榜 单项
 */
var RankItem = /** @class */ (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        return _super.call(this) || this;
    }
    /**
     * setData
     */
    RankItem.prototype.setData = function (data, idx) {
        this.nickname.text = data["name"];
        this.score.text = data["score"];
        this.rankingNum.text = String(idx);
    };
    return RankItem;
}(ui.RankItemUI));
//# sourceMappingURL=RankItem.js.map
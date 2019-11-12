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
 * 排行榜 界面
 */
var RankScene = /** @class */ (function (_super) {
    __extends(RankScene, _super);
    function RankScene() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    RankScene.prototype.init = function () {
        GlobleFun.UiClickScale(this.backBtn, this.onBack);
        this.rankList.itemRender = RankItem;
        this.rankList.repeatX = 1;
        this.rankList.repeatY = 99;
    };
    RankScene.prototype.onBack = function () {
        GlobleFun.RankScene.rankList.destroy(true);
        GlobleFun.RankScene.destroy();
        GlobleFun.RankScene = null;
    };
    /**
     * 设置排行榜数据
     */
    RankScene.prototype.setData = function (data) {
        if (data) {
            this.rankDataList = this.sortData(data);
            var itemList = new Array();
            for (var i = 0; i < this.rankDataList.length; i++) {
                var item = new RankItem();
                item.setData(this.rankDataList[i], i + 1);
                itemList.push(item);
            }
        }
        this.rankList.array = itemList;
    };
    RankScene.prototype.sortData = function (data) {
        for (var i = 0; i < data.length - 1; i++) {
            for (var j = 0; j < data.length - i - 1; j++) {
                if (data[j]["score"] < data[j + 1]["score"]) {
                    var tmp = data[j];
                    data[j] = data[j + 1];
                    data[j + 1] = tmp;
                }
            }
        }
        return data;
    };
    return RankScene;
}(ui.RankUI));
//# sourceMappingURL=RankScene.js.map
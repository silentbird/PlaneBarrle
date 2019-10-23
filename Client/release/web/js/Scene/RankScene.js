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
        this.backBtn.on(Laya.Event.MOUSE_DOWN, this, this.onBack);
    };
    RankScene.prototype.onBack = function () {
        this.destroy();
    };
    return RankScene;
}(ui.RankUI));
//# sourceMappingURL=RankScene.js.map
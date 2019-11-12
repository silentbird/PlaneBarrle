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
 * 开始准备界面
 */
var StartScene = /** @class */ (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this) || this;
        GlobleFun.startScene = _this;
        _this.init();
        return _this;
    }
    StartScene.prototype.init = function () {
        var _this = this;
        //this.beginButton.on(Laya.Event.CLICK,this,this.onBegin);
        GlobleFun.UiClickScale(this.beginButton, function () {
            _this.event("onBegin", _this);
        });
        GlobleFun.UiClickScale(this.rankingButton, function () {
            _this.event("onRank", _this);
        });
        this.strName = this.txtNameText.text;
        this.numScore = Number(this.maxScoreText.text);
    };
    return StartScene;
}(ui.StartSceneUI));
//# sourceMappingURL=StartScene.js.map
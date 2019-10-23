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
    StartScene.prototype.init = function () {
        var _this = this;
        //this.beginButton.on(Laya.Event.CLICK,this,this.onBegin);
        GlobleFun.UiClickScale(this.signButton, function () {
            _this.event("onSing", _this);
        });
        GlobleFun.UiClickScale(this.beginButton, function () {
            _this.event("onBegin", _this);
        });
        GlobleFun.UiClickScale(this.rankingButton, function () {
            _this.event("onRank", _this);
        });
        GlobleFun.UiClickScale(this.shareButton, function () {
            _this.event("onShare", _this);
        });
        GlobleFun.UiClickScale(this.helpButton, function () {
            _this.event("onHelp", _this);
        });
        //  this.beginButton.on(Laya.Event.MOUSE_DOWN,this,this.onBegin);
        // this.rankingButton.on(Laya.Event.MOUSE_DOWN,this,this.onRank);
        // this.shareButton.on(Laya.Event.MOUSE_DOWN,this,this.onShare);
        // this.helpButton.on(Laya.Event.MOUSE_DOWN,this,this.onHelp);
        //  this.signButton.on(Laya.Event.MOUSE_DOWN,this,this.onSing);
        this.maxScoreText.text = "00" || Laya.LocalStorage.getItem("bestScore");
        // this.bg.on(Laya.Event.CLICK,this,this.onclick);
    };
    StartScene.prototype.onBegin = function (btn) {
        var _this = this;
        GlobleFun.UiClickScale(this.beginButton, function () {
            _this.event("onBegin", _this);
        });
    };
    StartScene.prototype.onRank = function () {
        var _this = this;
        GlobleFun.UiClickScale(this.rankingButton, function () {
            _this.event("onRank", _this);
        });
        //  this.event("onRank",this);
    };
    StartScene.prototype.onShare = function () {
        var _this = this;
        GlobleFun.UiClickScale(this.shareButton, function () {
            _this.event("onShare", _this);
        });
        //this.event("onShare",this);
    };
    StartScene.prototype.onHelp = function () {
        var _this = this;
        GlobleFun.UiClickScale(this.helpButton, function () {
            _this.event("onHelp", _this);
        });
        // this.event("onHelp",this);
    };
    StartScene.prototype.onSing = function () {
        var _this = this;
        GlobleFun.UiClickScale(this.signButton, function () {
            _this.event("onSing", _this);
        });
    };
    return StartScene;
}(ui.StartSceneUI));
//# sourceMappingURL=StartScene.js.map
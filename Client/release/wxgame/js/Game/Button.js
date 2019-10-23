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
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super.call(this) || this;
        _this.skin = "button_play01.png";
        _this.init();
        return _this;
    }
    Button.prototype.init = function () {
        this.onLoaded();
        Laya.loader.load(this.skin, Laya.Handler.create(this, this.onload));
    };
    Button.prototype.onLoaded = function () {
        var btn = new Laya.Button(this.skin);
        Laya.stage.addChild(btn);
    };
    return Button;
}(Laya.Sprite));
//# sourceMappingURL=Button.js.map
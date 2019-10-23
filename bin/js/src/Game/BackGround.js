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
 * 背景类
 */
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.t1 = "gamebg.jpg";
        _this.t2 = "gamebg1.jpg";
        _this.t3 = "gamebg2.jpg";
        _this.t4 = "gamebg3.jpg";
        _this.url = ["gamebg.jpg", "gamebg1.jpg", "gamebg2.jpg", "gamebg3.jpg"];
        _this.init();
        GlobleFun.Background = _this;
        return _this;
    }
    Background.prototype.init = function () {
        console.log("loadBackground");
        this.skin = this.url[0];
        // this.loadImage(this.t1);
        // this.timer.frameLoop(1,this,this.onLoop);
    };
    Background.prototype.onLoop = function () {
        this.changeBg();
    };
    Background.prototype.changeBg = function () {
        for (var i = 0; i < this.url.length; i++) {
            if (this.url[i] == this.skin) {
                this.skin = this.url[i + 1] || this.url[0];
                break;
            }
        }
        // Laya.timer.once(1000,this,this.changeBg);
    };
    return Background;
}(Laya.Image));
//# sourceMappingURL=BackGround.js.map
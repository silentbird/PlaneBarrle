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
 * 类型1的球 继承球的基类
 */
var Type1Ball = /** @class */ (function (_super) {
    __extends(Type1Ball, _super);
    function Type1Ball(Type) {
        var _this = _super.call(this) || this;
        // private BallType:number = 0;
        _this.TYPE1 = "type1";
        _this.TYPE2 = "type2";
        _this.TYPE3 = "type3";
        _this.TYPE4 = "type4";
        _this.type1count = 0;
        _this.isEffect = false;
        _this.ballType = Type;
        _this.init();
        Laya.timer.frameLoop(1, _this, _this.Loop);
        return _this;
    }
    Type1Ball.prototype.Loop = function () {
        if (this.speedy == 0 && this.type1count < 3 && !this.isEffect) {
            this.effect();
        }
    };
    Type1Ball.prototype.effect = function () {
        this.event(this.TYPE1, this);
    };
    return Type1Ball;
}(BallTest));
//# sourceMappingURL=Type1Ball.js.map
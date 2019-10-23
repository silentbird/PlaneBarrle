var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.MiniAdpter.init(true, true);
        Laya.init(600, 400, WebGL);
        this.init();
    }
    GameMain.prototype.init = function () {
        console.log("999999999999999999999999999999999999999999");
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map
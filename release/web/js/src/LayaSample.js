var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(512, 768, WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        // Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
        // Laya.DebugPanel.init();
        //  Laya.DebugTool.init();
        this.onload();
    }
    GameMain.prototype.onload = function () {
        // var scene = new GameScene();
        var main = new Main();
        Laya.stage.addChild(main);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map
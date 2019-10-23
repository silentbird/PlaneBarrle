import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    constructor()
    {
        Laya.init(720,1280, WebGL);
         Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
      //  Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
       // Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;

       // Laya.DebugPanel.init();
      //  Laya.DebugTool.init();
        this.onload();
       
        
    }
    private onload():void
    {
       // var scene = new GameScene();
        var main = new Main();
       
        Laya.stage.addChild(main);

        
    }
}
new GameMain();
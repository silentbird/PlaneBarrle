
class HelpScene extends ui.HelpeUI {
    constructor() {
        super();
        this.backButton.on(Laya.Event.CLICK, this, this.onBack);
    }
    private onBack(): void {
        // Laya.Tween.to(this,{x:this.x-Laya.stage.width-50},300,null,Laya.Handler.create(this,()=>{

        // }));
        this.destroy()

    }
}
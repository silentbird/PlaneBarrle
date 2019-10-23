/**
 * 背景类
 */
class Background extends Laya.Image {

    private url: any[] = ["background/bg_01.jpg", "background/bg_02.jpg", "background/bg_03.jpg", "background/bg_04.jpg"];
    private img: Laya.Sprite;
    constructor() {
        super();
        this.layoutEnabled = true;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
        this.init();
        GlobleFun.Background = this;
    }
    private init(): void {
        console.log("loadBackground");
        this.skin = this.url[0];
        // this.loadImage(this.t1);
        // this.timer.frameLoop(1,this,this.onLoop);
    }

    private onLoop(): void {
        this.changeBg();
    }

    public changeBg(): void {
        for (let i = 0; i < this.url.length; i++) {
            if (this.url[i] == this.skin) {
                this.skin = this.url[i + 1] || this.url[0];
                break;
            }
        }
        // Laya.timer.once(1000,this,this.changeBg);
    }
}
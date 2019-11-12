/**
 * 全局
 */
class GlobleFun {
    public static maxY: number = 0;
    public static startScene: any;
    public static map: any;
    public static player: any;
    public static GameScene: any;
    public static Background: any;
    public static RankScene: any;
    public static explosionNum: number = 2; //爆炸清屏按钮可使用次数
    public static invincibleNum: number = 2; //无敌保护按钮可使用次数
    public static specialBall: boolean = false; //是否刷新 特殊球
    public static haveSpecialBall: boolean = false;//场景中是否有 特殊球 
    public static haveProp: boolean = false;//场景中是否有道具
    public static checkpointScoreArr: any[] = [3000, 20000, 80000, 200000, 500000, 1000000];
    public static resurgenceCount: number = 2;//本局游戏最多复活次数
    public static socket: SocketIOClient.Socket;
    public static currentName: string;
    public static addCheckpointScore(): void {
        var m = 0;
        for (let i = 0; i < 100; i++) {
            let l = GlobleFun.checkpointScoreArr.length;
            m = GlobleFun.checkpointScoreArr[l - 1];
            m = m * 2;
            GlobleFun.checkpointScoreArr.push(m);
        }
    }
    /**
     * 玩家得分
     */
    public static Score: number = 0;
    /**
     * 是否游戏结束
     */
    public static isOver: boolean = false;
    /**
     * 玩家历史最高得分 本地缓存
     */
    public static bestScore: number = 0;
    /**
    * 玩家类型
    */
    public static playerType: number = 0;
    /**
     * 背景的Y坐标
     */
    public static bgY: number = 650;
    /**
     * 玩家的金币数量
     */
    public static PlayerGold: number = 0;
    /**
     * 子弹等级
     */
    public static bulletLevel: number = 1;
    public static bulletPower: number = 1;//子弹威力
    /**
     * 子弹发射间隔事件  1秒几发子弹
     */
    public static bulletInterval: number = 15;
    /**
     * 子弹 每条弹道最多 每秒几发
     */
    public static bulletNum: number = 15;
    /**
     * 子弹的飞行速度 每毫秒
     */
    public static bulletSpeedByFly: number = 15;  //修改参数  GameOver  里的 onBack  的也要修改

    /**
     * 当前关卡
     */
    public static checkpoint: number = 0;
    /**
     * 最高解锁关卡数
     */
    public static Maxcheckpoint: number = 1;

    /**
     * 返回指定范围随机数
     * @param Min 最小
     * @param Max 最大
     */
    public static RandomNumBoth(Min, Max): number {
        var range = Max - Min;
        var rand = Math.random();
        var num = Min + Math.round(rand * range);
        return num
    }
    /**
     * 指定时间后 关闭指定状态
     * @param seconds 时间几秒
     * @param state  状态1散弹 2发射器 3无敌保护  4激光
     */
    public static time(seconds: number, state: any): void {

        // console.log("时间"+seconds+"状态"+state);
        GlobleFun.GameScene.updataTime(seconds, state);
        let delay = seconds * 1000;
        Laya.timer.once(delay, this, () => {
            switch (state) {
                case 1:
                    GlobleFun.player.shotgunState = 0
                    GlobleFun.haveProp = false;
                    break;
                case 2:
                    GlobleFun.player.launcherState = 0
                    GlobleFun.haveProp = false;
                    break;
                case 3:
                    GlobleFun.player.InvincibleState = 0
                    GlobleFun.haveProp = false;
                    break;
                case 4:
                    GlobleFun.player.laserState = 0
                    GlobleFun.haveProp = false;
                    break;
            }
            //console.log("已关闭"+state+"状态");
        });
    }
    /**
     * 按钮 点击 放大 缩小
     * @param button 
     * @param callback 
     */
    public static UiClickScale(button: any, callback: any): void {
        // console.log("+++++++++++++++++++++++++++");

        button.on(Laya.Event.MOUSE_DOWN, this, () => {
            Laya.Tween.to(button, { scaleX: 0.8, scaleY: 0.8 }, 100, null, Laya.Handler.create(this, () => {
                button.on(Laya.Event.MOUSE_OUT, this, () => {
                    Laya.Tween.to(button, { scaleX: 1, scaleY: 1 }, 100);
                    return;
                })
            }));
        });
        button.on(Laya.Event.CLICK, this, () => {
            Laya.Tween.to(button, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(this, () => {
                callback();
            }))
        });
    }
}
/**
 * 全局
 */
var GlobleFun = /** @class */ (function () {
    function GlobleFun() {
    }
    GlobleFun.addCheckpointScore = function () {
        var m = 0;
        for (var i = 0; i < 100; i++) {
            var l = GlobleFun.checkpointScoreArr.length;
            m = GlobleFun.checkpointScoreArr[l - 1];
            m = m * 2;
            GlobleFun.checkpointScoreArr.push(m);
        }
    };
    /**
     * 返回指定范围随机数
     * @param Min 最小
     * @param Max 最大
     */
    GlobleFun.RandomNumBoth = function (Min, Max) {
        var range = Max - Min;
        var rand = Math.random();
        var num = Min + Math.round(rand * range);
        return num;
    };
    /**
     * 指定时间后 关闭指定状态
     * @param seconds 时间几秒
     * @param state  状态1散弹 2发射器 3无敌保护  4激光
     */
    GlobleFun.time = function (seconds, state) {
        // console.log("时间"+seconds+"状态"+state);
        GlobleFun.GameScene.updataTime(seconds, state);
        var delay = seconds * 1000;
        Laya.timer.once(delay, this, function () {
            switch (state) {
                case 1:
                    GlobleFun.player.shotgunState = 0;
                    GlobleFun.haveProp = false;
                    break;
                case 2:
                    GlobleFun.player.launcherState = 0;
                    GlobleFun.haveProp = false;
                    break;
                case 3:
                    GlobleFun.player.InvincibleState = 0;
                    GlobleFun.haveProp = false;
                    break;
                case 4:
                    GlobleFun.player.laserState = 0;
                    GlobleFun.haveProp = false;
                    break;
            }
            //console.log("已关闭"+state+"状态");
        });
    };
    /**
     * 按钮 点击 放大 缩小
     * @param button
     * @param callback
     */
    GlobleFun.UiClickScale = function (button, callback) {
        // console.log("+++++++++++++++++++++++++++");
        var _this = this;
        button.on(Laya.Event.MOUSE_DOWN, this, function () {
            Laya.Tween.to(button, { scaleX: 0.8, scaleY: 0.8 }, 100, null, Laya.Handler.create(_this, function () {
                button.on(Laya.Event.MOUSE_OUT, _this, function () {
                    Laya.Tween.to(button, { scaleX: 1, scaleY: 1 }, 100);
                    return;
                });
            }));
        });
        button.on(Laya.Event.CLICK, this, function () {
            Laya.Tween.to(button, { scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(_this, function () {
                callback();
            }));
        });
    };
    GlobleFun.maxY = 0;
    GlobleFun.explosionNum = 2; //爆炸清屏按钮可使用次数
    GlobleFun.invincibleNum = 2; //无敌保护按钮可使用次数
    GlobleFun.specialBall = false; //是否刷新 特殊球
    GlobleFun.haveSpecialBall = false; //场景中是否有 特殊球 
    GlobleFun.haveProp = false; //场景中是否有道具
    GlobleFun.checkpointScoreArr = [3000, 20000, 80000, 200000, 500000, 1000000];
    GlobleFun.resurgenceCount = 2; //本局游戏最多复活次数
    /**
     * 玩家得分
     */
    GlobleFun.Score = 0;
    /**
     * 是否游戏结束
     */
    GlobleFun.isOver = false;
    /**
     * 玩家历史最高得分 本地缓存
     */
    GlobleFun.bestScore = 0;
    /**
    * 玩家类型
    */
    GlobleFun.playerType = 0;
    /**
     * 背景的Y坐标
     */
    GlobleFun.bgY = 650;
    /**
     * 玩家的金币数量
     */
    GlobleFun.PlayerGold = 0;
    /**
     * 子弹等级
     */
    GlobleFun.bulletLevel = 1;
    GlobleFun.bulletPower = 1; //子弹威力
    /**
     * 子弹发射间隔事件  1秒几发子弹
     */
    GlobleFun.bulletInterval = 15;
    /**
     * 子弹 每条弹道最多 每秒几发
     */
    GlobleFun.bulletNum = 15;
    /**
     * 子弹的飞行速度 每毫秒
     */
    GlobleFun.bulletSpeedByFly = 15; //修改参数  GameOver  里的 onBack  的也要修改
    /**
     * 当前关卡
     */
    GlobleFun.checkpoint = 0;
    /**
     * 最高解锁关卡数
     */
    GlobleFun.Maxcheckpoint = 1;
    return GlobleFun;
}());
//# sourceMappingURL=GlobleFun.js.map
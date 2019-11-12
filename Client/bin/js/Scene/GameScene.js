var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 */
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    // public checkpoint:number = 0; //在gameOver onAgain 里赋值了
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.ballArr = [];
        _this.gameState = true;
        _this.isSpecialBall = false;
        _this.isSetTimeText = false; //是否正在 倒计时中
        _this.init();
        GameScene.instance = _this;
        GlobleFun.GameScene = _this;
        GlobleFun.bulletPower = 1;
        GlobleFun.bulletInterval = GlobleFun.bulletInterval;
        //console.log(GlobleFun.formatScore(1425000));
        //  GlobleFun.Main = this;
        // console.log(" GlobleFun.bulletInterval ======="+GlobleFun.bulletInterval);
        Laya.timer.frameLoop(1, _this, _this.onLoop);
        return _this;
    }
    GameScene.prototype.init = function () {
        //加载背景
        this.bggggg = new Background();
        this.bggggg.pos(0, 0);
        // this.bggggg.centerX=0;
        this.bggggg.layoutEnabled = true;
        this.bggggg.zOrder = -100;
        this.bggggg.left = 0;
        this.bggggg.right = 0;
        this.bggggg.top = 0;
        this.bggggg.bottom = 0;
        this.addChild(this.bggggg);
        //设置玩家
        var p = new Player(this.player, this); //玩家
        this.player.once(Player.DIE, this, this.onOver);
        //加载 球的管理类
        this.map = new MapBall();
        this.addChild(this.map);
        this.ballArr = this.map.ballArr;
        //加载结束界面
        this.over = new GameOver();
        this.over.zOrder = 10000;
        Laya.stage.addChild(this.over);
        // this.addChild(this.over);
        this.over.visible = false;
        this.updataProgress();
        //  this.flashingEffect();
    };
    /**
     * 实时更新
     */
    GameScene.prototype.onLoop = function () {
        if (GlobleFun.isOver && this.gameState) {
            this.gameState = false;
            this.againInit();
        }
        if (!GlobleFun.isOver) {
            this.gameState = true;
        }
        if (!GlobleFun.specialBall) { //没有特殊 球 时
            this.effectPicture_1.visible = false;
            this.effectPicture_2.visible = false;
        }
        var bestScore = Laya.LocalStorage.getItem("bestScore");
        this.currentScore.text = this.conversionScore(GlobleFun.Score); //更新当前分数
        // this.MaxSocre.text = bestScore; //更新最高分
        this.bulletPower.text = (GlobleFun.bulletPower * 100).toFixed(0) + "%"; //更新玩家的子弹威力文本
        this.bulletSpeed.text = (GlobleFun.bulletInterval).toString(); //更新玩家的子弹速度 文本
        this.updataCheckpoint();
        // this.updataProgress();
    };
    GameScene.getMain = function () {
        return GameScene.instance;
    };
    /**
     * 玩家死亡 游戏结束
     */
    GameScene.prototype.onOver = function () {
        //发送成绩
        GlobleFun.socket.emit("end_game", { name: GlobleFun.currentName, score: GlobleFun.Score });
        Laya.timer.clear(this, this.flashingEffect);
        this.propTimeIcon.visible = false;
        this.isSpecialBall = false;
        this.player.event("off", this.player); //取消玩家的移动监听
        this.setItem();
        GlobleFun.isOver = true;
        this.over.visible = true;
    };
    /**
     * 检查分数 设置最高分 和最高解锁关卡
     */
    GameScene.prototype.setItem = function () {
        // if(GlobleFun.checkpoint > GlobleFun.Maxcheckpoint){
        //     GlobleFun.Maxcheckpoint = GlobleFun.checkpoint;
        // }
        console.log("更新最高分");
        var score = GlobleFun.Score;
        var bestScore = Laya.LocalStorage.getItem("bestScore");
        if (bestScore && parseInt(bestScore) > score) {
            score = Number(bestScore);
            //  Laya.LocalStorage.setItem("bestScore",score.toString()); 
        }
        Laya.LocalStorage.setItem("bestScore", score.toString());
    };
    /**
     * 玩家死亡 初始化玩家位置和监听
     */
    GameScene.prototype.againInit = function () {
        console.log("main");
        //GlobleFun.Score = 0;//初始分数
        // this.player.pos(200,630);//初始玩家位置
        //this.player.x = Laya.Browser.clientWidth/2;
        this.player.centerX = 0;
        //this.player.y = Laya.Browser.clientHeight*0.8;
        // console.log(" this.player.x = "+Laya.Browser.clientWidth/2+"      this.player.y ="+ Laya.Browser.clientHeight*0.8)
        //  console.log(this.player.x+"    "+this.player.y);
        this.player.once(Player.DIE, this, this.onOver); //重新设置玩家的死亡监听
    };
    /**
     * 根据得分更新关卡
     */
    GameScene.prototype.updataCheckpoint = function () {
        //  var arr:number[]=[3000,20000,80000,200000,500000,1000000]; //初始关卡序列为 0关 分数达到要求 这进入下一关
        if (GlobleFun.Score >= GlobleFun.checkpointScoreArr[GlobleFun.checkpoint]) {
            GlobleFun.checkpoint++;
        }
        this.nextCheckpointScore.text = GlobleFun.checkpointScoreArr[GlobleFun.checkpoint].toString(); //更新下一关卡需要的分数文本 进度条上的文本
        this.indexCheckpointScore.text = GlobleFun.Score.toString(); //更新 当前分数 进度条上的文本
        //   this.checkpointText.text = "第 "+GlobleFun.checkpoint.toString()+" 关"; //更新关卡文本
        //if(this.checkpoint >=5 && GlobleFun.checkpoint > this.checkpoint){this.checkpoint=0};
    };
    /**
     * 更新关卡进度条
     */
    GameScene.prototype.updataProgress = function () {
        var _this = this;
        Laya.timer.once(10, this, this.updataProgress);
        //var arr:number[]=[3000,20000,80000,200000,500000,1000000]; //初始关卡序列为 0关 分数达到要求 这进入下一关
        if (GlobleFun.specialBall && !this.isSpecialBall) { ///刷新 特殊球
            GlobleFun.checkpoint % 2 == 0 ? this.effectPicture_1.visible = true : this.effectPicture_2.visible = true; //显示特殊边框
            this.flashingEffect();
            //this.effectPicture_1.visible = true
            console.log(this.effectPicture_1.visible + "+++++++++++");
            this.effectPicture_1.zOrder = 1500;
            this.effectPicture_2.zOrder = 1500;
            this.isSpecialBall = true;
            Laya.timer.once(2000, this, function () {
                Laya.timer.clear(_this, _this.flashingEffect);
                GlobleFun.map.addBall();
            });
            return;
        }
        var n = GlobleFun.checkpointScoreArr[GlobleFun.checkpoint - 1] || 0;
        var m = GlobleFun.checkpointScoreArr[GlobleFun.checkpoint];
        var s = GlobleFun.Score - n;
        var sss = m - n;
        var v = s / sss;
        if (v >= 0.95 && !GlobleFun.haveSpecialBall) {
            console.log("   * 更新关卡进度条");
            GlobleFun.specialBall = true;
        }
        this.progress.value = v;
    };
    /**
     * 转换传入的参数 1000=1K 10000=1M
     * @param score
     */
    GameScene.prototype.conversionScore = function (score) {
        var sym = ",";
        var str;
        var nnn;
        var n;
        var nnnn;
        var nnnnn;
        if (score / 1000 >= 1 && score < 1000000) //一千到一千万  1，000
         {
            var m = void 0;
            n = Math.floor(score / 1000);
            nnn = score - n * 1000;
            if (nnn < 10) {
                m = "00";
            }
            else if (nnn < 100) {
                m = "0";
            }
            else {
                m = "";
            }
            str = n.toString() + sym + m + nnn.toString(); //1，000，000           999，000，000
        }
        else if (score / 1000000 >= 1 && score < 1000000000) {
            var m = void 0;
            var mm = void 0;
            n = Math.floor(score / 1000000); //最大单位的数
            nnn = score - n * 1000000; //得到 000，000 范围的数
            nnnn = Math.floor(nnn / 1000); //得到 999，000，
            nnnnn = nnn - nnnn * 1000; //得到 999
            if (nnnnn < 10) {
                m = "00";
            }
            else if (nnnnn < 100) {
                m = "0";
            }
            else {
                m = "";
            }
            if (nnnn < 10) {
                mm = "00";
            }
            else if (nnnn < 100) {
                mm = "0";
            }
            else {
                mm = "";
            }
            str = n.toString() + sym + mm + nnnn.toString() + sym + m + nnnnn.toString();
        }
        else if (score >= 1000000000) {
            str = "你已超越地球人！";
        }
        if (score < 1000) {
            str = score.toString();
        }
        //let ss:string = str.toString();
        return str;
    };
    /**
     * 特殊 球 出现时  特效边框的闪烁
     */
    GameScene.prototype.flashingEffect = function () {
        var _this = this;
        Laya.timer.once(900, this, this.flashingEffect);
        Laya.Tween.to(this.effectPicture_1, { alpha: 0 }, 500, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(_this.effectPicture_1, { alpha: 1 }, 400, null);
        }));
        Laya.Tween.to(this.effectPicture_2, { alpha: 0 }, 500, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(_this.effectPicture_2, { alpha: 1 }, 400, null);
        }));
    };
    //道具 使用倒计时 
    GameScene.prototype.updataTime = function (num, type) {
        var res = ["prop/main_icon_bullet.png", "prop/main_icon_launcher.png", "prop/shield_icon.png", "prop/main_icon_laser.png",];
        this.propTimeIcon.visible = true;
        this.propTimeIcon.skin = res[type - 1];
        this.propTime.text = num.toString();
        if (!this.isSetTimeText) {
            this.setTimeText();
        }
    };
    GameScene.prototype.setTimeText = function () {
        var _this = this;
        Laya.timer.once(1000, this, function () {
            _this.isSetTimeText = true;
            _this.propTime.text = (parseInt(_this.propTime.text) - 1).toString();
            if (parseInt(_this.propTime.text) == 0) {
                _this.propTimeIcon.visible = false;
                _this.isSetTimeText = false;
                return;
            }
            _this.setTimeText();
        });
    };
    return GameScene;
}(ui.sceneUI));
//# sourceMappingURL=GameScene.js.map
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
 * 玩家
 */
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(player, parent) {
        var _this = _super.call(this) || this;
        _this.isDown = false;
        _this.timeCount = 0;
        //  private main:any;
        _this.jgUrl = "prop/main_weapon_laser_2.png";
        _this.shieldUrl = "prop/main_weapon_shield.png";
        _this.gameState = true;
        _this.moveX = 0;
        _this.shotgunState = 0; //是否处于散弹状态 1为是 0为否
        _this.launcherState = 0; //是否处于发射器状态 1为是 0为否
        _this.InvincibleState = 0; //是否处于无敌保护状态 1为是 0为否
        _this.laserState = 0; //是否处于发射激光状态 
        _this.delay = Math.floor(1000 / GlobleFun.bulletNum);
        _this.bulletNumList = 0;
        _this.angleArr = [0, 8, -8, 16, -16]; //子弹弹道的角度
        _this.shotgunAngleArr = [-5, -3, -1, 1, 3, 5]; //散弹的发射角度
        _this.nn = 0;
        _this.dd = 0;
        _this.player = player;
        _this.launchPic = _this.player.getChildAt(0);
        _this.player.pivot(_this.player.width / 2, _this.player.height / 2);
        // this.main = parent;
        GlobleFun.maxY = _this.player.y + _this.player.height / 2;
        GlobleFun.player = _this;
        //--------------护盾
        _this.shield = new Laya.Image();
        _this.shield.loadImage(_this.shieldUrl);
        _this.shield.visible = false;
        _this.player.addChild(_this.shield);
        _this.shield.pos(71, 66);
        _this.shield.anchorX = 0.5;
        _this.shield.anchorY = 0.5;
        // this.shield.pivot(this.shield.width/2,this.shield.height/2);
        _this.shield.alpha = 0.5;
        _this.shield.zOrder = 10000;
        _this.handleTouchEvent();
        _this.bulletBallistic();
        //----------------激光
        _this.laserPic = new Laya.Image();
        _this.laserPic.loadImage(_this.jgUrl);
        _this.player.addChild(_this.laserPic);
        _this.laserPic.pos(71, 26);
        _this.laserPic.anchorX = 0.5;
        _this.laserPic.anchorY = 1;
        // this.laserPic .pivotY=this.laserPic .height/2;
        // this.laserPic.rotation = -90;
        //  this.laserPic.scaleX = 1;
        _this.laserPic.visible = false;
        _this.player.on("again", _this, _this.open);
        Laya.timer.loop(1, _this, _this.checkHItLoop); //每毫秒 检查碰撞
        return _this;
    }
    /**
     * 玩家移动事件
     */
    Player.prototype.handleTouchEvent = function () {
        var _this = this;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, function (e) {
            if (e.target.name === "功能按钮") {
                return;
            }
            // console.log(e.target.name+"00000000000000000");
            _this.isDown = true;
            _this.moveX = Laya.stage.mouseX;
            Laya.Tween.to(_this.player, { x: _this.moveX }, 100);
        });
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, function (event) {
            if (_this.isDown) {
                var xx = _this.moveX - Laya.stage.mouseX;
                _this.player.x -= xx;
                _this.moveX = Laya.stage.mouseX;
                //  Laya.Tween.to(this.player,{x:Laya.stage.mouseX},500,Laya.Ease.expoOut);
                // this.player.x = Laya.stage.mouseX;
            }
        });
        Laya.stage.on(Laya.Event.MOUSE_UP, this, function (event) {
            if (_this.isDown) {
                _this.isDown = false;
            }
        });
        this.player.on("off", this, this.offState); //监听 玩家死亡 取消 移动监听
    };
    Player.prototype.offState = function () {
        this.shotgunState = 0; //是否处于散弹状态 1为是 0为否
        this.launcherState = 0; //是否处于发射器状态 1为是 0为否
        this.InvincibleState = 0; //是否处于无敌保护状态 1为是 0为否
        this.laserState = 0; //是否处于发射激光状态 
        console.log("off");
        Laya.stage.offAll();
    };
    Player.prototype.open = function () {
        console.log("open");
        this.handleTouchEvent();
        this.nn = 0;
        this.shotgunState = 0;
        this.launcherState = 0;
        this.InvincibleState = 0;
        this.laserState = 0;
    };
    Player.prototype.checkHItLoop = function () {
        if (GlobleFun.isOver) {
            this.shotgunState = 0;
            this.laserState = 0;
            this.launcherState = 0;
            this.InvincibleState = 0;
            return;
        }
        this.checkHit(); //检测碰撞和球
        this.checkHitByProp(); //检测碰撞和金币
        this.checkHitByLaser();
        this.checkHitByShield();
        //  if(this.laserState==1 || this.launcherState==1){return}
        this.bulletNumList = Math.floor(GlobleFun.bulletInterval / GlobleFun.bulletNum); //弹道
        this.nn = GlobleFun.bulletInterval % GlobleFun.bulletNum; //多余几发子弹
        this.dd = 1000 - this.nn * 100;
        // this.dd = Math.floor(1000/this.nn);//多余的子弹 多少毫秒发射一发
    };
    /**
     * 计算有几条子弹弹道 并发射子弹
     */
    Player.prototype.bulletBallistic = function () {
        //    this.bulletNumList = Math.floor(GlobleFun.bulletInterval/GlobleFun.bulletNum);//弹道
        //    this.nn = GlobleFun.bulletInterval%GlobleFun.bulletNum; //多余的 子弹
        var angle1 = [0];
        var angle2 = [5, -5];
        var angle3 = [10, 0, -10];
        var angle4 = [15, 5, -5, -15];
        var angle5 = [25, 10, 0, -10, -25];
        var listNUm;
        Laya.timer.once(this.delay, this, this.bulletBallistic);
        if (GlobleFun.isOver) {
            return;
        }
        this.timeCount += this.delay;
        // console.log("nn===="+this.nn+"  shotgunState==="+this.shotgunState+"   timeCount=="+this.timeCount+"   dd==="+this.dd);
        if (this.nn != 0 && this.shotgunState == 0 && this.timeCount % this.dd == 0) {
            if (this.dd == 100 && this.timeCount % 900 == 0) {
                listNUm = this.bulletNumList;
            }
            else {
                listNUm = this.bulletNumList + 1;
            }
            // console.log("********")
        }
        else {
            listNUm = this.bulletNumList;
        }
        if (GlobleFun.isOver) {
            return;
        }
        if (this.shotgunState == 1) { //如果状态时散弹 这发射散弹 
            this.shotgun();
            return;
        }
        for (var i = 0; i < listNUm; i++) {
            if (listNUm == 1) {
                this.fireBullet(angle1[i]);
            }
            else if (listNUm == 2) {
                this.fireBullet(angle2[i]);
            }
            else if (listNUm == 3) {
                this.fireBullet(angle3[i]);
            }
            else if (listNUm == 4) {
                this.fireBullet(angle4[i]);
            }
            else if (listNUm == 5) {
                this.fireBullet(angle5[i]);
            }
            else {
                this.fireBullet(angle5[i]);
            }
        }
        //   Laya.timer.loop(this.delay,this,()=>{
        //               if(GlobleFun.isOver){return}
        //               if(this.shotgunState==1){//如果状态时散弹 这发射散弹 
        //                   this.shotgun()
        //                   return
        //                 }
        //                // console.log("bulletNumList==========="+this.bulletNumList);
        //                 for(let i=0;i<this.bulletNumList;i++){
        //                      this.fireBullet(this.angleArr[i]);
        //                 }
        //          }); 
    };
    /**
     * 发射子弹
     */
    Player.prototype.fireBullet = function (angle) {
        if (this.laserState == 1 || this.shotgunState == 1) {
            return;
        }
        this.addBullet(angle);
    };
    /**
     * 散弹------------------------------------------
     */
    Player.prototype.shotgun = function () {
        // let angle:number = 2;
        for (var i = 0; i < 6; i++) {
            // let an = -5+i*angle;
            this.addBullet(this.shotgunAngleArr[i]);
        }
    };
    //发射器循环
    Player.prototype.loopLauncher = function () {
        this.launchPic.visible = true;
        var delay = GlobleFun.bulletInterval <= GlobleFun.bulletNum ? Math.floor(1000 / GlobleFun.bulletInterval) : this.delay;
        Laya.timer.loop(delay, this, this.launcher);
    };
    /**
     * 发射器--------------------------------------
     */
    Player.prototype.launcher = function () {
        if (GlobleFun.isOver) {
            return;
        }
        var pos = [100, -100];
        for (var i = 0; i < 2; i++) {
            this.addBullet(null, pos[i]);
        }
        if (this.launcherState == 0) {
            this.launchPic.visible = false;
            Laya.timer.clear(this, this.launcher);
        }
    };
    /**
    * 添加子弹
    */
    Player.prototype.addBullet = function (angle, px) {
        var bullet = Laya.Pool.getItemByClass("bullet", Bullet);
        bullet.init(2);
        //console.log("++++++++++++++++"+angle);
        // if(this.shotgunState==1){
        //     bullet.setAngleshotgun(angle);  //设置散弹的射击角度
        // }else{
        //      bullet.setAngle(angle)  //普通模式的 子弹角度
        // }
        if (angle) {
            if (this.shotgunState == 1) {
                // console.log("9999999999999999999");
                bullet.setAngleshotgun(angle); //设置散弹的射击角度
            }
            else {
                bullet.setAngle(angle); //普通模式的 子弹角度
            }
        }
        bullet.visible = true;
        if (px) { //px是 发射器的 左右 两个发射器的偏移x量
            bullet.pos(this.player.x + px, this.player.y);
        }
        else {
            bullet.pos(this.player.x, this.player.y - this.player.height / 2 - 25);
        }
        // bullet.pos(this.player.x-5 , this.player.y- 15);
        //  bullet.pos(100 , this.player.y- 15);
        bullet.zOrder = 10000;
        var p = GlobleFun.map;
        p.addChild(bullet);
    };
    /**
    * 检查碰撞 玩家和球
    */
    Player.prototype.checkHit = function () {
        if (this.InvincibleState == 1) //如果时无敌保护状态 着不检查和球的碰撞
         {
            this.shield.visible = true;
            return;
        }
        else {
            this.shield.visible = false;
        }
        var map = MapBall.getMapBall();
        var list = map.ballArr;
        for (var i = 0; i < list.length; i++) {
            var ball = list[i];
            var l = Math.abs(Math.sqrt((this.player.x - ball.x) * (this.player.x - ball.x) + (this.player.y - ball.y) * (this.player.y - ball.y)));
            if (l < ball.height / 2 + this.player.height / 2 - 15 || l < ball.width / 2 + this.player.width / 2 - 15) {
                this.player.event(Player.DIE, this);
                //  console.log("die");
                break;
            }
        }
    };
    /**
     * 检测碰撞 玩家和 道具
     */
    Player.prototype.checkHitByProp = function () {
        var list = MapBall.mapball.propArr;
        for (var i = 0; i < list.length; i++) {
            var prop = list[i];
            var l = Math.abs(Math.sqrt((this.player.x - prop.x) * (this.player.x - prop.x) + (this.player.y - prop.y) * (this.player.y - prop.y)));
            if (l < prop.width / 2 + this.player.width / 2 || l < prop.height / 2 + this.player.height / 2) {
                prop.event("hitProp", prop);
                //  this.setLoop(); 
                break;
            }
        }
    };
    /**
    * 检查碰撞 护盾和球
    */
    Player.prototype.checkHitByShield = function () {
        // this.timer.once(1,this,this.checkHit);
        if (this.InvincibleState == 0) {
            return;
        }
        var map = MapBall.getMapBall();
        var list = map.ballArr;
        for (var i = 0; i < list.length; i++) {
            var ball = list[i];
            var l = Math.abs(Math.sqrt((this.player.x - ball.x) * (this.player.x - ball.x) + (this.player.y - ball.y) * (this.player.y - ball.y)));
            if (l < ball.height / 2 + this.shield.height / 2 + 10 || l < ball.width / 2 + this.shield.width / 2 + 10) {
                ball.updataScore(ball.score);
                console.log("shiled++++++++++++++++++++++++++++++++++++");
                break;
            }
        }
    };
    /**
    * 检查碰撞 激光和球
    */
    Player.prototype.checkHitByLaser = function () {
        // this.timer.once(1,this,this.checkHit);
        if (this.laserState == 0 || GlobleFun.isOver) {
            this.laserPic.visible = false;
            return;
        }
        this.laserPic.visible = true;
        var map = GlobleFun.map;
        var list = map.ballArr;
        var hitArr = [];
        var hitBall;
        for (var i = 0; i < list.length; i++) {
            var ball = list[i];
            var lx = Math.abs(ball.x - this.player.x);
            if (lx < this.player.width / 2 + ball.width / 2) {
                hitArr.push(ball);
            }
        }
        var index = 0;
        for (var i = 0; i < hitArr.length; i++) {
            if (hitArr[i].y > hitArr[index]) {
                console.log("laser++++++++++++++++++++++++++++++++++++");
                index = i;
                hitBall = hitArr[index];
            }
        }
        if (!hitArr[index]) {
            this.laserPic.scaleY = 1;
            return;
        }
        var power = GlobleFun.bulletPower;
        hitArr[index].updataScore(power);
        var ly = this.player.y - hitArr[index].y - hitArr[index].ballSize / 2;
        var scalNum = ly / this.laserPic.height;
        this.laserPic.scaleY = scalNum;
        console.log("laser++++++++++++++++++++++++++++++++++++");
    };
    Player.DIE = "die";
    return Player;
}(Laya.Sprite));
//# sourceMappingURL=Player.js.map
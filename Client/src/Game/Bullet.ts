
//威力 初始为1  文本显示为100%
//碰到 增加威力的道具 威力增加0.1
//速度 


/**
 * 子弹类  
 */
class Bullet extends Laya.Sprite {
  //子弹图片
  private texture1: string = "prop/main_weapon_bullet.png";


  private speedByFly: number = 10;//子弹飞行速度
  private speedByX: number = 6;//子弹X 偏移速度
  private ss: number = 2;
  private ty: number = 1;
  private power: number = 1;//子弹威力

  // private angleY:number =90; //子弹Y轴的射击角度
  private angleX: number = Math.atan2(20, 0); //子弹X轴的射击角度
  private cc: number = 0;
  private issetAngleshotgun: boolean = false;
  constructor() {
    super();
    this.init();
    // this.pivot(this.width/2,this.height/2);

    this.onLoop();
    Laya.timer.frameLoop(1, this, this.checkHit);


  }
  public init(): void {
    this.cc = 0;
    this.issetAngleshotgun = false;;
    this.angleX = Math.atan2(20, 0);

    this.pivot(this.width / 2, this.height / 2);
    this.loadImage(this.texture1);


  }
  /**
   * 设置子弹的射击角度
   * @param num 
   */
  public setAngle(num: number): void {

    this.angleX = Math.atan2(20, num);
    // this.timer.once(200,this,()=>{
    //     this.angleX = Math.atan2(20,0);
    //    // this.ss =0;
    //     //console.log("Math.cos(this.angleX)=="+this.speedByX* Math.cos(this.angleX));
    //    // console.log("this.angleX=="+this.angleX);
    //    // console.log("this.x==="+this.x+"            dir="+this.ty+"   cc=="+this.cc);
    // });

  }
  /**
   * 散弹的角度
   * @param num 
   */
  public setAngleshotgun(num: number): void {
    // this.angleX = num;
    //  console.log("++++++++++++++++"+num);
    this.issetAngleshotgun = true;
    this.angleX = Math.atan2(10, num);
  }
  private onLoop(): void {
    this.timer.once(1, this, this.onLoop);
    if (GlobleFun.isOver) {
      // this.destroy();
      this.y -= 1280;
      return
    }
    this.cc += 1;
    if (this.cc >= 8 && !this.issetAngleshotgun) {
      this.angleX = Math.atan2(20, 0)
    }
    this.speedByFly = GlobleFun.bulletSpeedByFly;
    this.updataPower();


    //this.x += this.speedByX* Math.cos(this.angleX);


    this.x += this.speedByX * Math.cos(this.angleX);
    this.y -= this.speedByFly;
    //this.y -= this.speedByFly;
    //  this.checkHit();
    if (this.y < -20) {
      this.removeSelf();
      Laya.Pool.recover("bullet", this);

      // this.destroy();
    }
    //   

  }
  /**
   * 更新子弹威力
   */
  private updataPower(): void {
    this.power = GlobleFun.bulletPower;
    // let num = Math.floor(GlobleFun.PlayerGold/100);
    // if(num < 1){num = 1};
    // this.power =num;
  }

  /**
   * 检查碰撞 子弹和球
   */
  private checkHit(): void {
    let parent = GlobleFun.map;
    if (!parent) { return };

    let list = parent.ballArr;
    for (let i = 0; i < list.length; i++) {
      let ball = list[i];
      let l = Math.abs(Math.sqrt((this.x - ball.x) * (this.x - ball.x) + (this.y - ball.y) * (this.y - ball.y)));
      if (l < ball.height / 2 + this.height / 2 || l < ball.width / 2 + this.width / 2) {
        // console.log(ball.width+'  '+ball.height);
        // console.log('checkHit');
        this.visible = false;
        //ball.updataScore(this.power);
        // this.removeSelf();
        this.destroy();
        // Laya.Pool.recover("bullet",this); 
        ball.updataScore(this.power);

        // this.destroy();
        break;
      }
    }
  }
}
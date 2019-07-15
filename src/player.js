

class Player {
    constructor() {
        this.img = R.image(Grfx.ALIEN);
        this.ray = R.image(Grfx.RAY);
        this.x = -this.img.width;
        this.y = 80;
        this.showRay = false;
        this.nState = this.rayLength = 0;
        this.state = Const.ENTER;
        this.reset();
    }

    reset() {
        this.x = -this.img.width;
        this.y = 80;
        this.state = Const.ENTER;
        this.showRay = false;
        this.nState = this.rayLength = 0;
    }
    
    update(dt) {
        switch(this.state) {
            case Const.ENTER:
                if((this.x += dt * 60) > 30) {
                    this.x = 30;
                    this.state = Const.PLAY;
                }
            break;
            case Const.DIE:
                this.rayLength = 0;
                if((this.y -= dt * 80) < -this.img.height) {
                    this.state = Const.STOP;
                }
            break;
            case Const.EXPLODE:
                this.rayLength = 0;
                this.y = -this.img.height
                this.state = Const.STOP;
            break;
            case Const.SHOOT:
                if((this.rayLength += dt * 800) > 100) {
                    this.state = Const.PUSH;
                }
            break;
            case Const.PUSH:
                if((this.rayLength -= dt * (Const.PUSH_SPEED + 33)) < 3) {
                    this.rayLength = 0;
                }
            break;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.ray, this.x + 6, this.y + 35, 36, this.rayLength)
        ctx.drawImage(this.img, this.x, this.y)
    }

    shoot() {
        this.showRay = true;
        this.state = Const.SHOOT
    }
}
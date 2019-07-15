
class Explosion {
    constructor() {
        this.img = [
            R.image(Grfx.X0),
            R.image(Grfx.X1),
            R.image(Grfx.X2),
            R.image(Grfx.X3),
            R.image(Grfx.X4),
            R.image(Grfx.X5),
            R.image(Grfx.X6),
            R.image(Grfx.X7),
            R.image(Grfx.X8),
            R.image(Grfx.X9),
            R.image(Grfx.X10),
            R.image(Grfx.X11),
            R.image(Grfx.X12),
            R.image(Grfx.X13),
            R.image(Grfx.X14)
        ];
        this.x = this.y = 0;
        this.idx = 0;
        this.frameTime = .04;
        this.active = false;
    }

    update(dt) {
        if(this.active) {
            if((this.frameTime -= dt) < 0) {
                this.frameTime = .04;
                if(++this.idx > 14) {
                    this.active = false;
                }
            }
        }
    }

    draw(ctx) {
        if(this.active) {
            const i = this.img[this.idx];
            ctx.drawImage(i, this.x - (i.width >> 1), this.y - (i.height >> 1));
        }
    }

    start(x, y) {
        this.x = x;
        this.y = y;
        this.active = true;
        this.idx = 0;
    }
}

class Stars {
    constructor() {
        this.stars = [];
        this.hide = false;
    }

    update(dt) {
        if(this.stars.length < 80 && !this.hide) {
            this.fill();
        }
        for(let r = this.stars.length - 1; r > -1; r--) {
            this.stars[r].a += (dt * this.stars[r].d);

            if(this.stars[r].a > 1) {
                this.stars[r].a = 1;
                this.stars[r].d = -.25;
            } else if(this.stars[r].a < 0) {
                if(this.hide) {
                    this.stars.splice(r, 1);
                    continue;
                }
                this.stars[r].x = Math.random() * Const.WIDTH;
                this.stars[r].y = Math.random() * Const.HEIGHT;
                this.stars[r].d = .25;
                this.stars[r].a = 0;
            }
        }
    }

    draw(ctx) {
        for(let r = 0; r < this.stars.length; r++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.stars[r].a})`;
            ctx.fillRect(this.stars[r].x, this.stars[r].y, this.stars[r].s, this.stars[r].s);
        }
    }

    reset() {
        this.stars = [];
        this.hide = false;
    }

    fill() {
        //for(let r = 0; r < 2; r++) {
            let p = Math.random();
            this.stars.push({
                x: Math.random() * Const.WIDTH,
                y: Math.random() * Const.HEIGHT,
                s: 1,
                d: .25,
                a: p
            });
        //}
    }
}
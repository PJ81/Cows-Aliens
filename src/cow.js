class Cow extends State {
    constructor() {
        super();
        this.idx = this.hiscore = this.score = this.floor_x = this.bush_x = this.water_x = 0;

        this.topTimer = R.image(Grfx.BACKBAR);
        this.floor = R.image(Grfx.FLOOR);
        this.bush = R.image(Grfx.BUSH);
        this.water = R.image(Grfx.W0);
        this.waterB = R.image(Grfx.W1);
        this.waterY = {
            a: 0,
            b: 1.5
        };
        this.width = 128;
        this.timer = 61;
        this.state = Const.STOP;
        this.move = true;
        this.acc = 0;
        this.clouds = new Clouds();
        this.player = new Player();
        this.explosion = new Explosion();
        this.stuff = [];
        this.wait2Die = false;
        this.thing = null;
    }

    reset() {
        this.thing = null;
        this.wait2Die = false;
        this.state = Const.STOP;
        this.score = this.idx = this.floor_x = this.bush_x = this.water_x = 0
        this.timer = 61;
        this.player.reset();
        this.stuff = [];
        const s = rand(0, 3);
        this.stuff.push({
            m: false,
            s: 1,
            t: s,
            y: 211 - R.image(Grfx.COW + s).height,
            x: (30 + (this.player.img.width >> 1)) - (R.image(Grfx.COW + s).width >> 1)
        });
        for (let t = 0; t < 5; t++) {
            this.addStuff();
        }
    }

    update(dt) {
        this.clouds.update(dt);
        this.player.update(dt);
        this.explosion.update(dt);

        if ((this.waterY.a += 3 * dt) > Const.TWO_PI) this.waterY.a = 0;
        if ((this.waterY.b += 3 * dt) > Const.TWO_PI) this.waterY.b = 0;

        if (this.timer && !this.wait2Die && (this.timer -= dt * 1.5) < 0) {
            this.die(0);
        }

        switch (this.state) {
            case Const.ACC:
                const speed = 2.5;
                let sp = Const.FLOOR_SPEED * dt * speed;
                if ((this.acc += sp) > 50) {
                    sp = 50 - (this.acc - sp);
                    this.state = Const.STOP
                }
                this.floor_x -= sp;
                this.bush_x -= (Const.BUSH_SPEED * dt * speed);
                this.water_x -= (Const.WATER_SPEED * dt * speed);

                this.floor_x %= this.width;
                this.bush_x %= this.width;
                this.water_x %= this.width;

                for (let s = this.stuff.length - 1; s > -1; s--) {
                    if ((this.stuff[s].x -= sp) < -60) {
                        this.stuff.splice(s, 1);
                        this.addStuff();
                    }
                }
                break;
            case Const.PUSH:
                if ((this.thing.y -= Const.PUSH_SPEED * dt) < (this.player.y + this.player.img.height - R.image(Grfx.COW + this.thing.t).height)) {
                    this.player.state = Const.PLAY;
                    this.state = Const.STOP;
                    if (this.check()) {
                        this.addStuff();
                        this.score++;
                        this.timer += .25
                        if (this.wait2Die) {
                            this.die(this.thing.t);
                        }
                    } else {
                        this.die(this.thing.t);
                    }
                }
                break;
            case Const.RAY:
                if (this.player.state === Const.PUSH) {
                    this.state = Const.PUSH;
                    this.thing = this.stuff[this.idx];
                }
                break;
        }
    }

    die(t) {
        if (this.state === Const.PUSH) {
            this.wait2Die = true;
            return;
        }

        if (t === 2) {
            this.explosion.start(this.player.x + (this.player.img.width >> 1), this.player.y + (this.player.img.height >> 1));
        }

        this.player.state = t === 2 ? Const.EXPLODE : Const.DIE;
        this.state = Const.DIE;
        this.checkHiscore();
        this.timer = 0;
    }

    check() {
        const t = this.stuff.splice(this.idx, 1)[0];
        if (!t) return false;
        return ((nightTime && t.t === 1) || (!nightTime && t.t === 0));
    }

    draw(ctx) {
        this.clouds.draw(ctx);

        ctx.drawImage(this.floor, this.floor_x, 210);
        ctx.drawImage(this.bush, this.bush_x, 190);
        ctx.drawImage(this.waterB, this.water_x, 232 + Math.cos(this.waterY.b));
        ctx.drawImage(this.water, this.water_x, 235 + Math.cos(this.waterY.a));

        for (let s = this.stuff.length - 1; s > -1; s--) {
            const t = this.stuff[s];
            ctx.drawImage(R.image(Grfx.COW + t.t), t.x, t.y);
        }

        this.player.draw(ctx);

        const w = (Const.WIDTH >> 1) - (this.topTimer.width >> 1);
        ctx.drawImage(this.topTimer, w + 2, 11, 62, 9);
        ctx.drawImage(R.image(Grfx.TIMER), w + 2, 12, this.timer, 8);
        ctx.drawImage(R.image(Grfx.BAR), w, 10);

        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.font = "16px 'Press Start 2P'";
        ctx.fillText(`${this.score}`, Const.WIDTH >> 1, Const.HEIGHT * .2);

        if (this.state === Const.DIE) {
            ctx.font = "10px 'Press Start 2P'";
            ctx.fillText("BEST", Const.WIDTH >> 1, Const.HEIGHT * .4);
            ctx.fillText(`${this.hiscore}`, Const.WIDTH >> 1, Const.HEIGHT * .45);

            ctx.font = "8px 'Press Start 2P'";
            ctx.fillText("CLICK TO PLAY", Const.WIDTH >> 1, Const.HEIGHT * .6);
        }

        this.explosion.draw(ctx);
    }

    addStuff() {
        const t = this.stuff[this.stuff.length - 1],
            s = Math.floor(rand(0, 6) / 2);
        this.stuff.push({
            m: false,
            s: 1,
            t: s,
            y: 211 - R.image(Grfx.COW + s).height,
            x: t.x + 50
        });
    }

    start() {
        this.hiscore = parseInt(localStorage.getItem('fatfrog_cow'), 10) || 0;
        this.reset();
    }

    checkHiscore() {
        if (this.score > this.hiscore) {
            localStorage.setItem('fatfrog_cow', `${this.score}`);
            this.hiscore = this.score;
        }
    }

    input(i) {
        switch (this.state) {
            case Const.DIE:
                if (this.player.state === Const.STOP && !this.explosion.active) {
                    this.reset();
                }
                break;
            case Const.STOP:
                if (this.player.state === Const.PLAY) {
                    if (i) {
                        this.state = Const.ACC;
                        this.acc = 0;
                    } else {
                        this.getStuff();
                        if (this.idx > -1) {
                            this.state = Const.RAY;
                            this.player.shoot();
                        }
                    }
                }
                break;
        }
    }

    getStuff() {
        this.idx = -1;
        for (let t = 0; t < this.stuff.length; t++) {
            const xx = this.stuff[t].x
            if (xx > this.player.x && xx < this.player.x + this.player.img.width) {
                this.idx = t;
                this.stuff[t].m = true;
                return;
            }
        }
    }
}
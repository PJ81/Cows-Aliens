let nightTime = false;

class Game {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = Const.WIDTH * Const.SCALE;
        this.canvas.height = Const.HEIGHT * Const.SCALE;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(Const.SCALE, Const.SCALE);

        this.night = false;
        this.stars = new Stars();

        this.mid = this.canvas.width >> 1;
        this.light = .8;
        this.day = 70;

        this.lastTime = 0;
        this.accumulator = 0;
        this.deltaTime = 1 / 60;

        this.moon = R.image(Grfx.MOON);
        this.moon.yy = 180;
        this.moon.xx = -30;

        this.loop = (time) => {
            this.accumulator += (time - this.lastTime) / 1000;
            while (this.accumulator > this.deltaTime) {
                this.accumulator -= this.deltaTime;
                this.state.update(Math.min(this.deltaTime, .5));
            }

            this.lastTime = time;

            this.ctx.clearRect(0, 0, Const.WIDTH, Const.HEIGHT);
            this.canvas.style.backgroundColor = `hsl(201, 100%, ${this.day}%)`;

            this.doMoon();

            this.state.draw(this.ctx);
            requestAnimationFrame(this.loop);
        }

        this.cow = new Cow();
        this.state = this.cow;
        this.state.start();

        this.canvas.addEventListener("mousedown", (e) => {
            this.touch(e.clientX - e.srcElement.offsetLeft > this.mid);
        });
        this.canvas.addEventListener("touchstart", (e) => {
            this.touch(e.touches[0].screenX - e.srcElement.offsetLeft > this.mid);
        });

        window.addEventListener("stateChange", (e) => {
            switch (e.detail.state) {
                case Const.GAME:
                    this.state = this.cow;
                    break;
                case Const.MENU:
                    //this.state = this.menu;
                    break;
                case Const.GAMEOVER:
                    //this.state = this.go;
                    break;
            }
            this.state.start();
        });

        this.loop(0);
    }

    touch(i) {
        this.state.input(i);
    }

    doMoon() {
        this.day -= this.light * this.deltaTime;
        if (this.day < 3 || this.day > 70) {
            this.light = -this.light;
        }
        if (this.day < 30) {
            this.night = true;
            this.moon.xx += 2.2 * this.deltaTime;
            this.moon.yy -= 4.6 * this.deltaTime;

            if (this.moon.yy < -45) {
                this.stars.hide = true;
            }
            if (this.moon.yy < -96) {
                this.moon.yy = 180;
                this.moon.xx = -30;
                this.day = 30;
                this.night = false;
                this.stars.reset();
            }
        }

        if (this.night) {
            this.stars.update(this.deltaTime);
            this.stars.draw(this.ctx);
            this.ctx.drawImage(this.moon, this.moon.xx, this.moon.yy);
        }
    }
}

const R = new Resources(() => new Game());
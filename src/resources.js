

class Resources {
    constructor(cb) {
        this.images = new Array(33);
        
        Promise.all([
            (loadImage("./img/floor.png")).then((i) => {this.images[Grfx.FLOOR] = i;}),
            (loadImage("./img/ray.png")).then((i) => {this.images[Grfx.RAY] = i;}),
            (loadImage("./img/bush.png")).then((i) => {this.images[Grfx.BUSH] = i;}),
            (loadImage("./img/ship.png")).then((i) => {this.images[Grfx.ALIEN] = i;}),
            (loadImage("./img/barrel.png")).then((i) => {this.images[Grfx.BARREL] = i;}),
            (loadImage("./img/pig.png")).then((i) => {this.images[Grfx.PIG] = i;}),
            (loadImage("./img/cow.png")).then((i) => {this.images[Grfx.COW]= i;}),
            (loadImage("./img/w0.png")).then((i) => {this.images[Grfx.W0]= i;}),
            (loadImage("./img/w1.png")).then((i) => {this.images[Grfx.W1] = i;}),
            (loadImage("./img/c0.png")).then((i) => {this.images[Grfx.CLO0] = i;}),
            (loadImage("./img/c1.png")).then((i) => {this.images[Grfx.CLO1] = i;}),
            (loadImage("./img/c2.png")).then((i) => {this.images[Grfx.CLO2] = i;}),
            (loadImage("./img/c3.png")).then((i) => {this.images[Grfx.CLO3] = i;}),
            (loadImage("./img/c4.png")).then((i) => {this.images[Grfx.CLO4] = i;}),
            (loadImage("./img/bar.png")).then((i) => {this.images[Grfx.TIMER] = i;}),
            (loadImage("./img/barTop.png")).then((i) => {this.images[Grfx.BAR] = i;}),
            (loadImage("./img/barBack.png")).then((i) => {this.images[Grfx.BACKBAR] = i;}),
            (loadImage("./img/moon.png")).then((i) => {this.images[Grfx.MOON] = i;}),
            (loadImage("./img/x0.png")).then((i) => {this.images[Grfx.X0] = i;}),
            (loadImage("./img/x1.png")).then((i) => {this.images[Grfx.X1] = i;}),
            (loadImage("./img/x2.png")).then((i) => {this.images[Grfx.X2] = i;}),
            (loadImage("./img/x3.png")).then((i) => {this.images[Grfx.X3] = i;}),
            (loadImage("./img/x4.png")).then((i) => {this.images[Grfx.X4] = i;}),
            (loadImage("./img/x5.png")).then((i) => {this.images[Grfx.X5] = i;}),
            (loadImage("./img/x6.png")).then((i) => {this.images[Grfx.X6] = i;}),
            (loadImage("./img/x7.png")).then((i) => {this.images[Grfx.X7] = i;}),
            (loadImage("./img/x8.png")).then((i) => {this.images[Grfx.X8] = i;}),
            (loadImage("./img/x9.png")).then((i) => {this.images[Grfx.X9] = i;}),
            (loadImage("./img/x10.png")).then((i) => {this.images[Grfx.X10] = i;}),
            (loadImage("./img/x11.png")).then((i) => {this.images[Grfx.X11] = i;}),
            (loadImage("./img/x12.png")).then((i) => {this.images[Grfx.X12] = i;}),
            (loadImage("./img/x13.png")).then((i) => {this.images[Grfx.X13] = i;}),
            (loadImage("./img/x14.png")).then((i) => {this.images[Grfx.X14] = i;})
            
        ]).then(() => {
            this.build();
            cb();
        });
    }

    build() {
        this.images[Grfx.FLOOR] = repeatImage(this.images[Grfx.FLOOR], 3);
        this.images[Grfx.BUSH] = repeatImage(this.images[Grfx.BUSH], 3);
        this.images[Grfx.W0] = repeatImage(this.images[Grfx.W0], 3);
        this.images[Grfx.W1] = repeatImage(this.images[Grfx.W1], 3);
    }

    image(index) {
        if(index < this.images.length) {
            return this.images[index];
        }
        return null;
    }
}
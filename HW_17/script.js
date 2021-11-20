import DOM from "./DOM.js";

class Circle extends DOM {
    constructor(document, { width, height, background }) {
        super(document);
        this.width = width;
        this.height = height;
        this.background = background;
        this.div = this.document.createElement('div');
    }

    spawnCircle() {
        this.div.setAttribute('style', `
                height: ${this.height}px;
                width: ${this.width}px;
                background-color: ${this.background};
                border-radius: 50%;
            `);

        this.document.body.append(this.div);

        return this.div;
    }

    setClickAction(handler) {
        this.div.addEventListener('click', handler);
    }
}

const redCircleOptions = {
    height: '100',
    width: '100',
    background: 'red'
};

const yellowCircleOptions = {
    height: '200',
    width: '200',
    background: 'yellow'
};

const CircleFactory = {
    redCircle: (document, options) => new Circle(document, options),
    yellowCircle: (document, options) => new Circle(document, options)
};

const circleRed = CircleFactory.redCircle(document, redCircleOptions);
const circleYellow = CircleFactory.yellowCircle(document, yellowCircleOptions);

circleRed.spawnCircle();
circleYellow.spawnCircle();

circleRed.setClickAction(() => circleRed.div.style.transform = 'translateX(100px)');
circleYellow.setClickAction(() => circleYellow.div.style.transform = 'translateX(200px)');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export default class Apple {
    constructor(color, PosX, PosY,Snake,Value) {
        this.color = color;
        this.PosX = PosX;
        this.PosY = PosY;
        this.Snake = Snake;
        this.Value =Value;
    }
    create(){
        this.spawn();
        this.draw();
    }
    checkColision(){
        ((this.Snake.listeCordonnees[0].PosY == this.PosY) && (this.Snake.listeCordonnees[0].PosX == this.PosX)) ? this.Colision() : null;
    }
    Colision(){
        this.spawn();
        this.draw();
        this.Snake.isHungry += this.Value;
    }
    spawn(){
        let goodPos = true
        
        function isPositionValid(X, Y, snakeCoordinates) {
            return snakeCoordinates.some(coord => coord.PosY === Y && coord.PosX === X);
        }
        
        do {
            let X = Math.floor(Math.random() * 80);
            let Y = Math.floor(Math.random() * 80);
        
            goodPos = !isPositionValid(X, Y, this.Snake.listeCordonnees);
        
            if (goodPos) {
                this.PosX = X;
                this.PosY = Y;
            }
        } while (!goodPos);
        
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.PosX*10, this.PosY*10, 10, 10);
    }
}
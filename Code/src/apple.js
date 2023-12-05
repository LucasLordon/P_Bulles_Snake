const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export default class Apple {
    constructor(color, PosX, PosY,Snake,Value,GAMESQUARESIZE,GAMEGRIDWITHSIZE,GAMEGRIDHEIGHTSIZE) {
        this.color = color;
        this.PosX = PosX;
        this.PosY = PosY;
        this.Snake = Snake;
        this.Value =Value;
        this.GAMESQUARESIZE=GAMESQUARESIZE;
        this.GAMEGRIDWITHSIZE=GAMEGRIDWITHSIZE;
        this.GAMEGRIDHEIGHTSIZE=GAMEGRIDHEIGHTSIZE;
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
        this.Snake.score+=this.Value;
        this.Snake.isHungry += this.Value;
    }
    spawn(){
        let goodPos = true
        
        function isPositionValid(X, Y, snakeCoordinates) {
            return snakeCoordinates.some(coord => coord.PosY === Y && coord.PosX === X);
        }
        
        do {
            let X = Math.floor(Math.random() * this.GAMEGRIDWITHSIZE);
            let Y = Math.floor(Math.random() * this.GAMEGRIDHEIGHTSIZE);
        
            goodPos = !isPositionValid(X, Y, this.Snake.listeCordonnees);
        
            if (goodPos) {
                this.PosX = X;
                this.PosY = Y;
            }
        } while (!goodPos);
        
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.PosX*this.GAMESQUARESIZE, this.PosY*this.GAMESQUARESIZE, this.GAMESQUARESIZE, this.GAMESQUARESIZE);
    }
}
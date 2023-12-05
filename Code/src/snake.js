import '../src/main';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export default class Snake {
    constructor(color, length, PosX, PosY, snakeDirection,isHungry,GAMESQUARESIZE,GAMEGRIDWITHSIZE,GAMEGRIDHEIGHTSIZE,DEFAULTSCORE,snakeCanChangeDirection,SNAKEDEFAULTDOWNCONTROL,SNAKEDEFAULTUPCONTROL,SNAKEDEFAULTLEFTCONTROL,SNAKEDEFAULTRIGHTCONTROL) {
        this.color = color;
        this.length = length;
        this.PosX = PosX;
        this.PosY = PosY;
        this.listeCordonnees = [];
        this.direction = snakeDirection;
        this.isHungry=isHungry;
        this.GAMESQUARESIZE=GAMESQUARESIZE;
        this.GAMEGRIDWITHSIZE=GAMEGRIDWITHSIZE;
        this.GAMEGRIDHEIGHTSIZE=GAMEGRIDHEIGHTSIZE;
        this.score=DEFAULTSCORE;
        this.canChangeDirection=snakeCanChangeDirection;
        this.SNAKEDEFAULTDOWNCONTROL=SNAKEDEFAULTDOWNCONTROL;
        this.SNAKEDEFAULTUPCONTROL=SNAKEDEFAULTUPCONTROL;
        this.SNAKEDEFAULTLEFTCONTROL=SNAKEDEFAULTLEFTCONTROL;
        this.SNAKEDEFAULTRIGHTCONTROL=SNAKEDEFAULTRIGHTCONTROL;
    }
    initialSnake() {
        this.listeCordonnees = Array.from({ length: this.length }, (_, i) => ({ PosX: this.PosX - i, PosY: this.PosY }));
    }

    update() {
        this.move();
        (this.isHungry>0)?this.isHungry--: undefined;
    }
    movehead(){
        switch (this.direction) {
            case 1:
                this.listeCordonnees[0].PosY -= 1;
                break;
            case 2:
                this.listeCordonnees[0].PosX += 1;
                break;
            case 3:
                this.listeCordonnees[0].PosY += 1;
                break;
            case 4:
                this.listeCordonnees[0].PosX -= 1;
                break;
        }
    }
    move() {
        this.listeCordonnees.unshift({PosX: this.listeCordonnees[0].PosX,PosY: this.listeCordonnees[0].PosY})
        this.movehead();
        (this.isHungry === 0) ? this.listeCordonnees.pop() : undefined;

    }
    draw(){
        this.listeCordonnees.forEach(coord => {
            ctx.fillStyle = 'red';
            ctx.fillRect(coord.PosX * this.GAMESQUARESIZE, coord.PosY * this.GAMESQUARESIZE, this.GAMESQUARESIZE, this.GAMESQUARESIZE);
          });          
        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'green';
        ctx.fillRect(this.listeCordonnees[0].PosX*this.GAMESQUARESIZE, this.listeCordonnees[0].PosY*this.GAMESQUARESIZE, this.GAMESQUARESIZE, this.GAMESQUARESIZE);
    }
    
    checkIntercection(){
        const[head,...body] = this.listeCordonnees;
        return body.some((n1)=>(n1.PosX === head.PosX && n1.PosY === head.PosY))||(!this.checkBorder())
    }
    checkBorder(){
        return (
            (this.listeCordonnees[0].PosX >= 0 && this.listeCordonnees[0].PosX < this.GAMEGRIDWITHSIZE) &&
            (this.listeCordonnees[0].PosY >= 0 && this.listeCordonnees[0].PosY < this.GAMEGRIDHEIGHTSIZE)
        ); 
    }
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export default class Snake {
    constructor(color,bodyColor, length, PosX, PosY, snakeDirection,isHungry,GAMESQUARESIZE,GAMEGRIDWITHSIZE,GAMEGRIDHEIGHTSIZE,DEFAULTSCORE,snakeCanChangeDirection,SNAKEDEFAULTDOWNCONTROL,SNAKEDEFAULTUPCONTROL,SNAKEDEFAULTLEFTCONTROL,SNAKEDEFAULTRIGHTCONTROL) {
        this.color = color;
        this.bodyColor = bodyColor;
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
            ctx.fillStyle = this.bodyColor;
            ctx.fillRect(coord.PosX * this.GAMESQUARESIZE, coord.PosY * this.GAMESQUARESIZE, this.GAMESQUARESIZE, this.GAMESQUARESIZE);
          });          
        ctx.fillStyle = this.color;
        ctx.fillRect(this.listeCordonnees[0].PosX*this.GAMESQUARESIZE, this.listeCordonnees[0].PosY*this.GAMESQUARESIZE, this.GAMESQUARESIZE, this.GAMESQUARESIZE);
    }
    
    checkIntercection(){
        const[head,...body] = this.listeCordonnees;
        return body.some((n1)=>(n1.PosX === head.PosX && n1.PosY === head.PosY))||(!this.checkBorder())
    }
    checkSnakeIntercection(snake1, snake2) {
        const [head1, ...body1] = snake1.listeCordonnees;
        const [head2, ...body2] = snake2.listeCordonnees;
    
        const head1CollidesWithSnake2 = body2.some(n => (n.PosX === head1.PosX && n.PosY === head1.PosY));
    
        const head2CollidesWithSnake1 = body1.some(n => (n.PosX === head2.PosX && n.PosY === head2.PosY));
    
        return head1CollidesWithSnake2 || head2CollidesWithSnake1;
    }
    
    checkBorder(){
        return (
            (this.listeCordonnees[0].PosX >= 0 && this.listeCordonnees[0].PosX < this.GAMEGRIDWITHSIZE) &&
            (this.listeCordonnees[0].PosY >= 0 && this.listeCordonnees[0].PosY < this.GAMEGRIDHEIGHTSIZE)
        ); 
    }
}

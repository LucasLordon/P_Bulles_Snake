const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export default class Snake {
    constructor(color, length, PosX, PosY, snakeDirection,isHungry) {
        this.color = color;
        this.length = length;
        this.PosX = PosX;
        this.PosY = PosY;
        this.listeCordonnees = [];
        this.snakeDirection = snakeDirection;
        this.isHungry=isHungry;
    }

    initialSnake() {
        this.initialSnakeCord();
    }

    initialSnakeCord() {
        // Ajoute les coordonnées au serpent
        for (let i = 0; i < this.length; i++) {
            this.listeCordonnees.push({ PosX: this.PosX - i, PosY: this.PosY });
        }
        
    }

    update() {
        this.move();
        if(this.isHungry>0)
        {
        this.isHungry--;
        }
        
    }

    move() {
        this.listeCordonnees.unshift({PosX: this.listeCordonnees[0].PosX,PosY: this.listeCordonnees[0].PosY})
        switch (this.snakeDirection) {
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
        if(this.isHungry==0)
        {
        
            this.listeCordonnees.pop();
        }
    }
    draw(){
        for (let i = this.listeCordonnees.length - 1; i > 0; i--) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.listeCordonnees[i].PosX*10, this.listeCordonnees[i].PosY*10, 10, 10);
        }
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.listeCordonnees[0].PosX*10, this.listeCordonnees[0].PosY*10, 10, 10);
    }
    
    checkIntercection(){
        const[head,...body] = this.listeCordonnees;
        return body.some((n1)=>(n1.PosX === head.PosX && n1.PosY === head.PosY))
    }
}

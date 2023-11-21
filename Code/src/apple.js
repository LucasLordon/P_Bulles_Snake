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
            if((this.Snake.listeCordonnees[0].PosY == this.PosY)&(this.Snake.listeCordonnees[0].PosX == this.PosX)){        
                this.Colision();
            }
    }
    Colision(){
        this.spawn();
        this.draw();
        this.Snake.isHungry = this.Snake.isHungry+this.Value;
        

    }
    spawn(){
        let goodPos = true
        do{
            let X = Math.floor(Math.random() * 80);
            let Y = Math.floor(Math.random() * 80);

            for (let i = this.Snake.listeCordonnees.length; i > 0; i--) {
                if((this.Snake.listeCordonnees[i-1].PosY == Y)&(this.Snake.listeCordonnees[i-1].PosX == X)){
                    goodPos=false;
                }
                else
                {
                    this.PosX = X;
                    this.PosY= Y;
                }
            }
        }while (goodPos == false);

    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.PosX*10, this.PosY*10, 10, 10);
    }
}

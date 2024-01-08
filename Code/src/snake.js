// snake.js

// Obtient le canvas et son "contexte"
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Classe Snake
export default class Snake {
    constructor(color, bodyColor, length, PosX, PosY, snakeDirection, isHungry, GAMESQUARESIZE, GAMEGRIDWITHSIZE, GAMEGRIDHEIGHTSIZE, DEFAULTSCORE, snakeCanChangeDirection, SNAKEDEFAULTDOWNCONTROL, SNAKEDEFAULTUPCONTROL, SNAKEDEFAULTLEFTCONTROL, SNAKEDEFAULTRIGHTCONTROL, freez) {
        // Initialisation des propriétés
        this.color = color; // Couleur de la tête du serpent
        this.bodyColor = bodyColor; // Couleur du corps du serpent
        this.length = length; // Longueur initiale du serpent
        this.PosX = PosX; // Position X du serpent
        this.PosY = PosY; // Position Y du serpent
        this.listeCordonnees = []; //liste de cordonees contenant les position du serpent
        this.direction = snakeDirection; //Direction du serpent (1=UP / 2=RIGHT / 3=DOWN / 4=LEFT)
        this.isHungry = isHungry; // Niveau de faim initial du serpent
        this.GAMESQUARESIZE = GAMESQUARESIZE; //Taille d'un carré du jeu
        this.GAMEGRIDWITHSIZE = GAMEGRIDWITHSIZE; // Nombre de carrés en largeur
        this.GAMEGRIDHEIGHTSIZE = GAMEGRIDHEIGHTSIZE; // Nombre de carrés en hauteur
        this.score = DEFAULTSCORE; //score du serpent
        this.canChangeDirection = snakeCanChangeDirection;// Autorisation de changer de direction
        this.SNAKEDEFAULTDOWNCONTROL = SNAKEDEFAULTDOWNCONTROL; // Touche de contrôle vers le bas
        this.SNAKEDEFAULTUPCONTROL = SNAKEDEFAULTUPCONTROL; // Touche de contrôle vers le haut
        this.SNAKEDEFAULTLEFTCONTROL = SNAKEDEFAULTLEFTCONTROL; // Touche de contrôle vers la gauche
        this.SNAKEDEFAULTRIGHTCONTROL = SNAKEDEFAULTRIGHTCONTROL; // Touche de contrôle vers la droite
        this.freez = freez; //definit si le serpent est en vie
    }

    // Initialisation du serpent
    initial() {
        this.listeCordonnees = Array.from({ length: this.length }, (_, i) => ({ PosX: this.PosX - i, PosY: this.PosY }));
    }

    // Met à jour la position du serpent
    update() {
        //serpent mort ?
        if (this.freez == false) { 
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            this.move();
            (this.isHungry > 0) ? this.isHungry-- : undefined;//si le serpent a faim, il mange
        }
        console.log("bbbbbbbbbbbbbbbbbbbbbbb")
    }

    // Déplace la tête du serpent en fonction de sa direction
    movehead() {
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

    // Déplace le serpent
    move() {
        this.listeCordonnees.unshift({ PosX: this.listeCordonnees[0].PosX, PosY: this.listeCordonnees[0].PosY }) //crée la nouvelle tete
        this.movehead(); //bouge la nouvelle tete
        (this.isHungry === 0) ? this.listeCordonnees.pop() : undefined;//suprime la queu du serpent si il a faim (isHungry = 0)
    }

    // Dessine le serpent sur le canvas (tete d'une couleur et corp d'une autre)
    draw() {
        //dessine le corp
        this.listeCordonnees.forEach(coord => {
            ctx.fillStyle = this.bodyColor;
            ctx.fillRect(coord.PosX * this.GAMESQUARESIZE, coord.PosY * this.GAMESQUARESIZE, this.GAMESQUARESIZE, this.GAMESQUARESIZE);
        });
        //dessine la tête
        ctx.fillStyle = this.color;
        ctx.fillRect(this.listeCordonnees[0].PosX * this.GAMESQUARESIZE, this.listeCordonnees[0].PosY * this.GAMESQUARESIZE, this.GAMESQUARESIZE, this.GAMESQUARESIZE);
    }

    // Vérifie les collisions avec lui-même ou les bords
    checkIntercection() {
        const [head, ...body] = this.listeCordonnees;
        //si le serpent ce rentre dedant ou si il rentre dans la bordure
        if (body.some((n1) => (n1.PosX === head.PosX && n1.PosY === head.PosY)) || (!this.checkBorder())) {
            this.freez = true;//il meurt
        }
    }

    // Vérifie les collisions entre deux serpents
    checkSnakeIntercection(snake1, snake2) {
        const [head1, ...body1] = snake1.listeCordonnees;
        const [head2, ...body2] = snake2.listeCordonnees;

        //tete du serpent 1 dans corps du serpent 2
        const head1CollidesWithSnake2 = body2.some(n => (n.PosX === head1.PosX && n.PosY === head1.PosY));

        //tete du serpent 2 dans corps du serpent 1
        const head2CollidesWithSnake1 = body1.some(n => (n.PosX === head2.PosX && n.PosY === head2.PosY));

        if (head1CollidesWithSnake2) {
            snake1.freez = true;
        }
        if (head2CollidesWithSnake1) {
            snake2.freez = true;
        }
        return head1CollidesWithSnake2 || head2CollidesWithSnake1;
    }

    // Vérifie si le serpent atteint les bords du canvas
    checkBorder() {
        return (
            (this.listeCordonnees[0].PosX >= 0 && this.listeCordonnees[0].PosX < this.GAMEGRIDWITHSIZE) &&
            (this.listeCordonnees[0].PosY >= 0 && this.listeCordonnees[0].PosY < this.GAMEGRIDHEIGHTSIZE)
        );
    }
}

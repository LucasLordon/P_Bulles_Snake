// apple.js

// Obtient le canvas et son contexte
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Classe Apple
export default class Apple {
    constructor(color, PosX, PosY, snakes, Value, GAMESQUARESIZE, GAMEGRIDWITHSIZE, GAMEGRIDHEIGHTSIZE) {
        // Initialisation des propriétés
        this.color = color;
        this.PosX = PosX;
        this.PosY = PosY;
        this.snakes = snakes;
        this.Value = Value;
        this.GAMESQUARESIZE = GAMESQUARESIZE;
        this.GAMEGRIDWITHSIZE = GAMEGRIDWITHSIZE;
        this.GAMEGRIDHEIGHTSIZE = GAMEGRIDHEIGHTSIZE;
    }

    // Crée et dessine une nouvelle pomme
    create() {
        this.spawn();
        this.draw();
    }

    // Vérifie les collisions avec le serpent
    checkCollision(snake) {
        ((snake.listeCordonnees[0].PosY == this.PosY) && (snake.listeCordonnees[0].PosX == this.PosX)) ? this.Colision(snake) : null;
    }

    // Réagit en cas de collision avec le serpent
    Colision(snake) {
        this.spawn();
        this.draw();
        snake.score += this.Value;
        snake.isHungry += this.Value;
    }

    // Place la pomme à une position aléatoire qui ne chevauche pas le serpent
    spawn() {
        let goodPos = true

        function isPositionValid(X, Y, snakeCoordinates) {
            return snakeCoordinates.some(coord => coord.PosY === Y && coord.PosX === X);
        }

        do {
            let X = Math.floor(Math.random() * this.GAMEGRIDWITHSIZE);
            let Y = Math.floor(Math.random() * this.GAMEGRIDHEIGHTSIZE);

            goodPos = this.snakes.every(snake => !isPositionValid(X, Y, snake.listeCordonnees));

            if (goodPos) {
                this.PosX = X;
                this.PosY = Y;
            }
        } while (!goodPos);

    }

    // Dessine la pomme sur le canvas
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.PosX * this.GAMESQUARESIZE, this.PosY * this.GAMESQUARESIZE, this.GAMESQUARESIZE, this.GAMESQUARESIZE);
    }
}

// apple.js

// Obtient le canvas et son contexte
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Classe Apple
export default class Apple {
    constructor(color, PosX, PosY, snakes, Value, GAMESQUARESIZE, GAMEGRIDWITHSIZE, GAMEGRIDHEIGHTSIZE) {
        // Initialisation des propriétés
        this.color = color;//couleur de la pomme
        this.PosX = PosX; // Position X de la pomme
        this.PosY = PosY; // Position y de la pomme
        this.snakes = snakes; //Liste contenant tout les serpents
        this.Value = Value;//valeur de la pomme(de combien la pomme nouris les serpent)
        this.GAMESQUARESIZE = GAMESQUARESIZE;//Taille d'un carré du jeu
        this.GAMEGRIDWITHSIZE = GAMEGRIDWITHSIZE;// Nombre de carrés en largeur
        this.GAMEGRIDHEIGHTSIZE = GAMEGRIDHEIGHTSIZE;// Nombre de carrés en hauteur
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

    // Place la pomme à une position aléatoire qui ne chevauche pas les serpents
    spawn() {
        let goodPos = true

        function isPositionValid(X, Y, snakeCoordinates) {
            return snakeCoordinates.some(coord => coord.PosY === Y && coord.PosX === X);
        }

        do {
            let X = Math.floor(Math.random() * this.GAMEGRIDWITHSIZE);
            let Y = Math.floor(Math.random() * this.GAMEGRIDHEIGHTSIZE);

            goodPos = this.snakes.every(snake => !isPositionValid(X, Y, snake.listeCordonnees));

            //definit la nouvelle position
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





import '../css/style.css';
import '../src/apple';
import Snake from '../src/snake';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const gameGridSize = 15;

const snakeDefaultLength = 3;
const snakeDefaultColor = "blue";
const snakeDefaultPosX = 5;
const snakeDefaultPosY = 5;
let snakeDirection = 2; // 1=UP / 2=RIGHT / 3=DOWN / 4=LEFT

let gameArrayCord = [];
for (let i = 0; i < gameGridSize; i++) {
    gameArrayCord[i] = [];
    for (let j = 0; j < gameGridSize; j++) {
        gameArrayCord[i][j] = 0;
    }
}

let snake = new Snake(snakeDefaultColor,snakeDefaultLength,snakeDefaultPosX,snakeDefaultPosY,snakeDirection);

snake.initialSnake();

const move = () => {

  // Dessine la grille de jeu
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 800);
  snake.update();
  snake.draw();
  // Rafraichit à chaque seconde
  setTimeout(() => {
    requestAnimationFrame(move);
  }, 100);
  console.log(snake.listeCordonnees);
};

window.addEventListener("keydown", event => {
  console.log(event.key);
  switch (event.key) {
    case "ArrowDown":
      snake.snakeDirection =3;
        break;
    case "ArrowUp":
      snake.snakeDirection = 1;
      break;
    case "ArrowLeft":
      snake.snakeDirection = 4;
      break;
    case "ArrowRight":
      snake.snakeDirection =2;
      break;
  }
});

requestAnimationFrame(move);









// /**
//  * Méthode vérifiant s'il y a une collision entre deux rectangles.
//  * @param {number} X1 - Position en X du rectangle n°1 (coin supérieur gauche)
//  * @param {number} Y1 - Position en Y du rectangle n°1 (coin supérieur gauche)
//  * @param {number} W1 - Largeur du rectangle n°1 (rectangle, vers la droite de posY)
//  * @param {number} H1 - Hauteur du rectangle n°1 (rectangle, vers le bas de posX)
//  * @param {number} X2 - Position en X du rectangle n°2 (coin supérieur gauche)
//  * @param {number} Y2 - Position en Y du rectangle n°2 (coin supérieur gauche)
//  * @param {number} W2 - Largeur du rectangle n°2 (rectangle, vers la droite de posY)
//  * @param {number} H2 - Hauteur du rectangle n°2 (rectangle, vers le bas de posX)
//  * @returns {boolean} - Indique s'il y a une intersection entre les deux rectangles
//  */
// function isAnIntersection(X1, Y1, W1, H1, X2, Y2, W2, H2) {
//   return !(X1 + W1 < X2 || X2 + W2 < X1 || Y1 + H1 < Y2 || Y2 + H2 < Y1);
// }

// Exemple d'utilisation :
// const intersection = isAnIntersection(0, 0, 50, 50, 30, 30, 50, 50);
// console.log(intersection); // Affiche true ou false en fonction de l'intersection

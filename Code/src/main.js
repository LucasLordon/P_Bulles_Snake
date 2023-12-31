//////////////////Import//////////////////

import '../css/style.css'; // Importe le fichier de style CSS
import './apple'; // Importe le module apple.js
import Apple from './apple'; // Importe la classe Apple du module apple.js
import Snake from './snake'; // Importe la classe Snake du module snake.js

//////////////////Constant//////////////////

//CANVAS
const canvas = document.querySelector('canvas');
const CTX = canvas.getContext('2d');
//GRID
const GRID_BACK_GROUND_COLOR = 'black'; // Couleur de fond de la grille
const GRID_WITH = canvas.width; // Largeur de la grille
const GRID_HEIGHT = canvas.height; // Hauteur de la grille
//GAME
const GAME_SQUARE_SIZE = 50; // Taille d'un carré du jeu
const GAME_SPEED = 200; // Vitesse du jeu en millisecondes
const GAME_GRID_WITH_SIZE = GRID_WITH / GAME_SQUARE_SIZE; // Nombre de carrés en largeur
const GAME_GRID_HEIGHT_SIZE = GRID_HEIGHT / GAME_SQUARE_SIZE; // Nombre de carrés en hauteur
//SNAKE
const SNAKE_DEFAULT_LENGTH = 3;
const SNAKE_DEFAULT_HUNGER = 0;
const SNAKE_DEFAULT_COLOR = "blue";
const SNAKE_DEFAULT_BODY_COLOR = "red";
const SNAKE_DEFAULT_POS_X = 3;
const SNAKE_DEFAULT_POS_Y = 3;
const SNAKE_DEFAULT_DIRECTION = 3;// 1=UP / 2=RIGHT / 3=DOWN / 4=LEFT
const SNAKE_DEFAULT_CAN_CHANGE_DIRECTION = true;
const SNAKE_DEFAULT_SCORE = 0;
const SNAKE_DEFAULT_DOWN_CONTROL = "ArrowDown"
const SNAKE_DEFAULT_UP_CONTROL = "ArrowUp"
const SNAKE_DEFAULT_LEFT_CONTROL = "ArrowLeft"
const SNAKE_DEFAULT_RIGHT_CONTROL = "ArrowRight"

//////////////////Variables//////////////////

let firstTime = true
let gameOver = false

//////////////////Game objects//////////////////

let snakes = [];
let cpttest = 0
// Création des serpents en utilisant la configuration
let numberOfSnakes = 1;
const snakeConfigs = [
  {
    color: SNAKE_DEFAULT_COLOR,
    bodyColor: SNAKE_DEFAULT_BODY_COLOR,
    length: SNAKE_DEFAULT_LENGTH,
    posX: SNAKE_DEFAULT_POS_X,
    posY: SNAKE_DEFAULT_POS_Y,
    direction: SNAKE_DEFAULT_DIRECTION,
    hunger: SNAKE_DEFAULT_HUNGER,
    squareSize: GAME_SQUARE_SIZE,
    gridWidth: GAME_GRID_WITH_SIZE,
    gridHeight: GAME_GRID_HEIGHT_SIZE,
    score: SNAKE_DEFAULT_SCORE,
    canChangeDirection: SNAKE_DEFAULT_CAN_CHANGE_DIRECTION,
    downControl: SNAKE_DEFAULT_DOWN_CONTROL,
    upControl: SNAKE_DEFAULT_UP_CONTROL,
    leftControl: SNAKE_DEFAULT_LEFT_CONTROL,
    rightControl: SNAKE_DEFAULT_RIGHT_CONTROL,
    freez: false,
  }
];



for (let i = 0; i < numberOfSnakes; i++) {
  let newSnake = new Snake(
    snakeConfigs[i].color,
    snakeConfigs[i].bodyColor,
    snakeConfigs[i].length,
    snakeConfigs[i].posX,
    snakeConfigs[i].posY,
    snakeConfigs[i].direction,
    snakeConfigs[i].hunger,
    snakeConfigs[i].squareSize,
    snakeConfigs[i].gridWidth,
    snakeConfigs[i].gridHeight,
    snakeConfigs[i].score,
    snakeConfigs[i].canChangeDirection,
    snakeConfigs[i].downControl,
    snakeConfigs[i].upControl,
    snakeConfigs[i].leftControl,
    snakeConfigs[i].rightControl,
    snakeConfigs[i].freez
  );
  snakes.push(newSnake);
}

let apple = new Apple('orange', 0, 0, snakes, 1, GAME_SQUARE_SIZE, GAME_GRID_WITH_SIZE, GAME_GRID_HEIGHT_SIZE)

//////////////////Program//////////////////

snakes.forEach(snake => {
  snake.initial();
});

const move = () => {
  for (let i = 0; i < numberOfSnakes; i++) {
    document.getElementById("Score").innerHTML = "Score Snake : " + snakes[0].score;
    snakes[i].canChangeDirection = true;
    snakes[i].update();
    console.log("not--------------------------- er")
    apple.checkCollision(snakes[i]);
    snakes[i].checkIntercection() && !cpttest == 0 ?
    (console.log("not er"),gameOver = true) : (console.log("error"),undefined);

  }

  !gameOver
  console.log("not er1")
    ? (CTX.fillStyle = GRID_BACK_GROUND_COLOR,
      CTX.fillRect(0, 0, GRID_WITH, GRID_HEIGHT),console.log("notsss er"),
      firstTime
        ? (apple.create(), firstTime = false)
        : snakes.forEach(snake => snake.draw()),
      apple.draw(), cpttest++) : !cpttest == 0 ? location.reload() : console.log("noasdddddddddtsss er");
};

setInterval(move, GAME_SPEED);

window.addEventListener("keydown", event => {
  snakes.forEach(snake => {
    if (snake.canChangeDirection == true) {
      switch (event.key) {
        case snake.SNAKEDEFAULTDOWNCONTROL:
          snake.direction = snake.direction !== 1 ? 3 : snake.direction;
          snake.canChangeDirection = false;
          break;
        case snake.SNAKEDEFAULTUPCONTROL:
          snake.direction = snake.direction !== 3 ? 1 : snake.direction;
          snake.canChangeDirection = false;
          break;
        case snake.SNAKEDEFAULTLEFTCONTROL:
          snake.direction = snake.direction !== 2 ? 4 : snake.direction;
          snake.canChangeDirection = false;
          break;
        case snake.SNAKEDEFAULTRIGHTCONTROL:
          snake.direction = snake.direction !== 4 ? 2 : snake.direction;
          snake.canChangeDirection = false;
          break;
      }
    }
  });
});

requestAnimationFrame(move);
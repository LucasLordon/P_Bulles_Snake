//////////////////Import//////////////////

import '../css/style.css';
import './apple';
import Apple from './apple';
import Snake from './snake';

//////////////////Constant//////////////////

  //CANVAS
const canvas = document.querySelector('canvas');
const CTX = canvas.getContext('2d');
  //GRID
const GRID_BACK_GROUND_COLOR = 'black';
const GRID_WITH = canvas.width;
const GRID_HEIGHT = canvas.height;
  //GAME
const GAME_SQUARE_SIZE = 50;
const GAME_SPEED = 200;
const GAME_GRID_WITH_SIZE = GRID_WITH/GAME_SQUARE_SIZE;
const GAME_GRID_HEIGHT_SIZE = GRID_HEIGHT/GAME_SQUARE_SIZE;
  //SNAKE
const SNAKE_DEFAULT_LENGTH = 3;
const SNAKE_DEFAULT_HUNGER = 0;
const SNAKE_DEFAULT_COLOR = "blue";
const SNAKE_DEFAULT_BODY_COLOR = "red";
const SNAKE_DEFAULT_POS_X = 0;
const SNAKE_DEFAULT_POS_Y = 0;
const SNAKE_DEFAULT_DIRECTION = 2;// 1=UP / 2=RIGHT / 3=DOWN / 4=LEFT
const SNAKE_DEFAULT_CAN_CHANGE_DIRECTION = true;
const SNAKE_DEFAULT_SCORE = 0;
const SNAKE_DEFAULT_DOWN_CONTROL = "ArrowDown"
const SNAKE_DEFAULT_UP_CONTROL = "ArrowUp"
const SNAKE_DEFAULT_LEFT_CONTROL = "ArrowLeft"
const SNAKE_DEFAULT_RIGHT_CONTROL = "ArrowRight"

//////////////////Variables//////////////////

let firstTime=true
let gameOver = false
let player1Score = 0;
let player2Score = 0;

//////////////////Game objects//////////////////

let snakes = [];
let numberOfSnakes = 2; // Set the number of snakes you want
let cpttest = 0


const snakeConfigs = [
  {
    color: SNAKE_DEFAULT_COLOR,
    bodyColor:"red",
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
  },
  {
    color: "yellow",
    bodyColor:"green",
    length: SNAKE_DEFAULT_LENGTH,
    posX: 23,
    posY: 23,
    direction: 4,
    hunger: SNAKE_DEFAULT_HUNGER,
    squareSize: GAME_SQUARE_SIZE,
    gridWidth: GAME_GRID_WITH_SIZE,
    gridHeight: GAME_GRID_HEIGHT_SIZE,
    score: SNAKE_DEFAULT_SCORE,
    canChangeDirection: SNAKE_DEFAULT_CAN_CHANGE_DIRECTION,
    downControl: "s",
    upControl: "w",
    leftControl: "a",
    rightControl: "d",
  },
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
    snakeConfigs[i].rightControl
  );
  snakes.push(newSnake);
}

let apple = new Apple('orange',0,0,snakes,1,GAME_SQUARE_SIZE,GAME_GRID_WITH_SIZE,GAME_GRID_HEIGHT_SIZE)

//////////////////Program//////////////////

snakes.forEach(snake => {
  snake.initial();
});

const move = () => {
  for (let i = 0; i < numberOfSnakes; i++) {
    document.getElementById("Score").innerHTML = "Score Snake n°1 : " + snakes[0].score + "  |  Score Snake n°2 : " + snakes[1].score;
    snakes[i].canChangeDirection = true;
    snakes[i].update();
    apple.checkCollision(snakes[i]);
    (snakes[i].checkSnakeIntercection(snakes[0],snakes[1])||snakes[i].checkIntercection())&&!cpttest==0?
    gameOver = true:undefined;

  }

  !gameOver
    ? (CTX.fillStyle = GRID_BACK_GROUND_COLOR,
      CTX.fillRect(0, 0, GRID_WITH, GRID_HEIGHT),
      firstTime
        ? (apple.create(), firstTime = false)
        : snakes.forEach(snake => snake.draw()),
        apple.draw(),cpttest++): !cpttest==0?location.reload():console.log("1")
    // : location.reload();
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
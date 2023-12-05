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

//////////////////Game objects//////////////////

let snake = new Snake(SNAKE_DEFAULT_COLOR,SNAKE_DEFAULT_LENGTH,SNAKE_DEFAULT_POS_X,SNAKE_DEFAULT_POS_Y,SNAKE_DEFAULT_DIRECTION,SNAKE_DEFAULT_HUNGER,GAME_SQUARE_SIZE,GAME_GRID_WITH_SIZE,GAME_GRID_HEIGHT_SIZE,SNAKE_DEFAULT_SCORE,SNAKE_DEFAULT_CAN_CHANGE_DIRECTION,SNAKE_DEFAULT_DOWN_CONTROL,SNAKE_DEFAULT_UP_CONTROL,SNAKE_DEFAULT_LEFT_CONTROL,SNAKE_DEFAULT_RIGHT_CONTROL);
let apple = new Apple('orange',0,0,snake,1,GAME_SQUARE_SIZE,GAME_GRID_WITH_SIZE,GAME_GRID_HEIGHT_SIZE)

//////////////////Program//////////////////

snake.initialSnake();

const move = () => {
  console.log(snake.score)
  document.getElementById("Score").innerHTML="Score : "+snake.score;
  snake.canChangeDirection=true;
  snake.update();
  apple.checkColision();
  gameOver=snake.checkIntercection();
  !gameOver
  ? (CTX.fillStyle = GRID_BACK_GROUND_COLOR,
     CTX.fillRect(0, 0, GRID_WITH, GRID_HEIGHT),
     firstTime ? (apple.create(), firstTime = false, console.log(GAME_GRID_WITH_SIZE), console.log(GAME_GRID_HEIGHT_SIZE)) : 
     snake.draw(),
     apple.draw())
  : location.reload();

};
  setInterval(move, GAME_SPEED);
  window.addEventListener("keydown", event => {
    if(snake.canChangeDirection==true){
    
      switch (event.key) {
      case snake.SNAKEDEFAULTDOWNCONTROL:
        snake.direction = (snake.direction !== 1) ? 3 : snake.direction;
        snake.canChangeDirection=false;
        break;
      case snake.SNAKEDEFAULTUPCONTROL:
        snake.direction = (snake.direction !== 3) ? 1 : snake.direction;
        snake.canChangeDirection=false;
        break;
      case snake.SNAKEDEFAULTLEFTCONTROL:
        snake.direction = (snake.direction !== 2) ? 4 : snake.direction;
        snake.canChangeDirection=false;
        break;
      case snake.SNAKEDEFAULTRIGHTCONTROL:
        snake.direction = (snake.direction !== 4) ? 2 : snake.direction;
        snake.canChangeDirection=false;
        break;
      } 
    }

});

requestAnimationFrame(move);

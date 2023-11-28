import '../css/style.css';
import '../src/apple';
import Apple from '../src/apple';
import Snake from '../src/snake';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const GRIDWITH = canvas.width;
const GRIDHEIGHT = canvas.height;

const gameGridSize = 15;
const snakeDefaultLength = 3;
const snakeDefaultColor = "blue";
const snakeDefaultPosX = 5;
const snakeDefaultPosY = 5;
let snakeDirection = 2; // 1=UP / 2=RIGHT / 3=DOWN / 4=LEFT
let firstTime=true
let gameOver = false


let snake = new Snake(snakeDefaultColor,snakeDefaultLength,snakeDefaultPosX,snakeDefaultPosY,snakeDirection,10);
let apple = new Apple('orange',0,0,snake,5)

snake.initialSnake();

const move = () => {
  snake.update();
  apple.checkColision();
  gameOver=snake.checkIntercection();
  !gameOver
  ? (ctx.fillStyle = 'black',
     ctx.fillRect(0, 0, 800, 800),
     firstTime ? (apple.create(), firstTime = false, console.log(GRIDHEIGHT), console.log(GRIDWITH)) : 
     snake.draw(),
     apple.draw())
  : location.reload();

};
  setInterval(move, 200);
window.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowDown":
      snake.snakeDirection = (snake.snakeDirection !== 1) ? 3 : snake.snakeDirection;
      break;
    case "ArrowUp":
      snake.snakeDirection = (snake.snakeDirection !== 3) ? 1 : snake.snakeDirection;
      break;
    case "ArrowLeft":
      snake.snakeDirection = (snake.snakeDirection !== 2) ? 4 : snake.snakeDirection;
      break;
    case "ArrowRight":
      snake.snakeDirection = (snake.snakeDirection !== 4) ? 2 : snake.snakeDirection;
      break;
  }
});

requestAnimationFrame(move);

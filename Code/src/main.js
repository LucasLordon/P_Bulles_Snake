import '../css/style.css';
import '../src/apple';
import Apple from '../src/apple';
import Snake from '../src/snake';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const gameGridSize = 15;

const snakeDefaultLength = 3;
const snakeDefaultColor = "blue";
const snakeDefaultPosX = 5;
const snakeDefaultPosY = 5;
let snakeDirection = 2; // 1=UP / 2=RIGHT / 3=DOWN / 4=LEFT
let firstTime=true
let gameArrayCord = [];
let gameOver = false
for (let i = 0; i < gameGridSize; i++) {
    gameArrayCord[i] = [];
    for (let j = 0; j < gameGridSize; j++) {
        gameArrayCord[i][j] = 0;
    }
}

let snake = new Snake(snakeDefaultColor,snakeDefaultLength,snakeDefaultPosX,snakeDefaultPosY,snakeDirection,10);
let apple = new Apple('orange',0,0,snake,100)

snake.initialSnake();

const move = () => {

  // Dessine la grille de jeu
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 800);

  if(firstTime==true)
  {
    apple.create();
    firstTime=false;
  }
  snake.update();
  apple.checkColision();
  gameOver=snake.checkIntercection();
  snake.draw();
  apple.draw();
};

setInterval(move, 200);

window.addEventListener("keydown", event => {
  console.log(event.key);
  switch (event.key) {
    case "ArrowDown":
      if(snake.snakeDirection!=1)
      {
        snake.snakeDirection =3;
      }
        break;
    case "ArrowUp":
      if(snake.snakeDirection!=3)
      {
        snake.snakeDirection = 1;
      }
      break;
    case "ArrowLeft":
      if(snake.snakeDirection!=2)
      {
        snake.snakeDirection = 4;
      }
      break;
    case "ArrowRight":
      if(snake.snakeDirection!=4)
      {
        snake.snakeDirection =2;
      }
      break;
  }
});

requestAnimationFrame(move);
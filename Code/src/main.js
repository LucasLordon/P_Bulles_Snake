import '../css/style.css';
import '../src/apple';
import Apple from '../src/apple';
import Snake from '../src/snake';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const GRIDWITH = canvas.width;
const GRIDHEIGHT = canvas.height;
const GAMESQUARESIZE = 50;
const GAMEGRIDWITHSIZE = GRIDWITH/GAMESQUARESIZE;
const GAMEGRIDHEIGHTSIZE = GRIDHEIGHT/GAMESQUARESIZE;
const snakeDefaultLength = 3;
const snakeDefaultHunger = 0;
const snakeDefaultColor = "blue";
const snakeDefaultPosX = 0;
const snakeDefaultPosY = 0;
let snakeCanChangeDirection = true;
let snakeDirection = 2; // 1=UP / 2=RIGHT / 3=DOWN / 4=LEFT
let firstTime=true
let gameOver = false
const DEFAULTSCORE = 0;


let snake = new Snake(snakeDefaultColor,snakeDefaultLength,snakeDefaultPosX,snakeDefaultPosY,snakeDirection,snakeDefaultHunger,GAMESQUARESIZE,GAMEGRIDWITHSIZE,GAMEGRIDHEIGHTSIZE,DEFAULTSCORE);
let apple = new Apple('orange',0,0,snake,5,GAMESQUARESIZE,GAMEGRIDWITHSIZE,GAMEGRIDHEIGHTSIZE)

snake.initialSnake();

const move = () => {
  console.log(snake.score)
  document.getElementById("Score").innerHTML="Score : "+snake.score;
  snakeCanChangeDirection=true;
  snake.update();
  apple.checkColision();
  gameOver=snake.checkIntercection();
  !gameOver
  ? (ctx.fillStyle = 'black',
     ctx.fillRect(0, 0, 800, 800),
     firstTime ? (apple.create(), firstTime = false, console.log(GAMEGRIDWITHSIZE), console.log(GAMEGRIDHEIGHTSIZE)) : 
     snake.draw(),
     apple.draw())
  : location.reload();

};
  setInterval(move, 200);
  window.addEventListener("keydown", event => {
    if(snakeCanChangeDirection==true){
    
      switch (event.key) {
      case "ArrowDown":
        snake.snakeDirection = (snake.snakeDirection !== 1) ? 3 : snake.snakeDirection;
        snakeCanChangeDirection=false;
        break;
      case "ArrowUp":
        snake.snakeDirection = (snake.snakeDirection !== 3) ? 1 : snake.snakeDirection;
        snakeCanChangeDirection=false;
        break;
      case "ArrowLeft":
        snake.snakeDirection = (snake.snakeDirection !== 2) ? 4 : snake.snakeDirection;
        snakeCanChangeDirection=false;
        break;
      case "ArrowRight":
        snake.snakeDirection = (snake.snakeDirection !== 4) ? 2 : snake.snakeDirection;
        snakeCanChangeDirection=false;
        break;
      } 
    }

});

requestAnimationFrame(move);

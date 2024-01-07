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
const GAME_GRID_WITH_SIZE = GRID_WITH/GAME_SQUARE_SIZE; // Nombre de carrés en largeur
const GAME_GRID_HEIGHT_SIZE = GRID_HEIGHT/GAME_SQUARE_SIZE; // Nombre de carrés en hauteur
  //SNAKE
const SNAKE_DEFAULT_LENGTH = 3; // Longueur initiale du serpent
const SNAKE_DEFAULT_HUNGER = 0; // Niveau de faim initial du serpent
const SNAKE_DEFAULT_COLOR = "blue"; // Couleur de la tête du serpent
const SNAKE_DEFAULT_BODY_COLOR = "red"; // Couleur du corps du serpent
const SNAKE_DEFAULT_POS_X = 0; // Position X initiale du serpent
const SNAKE_DEFAULT_POS_Y = 0; // Position Y initiale du serpent
const SNAKE_DEFAULT_DIRECTION = 3; // Direction initiale du serpent (1=UP / 2=RIGHT / 3=DOWN / 4=LEFT)
const SNAKE_DEFAULT_CAN_CHANGE_DIRECTION = true; // Autorisation de changer de direction
const SNAKE_DEFAULT_SCORE = 0; // Score initial du serpent
const SNAKE_DEFAULT_DOWN_CONTROL = "ArrowDown"; // Touche de contrôle vers le bas
const SNAKE_DEFAULT_UP_CONTROL = "ArrowUp"; // Touche de contrôle vers le haut
const SNAKE_DEFAULT_LEFT_CONTROL = "ArrowLeft"; // Touche de contrôle vers la gauche
const SNAKE_DEFAULT_RIGHT_CONTROL = "ArrowRight"; // Touche de contrôle vers la droite

//////////////////Variables//////////////////

let firstTime=true; // Indicateur de la première exécution du jeu
let gameOver = false; // Indicateur de fin de jeu
let player1Score = 0; // Score du joueur 1
let player2Score = 0; // Score du joueur 2

//////////////////Game objects//////////////////

let snakes = []; // Tableau contenant les serpents
let cpttest = 0; // Compteur de tests

// Configuration initiale des serpents
const snakeConfigs = [
  {
    color: SNAKE_DEFAULT_COLOR,
    bodyColor:SNAKE_DEFAULT_BODY_COLOR,
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
  },
  {
    color: "yellow",
    bodyColor:"green",
    length: SNAKE_DEFAULT_LENGTH,
    posX: 23,
    posY: 0,
    direction: 3,
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
    freez: false,
  },
  {
    color: "purple",
    bodyColor:"Magenta",
    length: SNAKE_DEFAULT_LENGTH,
    posX: 23,
    posY: 23,
    direction: 1,
    hunger: 50,
    squareSize: GAME_SQUARE_SIZE,
    gridWidth: GAME_GRID_WITH_SIZE,
    gridHeight: GAME_GRID_HEIGHT_SIZE,
    score: SNAKE_DEFAULT_SCORE,
    canChangeDirection: SNAKE_DEFAULT_CAN_CHANGE_DIRECTION,
    downControl: "2",
    upControl: "5",
    leftControl: "1",
    rightControl: "3",
    freez: false,
  },
  {
    color: "Cyan",
    bodyColor:"White",
    length: SNAKE_DEFAULT_LENGTH,
    posX: 0,
    posY: 23,
    direction: 1,
    hunger: SNAKE_DEFAULT_HUNGER,
    squareSize: GAME_SQUARE_SIZE,
    gridWidth: GAME_GRID_WITH_SIZE,
    gridHeight: GAME_GRID_HEIGHT_SIZE,
    score: SNAKE_DEFAULT_SCORE,
    canChangeDirection: SNAKE_DEFAULT_CAN_CHANGE_DIRECTION,
    downControl: "k",
    upControl: "i",
    leftControl: "j",
    rightControl: "l",
    freez: false,
  }
];

// Création des serpents en utilisant la configuration
let numberOfSnakes = 4;
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

// Création de l'objet Apple
let apple = new Apple('orange',0,0,snakes,1,GAME_SQUARE_SIZE,GAME_GRID_WITH_SIZE,GAME_GRID_HEIGHT_SIZE)

//////////////////Program//////////////////

// Initialisation des serpents
snakes.forEach(snake => {
  snake.initial();
});

// Fonction pour déplacer les serpents et gérer le jeu
const move = () => {
  compareSnakeColision()
  
  for (let i = 0; i < numberOfSnakes; i++) {
    snakes[i].checkIntercection()
    document.getElementById("Score").innerHTML = "Score Snake n°1 : " + snakes[0].score + "  |  Score Snake n°2 : " + snakes[1].score;
    snakes[i].canChangeDirection = true;
    snakes[i].update();
    apple.checkCollision(snakes[i]);
    (compareSnakeColision()||snakes[i].checkIntercection())&&!cpttest==0?
    gameOver = false:undefined;

  }

  !gameOver
    ? (CTX.fillStyle = GRID_BACK_GROUND_COLOR,
      CTX.fillRect(0, 0, GRID_WITH, GRID_HEIGHT),
      firstTime
        ? (apple.create(), firstTime = false)
        : snakes.forEach(snake => snake.draw()),
        apple.draw(),cpttest++): !cpttest==0?location.reload():console.log("1")
    // apple.draw(),cpttest++): (allfreez(),!cpttest==0)?location.reload():console.log("1")
};

// Appel de la fonction move à intervalle régulier
setInterval(move, GAME_SPEED);

// Gestionnaire d'événement pour les touches du clavier
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

// Animation du mouvement des serpents
requestAnimationFrame(move);

// Fonction pour comparer les collisions entre les serpents empechant les comparaison double exeple : 1 avec 2 puis 2 avec 1 (afin d'optimiser le code)
function compareSnakeColision() {
  for (let i = 0; i <= numberOfSnakes; i++) {
      for (let j = i + 1; j <= numberOfSnakes-1; j++) {
          if(snakes[i].checkSnakeIntercection(snakes[i],snakes[j]))
          {
            return true;
          }
      }
  }
  return false;
}

// // Fonction pour geler tous les serpents
// function allfreez(){
//   for (let i; i < numberOfSnakes-1; i++) {
//     console.log(i)
//   }
//   return false;
// }

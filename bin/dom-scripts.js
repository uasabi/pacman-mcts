const {boardSize, noRow, noCol} = require("./boardVars.js");
const {isEdge, positionChanger} = require('./movingscripts.js');
const mainContainer = document.getElementById('main-container');
const boardContainer = document.getElementById('board-place');
const pacmanElement = document.getElementById('pacman-sprite');
const initialPos = `row-${Math.round((boardSize/noRow)/2)}-col-${Math.round((boardSize/noCol)/2)}`;
var moveInterval;
const intervalTime = 1000*1;
let boardArr = [];

for (let i = 1; i <= noRow; i ++ ) {
  for (let j = 1; j <= noCol; j++ ) {
    let newDiv = document.createElement('div');
    newDiv.classList = "board-tile";
    newDiv.id=`row-${i}-col-${j}`;
    newDiv.textContent = `row ${i}/ col ${j}`;
    boardArr.push(newDiv);
  }
}
for (let i = 0; i < boardArr.length; i++ ) {
  boardContainer.append(boardArr[i]);
}

function SpriteClass(domElement, name, colRow, speed, direction) {
  this.physicalEntity = domElement;
  this.name = name;
  this.position = colRow;
  this.speed = speed;
  this.direction = direction;
}

let pacmanSprite = new SpriteClass(pacmanElement, "Pacman", initialPos, 1, "left");

function affixSprite(theSprite) {
  position = theSprite.position;
  sprite = theSprite.physicalEntity;
  let containerForSprite = document.getElementById(position);
  containerForSprite.append(sprite);
}

function moveSprite(direction) {
  pacmanSprite.position = positionChanger(direction, pacmanSprite.position);
  affixSprite(pacmanSprite);
  autoMoveSprite(direction);
}

function autoMoveSprite(direction) {
  clearInterval(moveInterval);
  moveInterval = setInterval(() => {
    moveSprite(direction);
    console.log("moving");
  }, intervalTime);
  console.log(direction);
}

affixSprite(pacmanSprite);

document.addEventListener('keydown', (e) => {
  e = e || window.event;
  if (e.keyCode === 37) {
    moveSprite("left");
  } else if (e.keyCode === 38) {
    moveSprite("up");
  } else if (e.keyCode === 39) {
    moveSprite("right");
  } else if (e.keyCode === 40) {
    moveSprite("down");
  }
  // left = 37
  // up = 38
  // right = 39
  // down = 40
});

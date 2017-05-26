const {boardSize, noRow, noCol} = require("./boardVars.js");
const {SpriteClass, BoardClass, pacmanSprite} = require("./defaultsprite.js");
const {isEdge, positionChanger} = require('./movingscripts.js');
const mainContainer = document.getElementById('main-container');
const boardContainer = document.getElementById('board-place');
let boardArr = [];
var boardObj = {};
// for animation
const boardCellSize = 4;
var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;
boardContainer.setAttribute("style", `max-width: ${boardCellSize*(noCol+1)}em; min-width: ${boardCellSize*(noCol+1)}em;`);
pacmanSprite.physicalEntity.setAttribute("style", `max-width: ${boardCellSize*0.5}em;`);

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    mainLoop();
}

// board creation
for (let i = 1; i <= noRow; i ++ ) {
  for (let j = 1; j <= noCol; j++ ) {
    let newDiv = document.createElement('div');
    newDiv.classList = "board-tile";
    newDiv.id=`row-${i}-col-${j}`;
    newDiv.textContent = `row ${i}/ col ${j}`;
    if ( i === 1 || i === noRow || j === 1 || j === noCol ) {
      if (i !== 7 && i !== 8 && i !== 9 && j !== 7 && j !== 8 && j !== 9) {
        newDiv.setAttribute("style", `height: ${boardCellSize}em; width: ${boardCellSize}em; background-color: blue;`);
        newDiv = new BoardClass(newDiv, false, newDiv.id);
      } else {
        newDiv.setAttribute("style", `height: ${boardCellSize}em; width: ${boardCellSize}em;`);
        newDiv = new BoardClass(newDiv, true, newDiv.id);
      }
    } else {
      newDiv.setAttribute("style", `height: ${boardCellSize}em; width: ${boardCellSize}em;`);
      newDiv = new BoardClass(newDiv, true, newDiv.id);
    }
    boardArr.push(newDiv);
    boardObj[newDiv.id] = newDiv;
  }
}
console.log(boardArr);
console.log(boardObj);

for (let i = 0; i < boardArr.length; i++ ) {
  boardContainer.append(boardArr[i].physicalEntity);
}

// affix whichever sprite to the position
function affixSprite(theSprite) {
  position = theSprite.position;
  sprite = theSprite.physicalEntity;
  let containerForSprite = document.getElementById(position);
  containerForSprite.append(sprite);
}
// update function to make sure sprite is in the right position
function update() {
  let isPermeable = checkBoardPermeable(pacmanSprite, pacmanSprite.direction);
  if (isPermeable === true) {
    pacmanSprite.direction = pacmanSprite.direction;
  } else {
    pacmanSprite.direction = "nope";
  }
  pacmanSprite.position = positionChanger(pacmanSprite.direction, pacmanSprite.position);
}

function mainLoop() {
  requestAnimationFrame(mainLoop);
    now = Date.now();
    elapsed = now - then;
    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        update();
        affixSprite(pacmanSprite);
    }
}

const checkBoardPermeable = function(sprite, direction) {
  let futurePosition = positionChanger(direction, sprite.position);
  if (boardObj[futurePosition].permeable === true) {
    return true;
  } else {
    console.log(boardObj[futurePosition].permeable);
    return false;
  }
};

document.addEventListener('keydown', (e) => {
  e = e || window.event;
  if (e.keyCode === 37) {
      pacmanSprite.direction = "left";
  } else if (e.keyCode === 38) {
      pacmanSprite.direction = "up";
  } else if (e.keyCode === 39) {
      pacmanSprite.direction = "right";
  } else if (e.keyCode === 40) {
      pacmanSprite.direction = "down";
  }
});

startAnimating(2);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const boardSize = 225;
const noRow = 15;
const noCol = boardSize/noRow;

module.exports = {
  boardSize: boardSize,
  noRow: noRow,
  noCol: noCol
}

},{}],2:[function(require,module,exports){
const {noRow, noCol, boardSize} = require('./boardVars.js');
const pacmanElement = document.getElementById('pacman-sprite');
const initialPos = `row-${Math.round((boardSize/noRow)/2)}-col-${Math.round((boardSize/noCol)/2)}`;

const SpriteClass = class {
  constructor(domElement, name, colRow, speed, direction) {
    this.physicalEntity = domElement;
    this.name = name;
    this.position = colRow;
    this.speed = speed;
    this.direction = direction;
  };
}

const BoardClass = class {
  constructor(domElement, isWall, theId) {
    this.physicalEntity = domElement;
    this.id = theId;
    this.permeable = isWall;
  }
}

let pacmanSprite = new SpriteClass(pacmanElement, "Pacman", initialPos, 1, "nope");

module.exports = {
  SpriteClass: SpriteClass,
  BoardClass: BoardClass,
  pacmanSprite: pacmanSprite
}

},{"./boardVars.js":1}],3:[function(require,module,exports){
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
    // let isPermeable = checkBoardPermeable(pacmanSprite, "left");
    // if (isPermeable === true) {
      pacmanSprite.direction = "left";
    // } else {
    //       pacmanSprite.direction = "nope";
    // }
  } else if (e.keyCode === 38) {
    // let isPermeable = checkBoardPermeable(pacmanSprite, "up");
    // if (isPermeable === true) {
      pacmanSprite.direction = "up";
    // } else {
    //       pacmanSprite.direction = "nope";
    // }
  } else if (e.keyCode === 39) {
    // let isPermeable = checkBoardPermeable(pacmanSprite, "right");
    // if (isPermeable === true) {
      pacmanSprite.direction = "right";
    // } else {
    //       pacmanSprite.direction = "nope";
    // }
  } else if (e.keyCode === 40) {
    // let isPermeable = checkBoardPermeable(pacmanSprite, "down");
    // if (isPermeable === true) {
      pacmanSprite.direction = "down";
    // } else {
    //       pacmanSprite.direction = "nope";
    // }
    // e.preventDefault();
  }
});

startAnimating(2);

},{"./boardVars.js":1,"./defaultsprite.js":2,"./movingscripts.js":4}],4:[function(require,module,exports){
const {noRow, noCol, boardSize} = require('./boardVars.js');

const edges = {
  "left": "1",
  "up": "1",
  "right": noRow.toString(),
  "down": noCol.toString()
};

const isEdge = function(direction, position) {
  position = position.split("-");
  // row-4-col-4
  if (direction === "left" || direction === "right") {
    if (edges[direction] === position[3]) {
      return true;
    } else {
      return false;
    }
  } else if (direction === "up" || direction === "down") {
    if (edges[direction] === position[1]) {
      return true;
    } else {
      return false;
    }
  }
}

const positionChanger = function(direction, currentPos) {
  if (direction === "nope") {
    return currentPos;
  } else if (direction === "left") {
    if (isEdge(direction,currentPos)) {
      return currentPos.split("-").map((a,index)=>{if(index===3){return noCol;} else {return a;}}).join("-");
    } else {
      return currentPos.split("-").map((a,index)=>{if(index===3){return parseInt(a) - 1;} else {return a;}}).join("-");
    }
  } else if (direction === "right") {
    if (isEdge(direction,currentPos)) {
      return currentPos.split("-").map((a,index)=>{if(index===3){return "1";} else {return a;}}).join("-");
    } else {
      return currentPos.split("-").map((a,index)=>{if(index===3){return parseInt(a) + 1;} else {return a;}}).join("-");
    }
  } else if (direction === "up") {
    if (isEdge(direction,currentPos)) {
      return currentPos.split("-").map((a,index)=>{if(index===1){return noRow;} else {return a;}}).join("-");
    } else {
      return currentPos.split("-").map((a,index)=>{if(index===1){return parseInt(a) - 1;} else {return a;}}).join("-");
    }
  } else if (direction === "down") {
    if (isEdge(direction,currentPos)) {
      return currentPos.split("-").map((a,index)=>{if(index===1){return "1";} else {return a;}}).join("-");
    } else {
      return currentPos.split("-").map((a,index)=>{if(index===1){return parseInt(a) + 1;} else {return a;}}).join("-");
    }
  }
  // left subtracts column
  // right adds column
  // up subtracts row
  // down adds row
};

module.exports = {
  isEdge: isEdge,
  positionChanger: positionChanger
}

},{"./boardVars.js":1}],5:[function(require,module,exports){
const startUp = require('./dom-scripts.js');

},{"./dom-scripts.js":3}]},{},[5]);

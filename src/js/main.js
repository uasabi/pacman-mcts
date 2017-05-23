(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const boardSize = 49;
const noRow = 7;
const noCol = boardSize/noRow;

module.exports = {
  boardSize: boardSize,
  noRow: noRow,
  noCol: noCol
}

},{}],2:[function(require,module,exports){
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

},{"./boardVars.js":1,"./movingscripts.js":3}],3:[function(require,module,exports){
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
  if (direction === "left") {
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

},{"./boardVars.js":1}],4:[function(require,module,exports){
const startUp = require('./dom-scripts.js');

},{"./dom-scripts.js":2}]},{},[4]);

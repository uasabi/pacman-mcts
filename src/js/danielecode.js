let then, fpsInterval;
const boardContainer = document.getElementById('board-container');
const pacmanSprite = document.getElementById('pacman-sprite');

const BoardClass = class {
  constructor(domElement, isWall, theId) {
    this.physicalEntity = domElement;
    this.id = theId;
    this.permeable = isWall;
  }
};

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    mainLoop();
}

const tick = {
  type: 'Tick',
  deltaInMilliseconds: 10000,
  input: 'up'
}

let currentState = {
  board: {
    size: 144,
    rows: 12,
    cellSize: 4,
    boardArr: [],
    boardObj: {}
  },
  pacman: {
    x:5,
    y:5,
    direction:'nope'
  }
};

const edges = {
    "left": 1,
    "up": 1,
    "right": currentState.board.rows,
    "down": currentState.board.size/currentState.board.rows
  };

const isEdge = function(direction, state) {
  const xLoc = state.x;
  const yLoc = state.y;
  if (direction === "left" || direction === "right") {
    if (edges[direction] === state.x) {
      return true;
    } else {
      return false;
    }
  } else if (direction === "up" || direction === "down") {
    if (edges[direction] === state.y) {
      return true;
    } else {
      return false;
    }
  }
};

boardContainer.setAttribute('style', `min-width: ${currentState.board.rows*currentState.board.cellSize+currentState.board.cellSize}em; max-width: ${currentState.board.rows*currentState.board.cellSize+currentState.board.cellSize}em;`);

const buildBoard = function(size, rows, cols) {
  for (let i = 1; i <= rows; i++ ) {
    for (let j = 1; j <= cols; j++ ) {
      let newDiv = document.createElement('div');
      newDiv.classList = "board-tile";
      newDiv.id=`${i}x${j}`;
      // newDiv.textContent = `row ${i}/ col ${j}`;
      if ( i === 1 || i === rows || j === 1 || j === cols ) {
        console.log("inside perimeter");
        if (i !== 7 && i !== 8 && i !== 6 && i !== 5 && j!==5 && j !== 7 && j !== 8 && j !== 6) {
          newDiv = makeBoardPiece(newDiv, false, currentState.board.cellSize, newDiv.id);
        } else {
          newDiv = makeBoardPiece(newDiv, true, currentState.board.cellSize, newDiv.id);
        }
      } else {
          newDiv = makeBoardPiece(newDiv, true, currentState.board.cellSize, newDiv.id);
        }
      let boardArr = currentState.board.boardArr;
      let boardObj = currentState.board.boardObj;
      boardArr.push(newDiv);
      boardObj[newDiv.id] = newDiv;
    }
  }
  for (let i = 0; i < currentState.board.boardArr.length; i++ ) {
  boardContainer.append(currentState.board.boardArr[i].physicalEntity);
  }
  console.log(currentState.board.boardObj);
}


function makeBoardPiece(div,isPermeable,cellsize,divId) {
  let backgroundColor = isPermeable ? "black" : "blue";
  div.setAttribute("style", `height: ${cellsize}em; width: ${cellsize}em; background-color: ${backgroundColor};`);
  div = new BoardClass(div, isPermeable, divId);
  return div;
}

function checkIfWall(state) {
  let newPosition = `${state.x}x${state.y}`;
  return !currentState.board.boardObj[newPosition].permeable;
}

function crunchState(state,action) {
  const pacManInput = action.input === 'nope' ? state.direction : action.input
  let newPacmanState = crunchSpriteState(state.pacman, pacManInput);
  let isAWall = checkIfWall(newPacmanState);
  if (isAWall) {
    console.log("at a wall!");
    return state;
  } else {
    return {...state, pacman: newPacmanState};
  }
}

function crunchSpriteState(state,direction) {
  const isAnEdge = isEdge(direction, state);
  if (isAnEdge) {
    switch(direction) {
      case 'left':
        return {...state, x: currentState.board.rows};;
      case 'up':
        return {...state, y: currentState.board.rows};
      case 'right':
        return {...state, x: 1};
      case 'down':
        return {...state, y: 1};
      default:
        return state;
      }
  } else {
    switch(direction) {
      case 'left':
        return {...state, x: state.x - 1};
      case 'up':
        return {...state, y: state.y - 1};
      case 'right':
        return {...state, x: state.x + 1};
      case 'down':
        return {...state, y: state.y + 1};
      default:
        return state;
    }
  }
}

function renderBoard(state) {
  affixSprite(pacmanSprite, state.pacman);
}

function affixSprite(sprite, spriteState) {
  let nextSpritePlace = document.getElementById(`${spriteState.y}x${spriteState.x}`);
  nextSpritePlace.append(sprite);
}

function mainLoop() {
  requestAnimationFrame(mainLoop);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    currentState =  crunchState(currentState, {type: 'Tick', deltaInMilliseconds: then, input: lastKeyPressed}) || currentState;
    renderBoard(currentState);
  }
}

let lastKeyPressed = 'nope';

document.addEventListener('keydown', (e)=> {
  e = e || window.event;
  if ( e.keyCode === 37 ) {
    lastKeyPressed = 'left';
  } else if ( e.keyCode === 38) {
    lastKeyPressed = 'up';
  } else if ( e.keyCode === 39) {
    lastKeyPressed = 'right';
  } else if ( e.keyCode === 40) {
    lastKeyPressed = 'down';
  }
});

buildBoard(currentState.board.size, currentState.board.rows, currentState.board.size/currentState.board.rows);
startAnimating(2);

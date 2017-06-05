let lastKeyPressed = 'nope';

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
    direction: 'nope'
  }
};

const edges = {
  left: 1,
  up: 1,
  right: currentState.board.rows,
  down: currentState.board.size / currentState.board.rows
};

class BoardClass {
  constructor(domElement, isWall, theId) {
    this.physicalEntity = domElement;
    this.id = theId;
    this.permeable = isWall;
  }
}

function isEdge(direction, state) {
  if (direction === "left" || direction === "right") {
    return edges[direction] === state.x;
  }
  else {
    return edges[direction] === state.y;
  }
}

function makeBoardPiece(div, isPermeable, cellsize, divId) {
  let backgroundColor = isPermeable ? "black" : "blue";
  div.setAttribute("style", `height: ${cellsize}em; width: ${cellsize}em; background-color: ${backgroundColor};`);
  div = new BoardClass(div, isPermeable, divId);
  return div;
}

function checkIfWall(state) {
  let newPosition = `${state.x}x${state.y}`;
  return !currentState.board.boardObj[newPosition].permeable;
}

function crunchState(state, action) {
  const pacManInput = action.input === 'nope' ? state.direction : action.input;
  let newPacmanState = crunchSpriteState(state.pacman, pacManInput);
  let isAWall = checkIfWall(newPacmanState);
  if (isAWall) {
    ("at a wall!");
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



module.exports = {
  crunchSpriteState: crunchSpriteState,
  currentState: currentState,
  crunchState: crunchState,
  checkIfWall: checkIfWall,
  makeBoardPiece: makeBoardPiece,
  isEdge: isEdge,
  lastKeyPressed: lastKeyPressed
}

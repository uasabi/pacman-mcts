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
  },
  red: {
    x: 3,
    y: 10,
    direction: 'down'
  },
  orange: {
    x: 10,
    y: 4,
    direction: 'down'
  }
};

const edges = {
  left: 1,
  up: 1,
  right: currentState.board.rows,
  down: currentState.board.size/currentState.board.rows
};

const BoardClass = class {
  constructor(domElement, isWall, theId) {
    this.physicalEntity = domElement;
    this.id = theId;
    this.permeable = isWall;
  }
};

const isEdge = function(direction, state) {
  if (direction === 'left' || direction === 'right') {
    if (edges[direction] === state.x) {
      return true;
    } else {
      return false;
    }
  } else if (direction === 'up' || direction === 'down') {
    if (edges[direction] === state.y) {
      return true;
    } else {
      return false;
    }
  }
};

function makeBoardPiece(div, isPermeable, cellsize, divId) {
  let backgroundColor = isPermeable ? 'black' : 'blue';
  div.setAttribute('style', `height: ${cellsize}em; width: ${cellsize}em; background-color: ${backgroundColor};`);
  div = new BoardClass(div, isPermeable, divId);
  return div;
}

function checkWall(state) {
  return (spriteState) => {
    let newPosition = `${spriteState.x}x${spriteState.y}`;
    return !state.board.boardObj[newPosition].permeable;
  };
}

const checkIfWall = checkWall(currentState);

function crunchState(state, action) {
  let buildState;
  const pacManInput = action.input === 'nope' ? state.direction : action.input;
  let newPacmanState = crunchSpriteState(state.pacman, pacManInput);
  let isAWall = checkIfWall(newPacmanState);
  if (isAWall) {
    buildState = state;
  } else {
    buildState = {...state, pacman: newPacmanState};
  }
  let newGhostState = crunchSpriteState(state.red, state.red.direction);
  isAWall = checkIfWall(newGhostState);
  if (isAWall) {
    let aNewDirection = pickRanDir();
    buildState = {...buildState, red: {...buildState.red, direction: aNewDirection}};
  } else {
    buildState = {...buildState, red: newGhostState};
  }
  newGhostState = crunchSpriteState(state.orange, state.orange.direction);
  isAWall = checkIfWall(newGhostState);
  if (isAWall) {
    let aNewDirection = pickRanDir();
    buildState = {...buildState, orange: {...buildState.orange, direction: aNewDirection}};
  } else {
    buildState = {...buildState, orange: newGhostState};
  }
  return buildState;
}

function pickRanDir() {
  const directions = ['up', 'down', 'left', 'right'];
  let number = Math.floor(Math.random() * directions.length);
  return directions[number];
}

function crunchSprite(parentState) {
  return (state, direction) => {
    const isAnEdge = isEdge(direction, state);
    if (isAnEdge) {
      switch(direction) {
      case 'left':
        return {...state, x: parentState.board.rows};
      case 'up':
        return {...state, y: parentState.board.rows};
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
  };
}

const crunchSpriteState = crunchSprite(currentState);

module.exports = {
  crunchSpriteState: crunchSpriteState,
  currentState: currentState,
  crunchSprite: crunchSprite,
  crunchState: crunchState,
  checkWall: checkWall,
  checkIfWall: checkIfWall,
  makeBoardPiece: makeBoardPiece,
  isEdge: isEdge,
  lastKeyPressed: lastKeyPressed
};

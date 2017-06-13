let lastKeyPressed = 'nope';

let currentState = {
  board: {
    size: 144,
    rows: 12,
    cellSize: 4,
    walls: [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 3, y: 0}
    ]
  },
  pacman: {
    x:5,
    y:5,
    direction: 'nope'
  },
  red: {
    x: 7,
    y: 11,
    direction: 'right'
  },
  orange: {
    x: 1,
    y: 8,
    direction: 'up'
  }
};

const edges = {
  left: 1,
  up: 1,
  right: currentState.board.rows - 1,
  down: currentState.board.rows - 1
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

function makeBoardPiece(id, cellsize, isPermeable = true) {
  const backgroundColor = isPermeable ? 'black' : 'blue';
  return `
  <div
    id='${id}'
    style='box-sizing: border-box; display: inline-block; margin: 0; padding: 0; height: ${cellsize}em; width: ${cellsize}em; background-color: ${backgroundColor};'
  >
  </div>`;
}

function makePacman(cellsize) {
  return `
   <div
     style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
     <svg viewbox='0 0 100 100' id='pacman-sprite'>
     <use xlink:href='#pacman' />
     </svg>
   </div>
 `;
}

function makeRed(cellsize) {
  return `
    <div
      style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
      <svg viewbox='0 0 100 100' id='pacman-sprite'>
      <use xlink:href='#red-ghost' />
      </svg>
    </div>
  `;
}

function makeOrange(cellsize) {
  return `
    <div
      style='height: ${cellsize}em; width: ${cellsize}em; background-color: black; display: inline-block;'>
      <svg viewbox='0 0 100 100' id='pacman-sprite'>
      <use xlink:href='#orange-ghost' />
      </svg>
    </div>
  `;
}

function checkWall(state) {
  return (spriteState) => {
    let newPosition = `${spriteState.x}x${spriteState.y}`;
    return false;
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
        return {...state, x: parentState.board.rows - 1};
      case 'up':
        return {...state, y: parentState.board.rows - 1};
      case 'right':
        return {...state, x: 0};
      case 'down':
        return {...state, y: 0};
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
  lastKeyPressed: lastKeyPressed,
  makeRed,
  makeOrange,
  makePacman
};

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

function makeBoardPiece(id, cellsize, isPermeable = true) {
  let idSlice = id.split("x");
  let backgroundColor;
  switch(idSlice[0]) {
    case "1":
      backgroundColor = "pink";
      break;
    case "2":
      backgroundColor = "red";
      break;
    case "3":
      backgroundColor = "orange";
      break;
    case "4":
      backgroundColor = "yellow";
      break;
    case "5":
      backgroundColor = "green";
      break;
    case "6":
      backgroundColor = "blue";
      break;
    case "7":
      backgroundColor = "violet";
      break;
    case "8":
      backgroundColor = "pink";
      break;
    case "9":
      backgroundColor = "red";
      break;
    case "10":
      backgroundColor = "orange";
      break;
    case "11":
      backgroundColor = "yellow";
      break;
    case "12":
      backgroundColor = "green";
      break;
  }
  return `
  <div
    id="${id}"
    style = "height: ${cellsize}em; width: ${cellsize}em; background-color: ${backgroundColor};"
    class="board-tile"
  >
  </div>`;
}

function makePacman(cellsize) {
 return `
   <div
     style="height: ${cellsize}em; width: ${cellsize}em; background-color: black;"
     class="board-tile">
     <svg viewbox="0 0 100 100" id="pacman-sprite">
     <use xlink:href="#pacman" />
     </svg>
   </div>
 `;
}

function makeRed(cellsize) {
  return `
    <div
      style="height: ${cellsize}em; width: ${cellsize}em; background-color: black;"
      class="board-tile">
      <svg viewbox="0 0 100 100" id="pacman-sprite">
      <use xlink:href="#red-ghost" />
      </svg>
    </div>
  `;
}

function makeOrange(cellsize) {
  return `
    <div
      style="height: ${cellsize}em; width: ${cellsize}em; background-color: black;"
      class="board-tile">
      <svg viewbox="0 0 100 100" id="pacman-sprite">
      <use xlink:href="#orange-ghost" />
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
  lastKeyPressed: lastKeyPressed,
  makeRed,
  makeOrange,
  makePacman
};

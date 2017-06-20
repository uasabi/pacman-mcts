let lastKeyPressed = 'nope';

let currentState = {
  collision: false,
  board: {
    size: 144,
    rows: 12,
    cellSize: 4,
    walls: [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 3, y: 0},
      {x: 8, y: 0},
      {x: 9, y: 0},
      {x: 10, y: 0},
      {x: 11, y: 0},
      {y: 0, x: 0},
      {y: 1, x: 0},
      {y: 2, x: 0},
      {y: 3, x: 0},
      {y: 8, x: 0},
      {y: 9, x: 0},
      {y: 10, x: 0},
      {y: 11, x: 0},
      {x: 0, y: 11},
      {x: 1, y: 11},
      {x: 2, y: 11},
      {x: 3, y: 11},
      {x: 8, y: 11},
      {x: 9, y: 11},
      {x: 10, y: 11},
      {x: 11, y: 11},
      {y: 0, x: 11},
      {y: 1, x: 11},
      {y: 2, x: 11},
      {y: 3, x: 11},
      {y: 8, x: 11},
      {y: 9, x: 11},
      {y: 10, x: 11},
      {y: 11, x: 11}
    ]
  },
  pacman: {
    x: 5,
    y: 5,
    direction: 'nope',
    activeDirection: lastKeyPressed
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

function isEdge(direction, state) {
  if (direction === 'left' || direction === 'right') {
    return edges[direction] === state.x;
  } else {
    return edges[direction] === state.y;
  }
}

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
    return state.board.walls.find((element) => {
      return element.x === spriteState.x && element.y === spriteState.y;
    }) !== undefined;
  };
}

const checkIfWall = checkWall(currentState);

function crunchState(state, action) {
  if (!state.collision) {
    let buildState;
    currentState.pacman.activeDirection = action.input;
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

    const orangeCollision = collisionDetection(buildState.orange, buildState.pacman);
    const redCollision = collisionDetection(buildState.red, buildState.pacman);
    if (orangeCollision || redCollision) {
      buildState.collision = true;
      return buildState;
    } else {
      return buildState;
    }
  } else {
    return state;
  }
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

function collisionDetection(spriteOne, pacman) {
  const opposites = {'left': 'right', 'right': 'left', 'up': 'down', 'down': 'up'};
  const values = {'left': -1, 'right': 1, 'up': -1, 'down': 1};
  if (opposites[spriteOne.direction] === pacman.activeDirection) {
    if (spriteOne.direction === 'left' || spriteOne.direction === 'right') {
      return spriteOne.x + values[spriteOne.direction] === pacman.x;
    } else if (spriteOne.direction === 'up' || spriteOne.direction === 'down') {
      return spriteOne.y + values[spriteOne.direction] === pacman.y;
    }
  }
  return (spriteOne.x === pacman.x && spriteOne.y === pacman.y);
}

const crunchSpriteState = crunchSprite(currentState);

function stateGen(state) {
  let stateArr = [];
  while (stateArr.length < 3) {
    let nextDir = directionArr();
    if (stateArr.indexOf(nextDir) === -1) {
      stateArr.push(nextDir);
    }
  }
  return stateArr;
}

function directionArr() {
  let directions = ['up', 'down', 'right', 'left'];
  let dirArr = [];
  while (dirArr.length < 3) {
    let ranNum = Math.floor(Math.random() * directions.length);
    dirArr.push(directions[ranNum]);
    directions.splice(ranNum, 1);
  }
  return dirArr;
}

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
  stateGen,
  collisionDetection,
  makeRed,
  makeOrange,
  makePacman,
};

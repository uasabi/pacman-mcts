export let lastKeyPressed = 'nope';

export const LEFT = 'left';
export const RIGHT = 'right';
export const UP = 'up';
export const DOWN = 'down';
export const NONE = 'none';

export let currentState = {
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

export function isEdge({direction, rows, cols, x, y}) {
  switch(direction) {
  case LEFT:
    return x === 0;
  case RIGHT:
    return x === cols - 1;
  case UP:
    return y === rows - 1;
  case DOWN:
    return y === 0;
  default:
    return false;
  }
}

export function isWall({walls, x, y}) {
  return !!walls.find(element => element.x === x && element.y === y);
}

export function crunchState(state, action) {
  if (state.collision) return state;

  currentState.pacman.activeDirection = action.input;
  const pacManInput = action.input.pacman === NONE ? state.pacman.direction : action.input.pacman;
  const redInput = action.input.red === NONE ? state.red.direction : action.input.red;
  const orangeInput = action.input.orange === NONE ? state.orange.direction : action.input.orange;

  const newPacmanState = movePlayer({player: state.pacman, direction: pacManInput});
  const pacmanState = isValidMove({
    walls: state.board.walls,
    x: newPacmanState.x,
    y: newPacmanState.y,
    rows: state.board.rows,
    cols: state.board.cols
  }) ? {...state, pacman: newPacmanState} : state;

  const moveGhost = (player, direction) => {
    const newPositon = movePlayer({player, direction});
    const isPositionValid = isValidMove({
      walls: state.board.walls,
      x: player.x,
      y: player.y,
      rows: state.board.rows,
      cols: state.board.cols
    });
    return isPositionValid ?
    newPositon : movePlayer({
      player: state.red,
      direction: generateValidDirections({
        walls: state.board.walls,
        x: state.red.x,
        y: state.red.y,
        cols: state.board.rows,
        rows: state.board.rows
      })[0]
    });
  };

  const finalState = {...pacmanState, red: moveGhost(state.red, redInput), orange: moveGhost(state.orange, orangeInput)};

  const orangeCollision = collisionDetection(finalState.orange, finalState.pacman);
  const redCollision = collisionDetection(finalState.red, finalState.pacman);
  if (orangeCollision || redCollision) {
    finalState.collision = true;
  }
  return finalState;
}

export function pickRanDir() {
  const directions = ['up', 'down', 'left', 'right'];
  let number = Math.floor(Math.random() * directions.length);
  return directions[number];
}

export function convertDirectionToCoordinate({direction}) {
  switch(direction) {
  case LEFT:
    return {x: -1, y: 0};
  case RIGHT:
    return {x: +1, y: 0};
  case UP:
    return {x: 0, y: +1};
  case DOWN:
    return {x: 0, y: -1};
  default:
    return {x: 0, y: 0};
  }
}

export function isInsideBoard({cols, rows, x, y}) {
  return (x >= 0 && x < cols) && (y >= 0 && y < rows);
}

export function wrapAroundBoard({cols, rows, x, y}) {
  let newX, newY;
  newX = x < 0 ? cols + x : x;
  newX = x >= cols ? x - cols : newX;
  newY = y < 0 ? rows + y : y;
  newY = y >= rows ? y - rows : newY;
  return {x: newX, y: newY};
}

export function isValidMove({walls, direction, x, y, rows, cols}) {
  const {x: plusX, y: plusY} = convertDirectionToCoordinate({direction});
  const newCoordinates = {x: x + plusX, y: y + plusY};
  const {x: updatedX, y: updatedY} = isInsideBoard({cols, rows, x: x + plusX, y: y + plusY}) ?
    newCoordinates : wrapAroundBoard({rows, cols, x, y});
  return !isWall({walls, x: updatedX, y: updatedY});
}

export function generateValidDirections({walls, x, y, cols, rows, }) {
  return [UP, RIGHT, DOWN, LEFT].filter(direction => isValidMove({walls, direction, x, y, cols, rows}));
}

export function movePlayer({player, direction}) {
  const {x: plusX, y: plusY} = convertDirectionToCoordinate({direction});
  return {...player, x: player.x + plusX, y: player.y + plusY};
}

export function collisionDetection(spriteOne, pacman) {
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

export function directionGen() {
  let stateArr = [];
  while (stateArr.length < 3) {
    let nextDir = directionArr();
    if (stateArr.length === 0) {
      stateArr.push(nextDir);
    } else {
      let checkArr = stateArr.map((a) => {
        return a.join('');
      });
      let nextDirJoined = nextDir.join('');
      if (checkArr.indexOf(nextDirJoined) === -1) {
        stateArr.push(nextDir);
      }
    }
  }
  // return array of unique direction sets
  return stateArr;
}

export function directionArr() {
  let directions = ['up', 'down', 'right', 'left'];
  let dirArr = [];
  while (dirArr.length < 3) {
    let ranNum = Math.floor(Math.random() * directions.length);
    dirArr.push(directions[ranNum]);
    directions.splice(ranNum, 1);
  }
  return dirArr;
}

export function stateGen(state) {
  let possibleDirs = directionGen();
  let multiStates = [];
  while (multiStates.length < 3) {
    let pacman, red, orange;
    for (let i = 0; i < possibleDirs.length; i++) {
      let newState = crunchState(state, {input: {
        pacman: possibleDirs[i][0],
        red: possibleDirs[i][1],
        orange: possibleDirs[i][2]
      }});
      multiStates.push(newState);
    }
  }
  return multiStates;
}
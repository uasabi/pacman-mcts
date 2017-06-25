import {crunchState, UP, DOWN, LEFT, RIGHT, generateValidDirections} from './gameLogic';
import {computeNextDirectionForOrange, computeNextDirectionForRed} from './ghostAi';

export function computePossibleDirections(state) {
  return generateValidDirections({
    walls: state.board.walls,
    cols: state.board.rows,
    rows: state.board.rows,
    x: state.pacman.x,
    y: state.pacman.y
  }).map(pacmanDirection => {
    return [pacmanDirection, computeNextDirectionForRed(state), computeNextDirectionForOrange(state)];
  });
}

export function pickRandomDirection() {
  const directions = [UP, DOWN, LEFT, RIGHT];
  let number = Math.floor(Math.random() * directions.length);
  return directions[number];
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
import {crunchState, UP, DOWN, LEFT, RIGHT, generateValidDirections, isGameOver} from './gameLogic';
import {computeNextDirectionForOrange, computeNextDirectionForRed} from './ghostAi';
import {createActionMovePacman, createActionMoveOrange, createActionMoveRed, createActionSimulate} from './actions';

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

export function generateChildStates(parentState, directionTriplets) {
  return directionTriplets.map(([directionPacman, directionRed, directionOrange]) => {
    return [
      createActionMovePacman({direction: directionPacman}),
      createActionMoveRed({direction: directionRed}),
      createActionMoveOrange({direction: directionOrange}),
      createActionSimulate(),
    ].reduce((state, action) => crunchState(state, action), parentState);
  });
}

export function generateTree({rootState, nestingLevel = 3}, parent = null, currentLevel = 0) {
  const childStates = isGameOver(rootState) ? [] : generateChildStates(rootState, computePossibleDirections(rootState));
  const currentState = {
    state: rootState,
    parent,
    level: currentLevel,
    children: []
  };
  currentState.children = nestingLevel >= 1 ?
      childStates.map(childState => generateTree({rootState: childState, nestingLevel: nestingLevel - 1}, currentState, currentLevel + 1)) : [];
  return currentState;
}
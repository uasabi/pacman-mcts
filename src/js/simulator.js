import {crunchState, UP, DOWN, LEFT, RIGHT, generateValidDirections, isGameOver} from './gameLogic';
import {computeNextDirectionForOrange, computeNextDirectionForRed} from './ghostAi';
import {createActionMovePacman, createActionMoveOrange, createActionMoveRed, createActionSimulate} from './actions';

export function computePossibleDirections(state) {
  return generateValidDirections({
    walls: state.board.walls,
    cols: state.board.rows,
    rows: state.board.cols,
    x: state.pacman.x,
    y: state.pacman.y
  }).map(pacmanDirection => {
    return {
      pacman: pacmanDirection,
      red: state.red ? computeNextDirectionForRed(state) : null,
      orange: state.orange? computeNextDirectionForOrange(state) : null
    };
  });
}

export function generateChildStates(parentState, directionTriplets) {
  return directionTriplets.map(({pacman, red, orange}) => {
    return [createActionMovePacman({direction: pacman})]
      .concat(red ? createActionMoveRed({direction: red}) : [])
      .concat(orange ? createActionMoveOrange({direction: orange}): [])
      .concat(createActionSimulate())
      .reduce((state, action) => crunchState(state, action), parentState);
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

export function generateMCTree({rootState, nestingLevel = 3}, parent = null, currentLevel = 0) {
  const currentNode = {
    accumulatedPacmanScore: rootState.pacman.score,
    accumulatedRedScore: (rootState.red || {score: 0}).score,
    accumulatedOrangeScore: (rootState.orange || {score: 0}).score,
    state: rootState,
    parent,
    level: currentLevel,
    children: []
  };
  if (!isGameOver(rootState) && nestingLevel >= 1) {
    const childStates = isGameOver(rootState) ? [] : generateChildStates(rootState, computePossibleDirections(rootState));
    currentNode.children = childStates.map(childState => {
      return generateMCTree({rootState: childState, nestingLevel: nestingLevel - 1}, currentNode, currentLevel + 1);
    });
  }
  mutateParentScore(currentNode);
  return currentNode;
}

export function mutateParentScore(node) {
  if (node.children.length > 0) {
    node.accumulatedPacmanScore = node.children.reduce((totalScore, child) => child.accumulatedPacmanScore + totalScore, 0);
    node.accumulatedRedScore = node.children.reduce((totalScore, child) => child.accumulatedRedScore + totalScore, 0);
    node.accumulatedOrangeScore = node.children.reduce((totalScore, child) => child.accumulatedOrangeScore + totalScore, 0);
  } else {
    node.accumulatedPacmanScore = node.state.pacman.score;
    node.accumulatedRedScore = (node.state.red || {score: 0}).score;
    node.accumulatedOrangeScore = (node.state.orange || {score: 0}).score;
  }
  if (node.parent) mutateParentScore(node.parent);
}

export function pickNextMove(state, smartness = 5) {
  const tree = generateMCTree({rootState: state, nestingLevel: smartness});
  const candidates = tree.children.slice(0).sort((childA, childB) => childB.accumulatedPacmanScore - childA.accumulatedPacmanScore);
  return candidates[0].state.pacman.direction;
}
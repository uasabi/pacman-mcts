export const TICK = 'Tick';
export const MOVE_PACMAN = 'move pacman';
export const MOVE_ORANGE = 'move orange';
export const MOVE_RED = 'move red';

export function createActionTick({time}) {
  return {
    type: TICK,
    time
  };
}

export function createActionMovePacman({direction}) {
  return {
    type: MOVE_PACMAN,
    direction
  };
}

export function createActionMoveOrange({direction}) {
  return {
    type: MOVE_ORANGE,
    direction
  };
}

export function createActionMoveRed({direction}) {
  return {
    type: MOVE_RED,
    direction
  };
}
import * as logic from '../src/js/ghostAi';
import {RIGHT, LEFT, UP, DOWN} from '../src/js/gameLogic';

test('it should generate valid directions', () => {
  expect(logic.nextDirection({
    player: {x: 1, y: 1, direction: LEFT},
    direction: DOWN,
    rows: 12,
    cols: 12,
    walls: [
      {x: 1, y: 0}
    ]
  })).toEqual(UP);
  expect(logic.nextDirection({
    player: {x: 1, y: 1, direction: LEFT},
    direction: DOWN,
    rows: 12,
    cols: 12,
    walls: [
      {x: 0, y: 0}
    ]
  })).toEqual(DOWN);
  expect(logic.nextDirection({
    player: {x: 1, y: 0, direction: LEFT},
    direction: DOWN,
    rows: 12,
    cols: 12,
    walls: []
  })).toEqual(DOWN);
});
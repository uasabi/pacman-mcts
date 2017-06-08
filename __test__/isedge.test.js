const logic = require('../src/js/pre-logic.js');

test('returns true if at edge', () => {
  expect(logic.isEdge("down", {x:5, y:12})).toBe(true);
});

const logic = require('../src/js/pre-logic.js');

test('returns true if at edge', () => {
  expect(logic.isEdge("up", {x:12,y:12})).toBe(true);
});

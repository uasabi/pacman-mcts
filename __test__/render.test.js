import * as render from '../src/js/render';

test('normal board piece is ok', () => {
  let expected = `
  <div
    id='01x04'
    style='box-sizing: border-box; display: inline-block; margin: 0; padding: 0; height: 3em; width: 3em; background-color: black;'
  >
  </div>`;
  expect(render.makeBoardPiece('01x04', 3)).toEqual(expected);
});

test('wall piece is ok', () => {
  let expected = `
  <div
    id='11x01'
    style='box-sizing: border-box; display: inline-block; margin: 0; padding: 0; height: 3em; width: 3em; background-color: blue;'
  >
  </div>`;
  expect(render.makeBoardPiece('11x01', 3, false)).toEqual(expected);
});
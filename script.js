import {renderStateAsSvg, Tree} from './src/js/render';
import {NONE, LEFT, RIGHT, UP, DOWN} from './src/js/gameLogic';
import * as fs from 'fs';
import * as d3 from 'd3';
import {generateMCTree} from './src/js/simulator';
const svg2png = require('svg2png');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document: doc } = (new JSDOM(`
<!DOCTYPE html>
<head>
<style>
.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}
</style>
</head>
<body>
</body>
`)).window;

// if (!fs.existsSync('assets/play-01.png')) {
//   const svg = renderStateAsSvg({
//     pills: [
//       {x: 2, y: 0}
//     ],
//     board: {
//       walls: [],
//       rows: 3,
//       cols: 3
//     },
//     pacman: {
//       x: 2,
//       y: 2,
//       direction: RIGHT,
//       score: 0
//     },
//     red: {
//       x: 0,
//       y: 0,
//       direction: UP,
//       score: 0
//     }
//   });
//   svg2png(svg).then(buffer => fs.writeFileSync('assets/play-01.png', buffer));
// }

// if (!fs.existsSync('assets/play-04.png')) {
//   const svg = makeTree(1);
//   svg2png(svg).then(buffer => fs.writeFileSync('assets/play-04.png', buffer));
// }

// if (!fs.existsSync('assets/play-05.png')) {
//   const svg = makeTree(2);
//   svg2png(svg).then(buffer => fs.writeFileSync('assets/play-05.png', buffer));
// }

// if (!fs.existsSync('assets/play-06.png')) {
//   const svg = makeTree(3);
//   svg2png(svg).then(buffer => fs.writeFileSync('assets/play-06.png', buffer));
//   fs.writeFileSync('assets/play-06.svg', svg);
// }

// function makeTree(levels = 1) {
//   const treeData = generateMCTree({rootState: {
//     pills: [
//       {x: 2, y: 0}
//     ],
//     board: {
//       walls: [
//         {x: 0, y: 0},
//         {x: 0, y: 1},
//         {x: 0, y: 2},
//         {x: 0, y: 3},
//         {x: 0, y: 4},
//         {x: 1, y: 4},
//         {x: 2, y: 4},
//         {x: 3, y: 4},
//         {x: 4, y: 4},
//         {x: 4, y: 3},
//         {x: 4, y: 2},
//         {x: 4, y: 1},
//         {x: 4, y: 0},
//         {x: 3, y: 0},
//         {x: 2, y: 0},
//         {x: 1, y: 0},
//       ],
//       rows: 5,
//       cols: 5
//     },
//     pacman: {
//       x: 3,
//       y: 3,
//       direction: RIGHT,
//       score: 0
//     },
//     red: {
//       x: 1,
//       y: 2,
//       direction: UP,
//       score: 0
//     }
//   }, nestingLevel: levels});

//   Tree(d3, doc.body, treeData, node => node.html(it => renderStateAsSvg({
//     ...it.data.state,
//     board: {
//       ...it.data.state.board, rows: 3, cols: 3
//     },
//     pacman: {...it.data.state.pacman, x: it.data.state.pacman.x - 1, y: it.data.state.pacman.y - 1},
//     red: {...it.data.state.red, x: it.data.state.red.x - 1, y: it.data.state.red.y - 1},
//   }, 100, 4)), 2000, 4000, false);

//   const svg = d3.select(doc.body).select('svg').node().outerHTML;
//   d3.select(doc.body).select('svg').remove();
//   return svg;
// }

function makeTree(levels = 3) {
  const treeData = generateMCTree({rootState: {
    pills: [
      {x: 2, y: 0}
    ],
    board: {
      walls: [],
      rows: 3,
      cols: 3
    },
    pacman: {
      x: 2,
      y: 2,
      direction: RIGHT,
      score: 0
    },
    red: {
      x: 0,
      y: 0,
      direction: UP,
      score: 0
    }
  }, nestingLevel: levels});
  Tree(d3, doc.body, treeData, node => node.html(it => renderStateAsSvg(it.data.state, 50, 2)), 10 * 1000, 10 * 1000, false);

  const svg = d3.select(doc.body).select('svg').node().outerHTML;
  d3.select(doc.body).select('svg').remove();
  return svg;
}

const svg3 = makeTree();
const svg4 = makeTree(4);
fs.writeFileSync('assets/3levels.svg', svg3);
fs.writeFileSync('assets/4levels.svg', svg4);
svg2png(svg3).then(buffer => fs.writeFileSync('assets/3levels.png', buffer));
svg2png(svg4).then(buffer => fs.writeFileSync('assets/4levels.png', buffer));
import {UP, DOWN, LEFT, RIGHT} from './gameLogic';
import * as d3 from 'd3';

export function makeTile() {
  return '<div class="tile"></div>';
}

export function makeWall() {
  return '<div class="tile wall"></div>';
}

export function makePacman(pacman) {
  return `
    <div class="tile">
      <svg viewbox='0 0 40 40' transform="scale(1.4, 1.4) ${rotate(pacman.direction)}">
        <path fill="#344975" d="M19.6,8c4.3-0.4,8.3,1.4,10.8,4.5l-9.6,7.9L32,25.9c-1.8,3.7-5.5,6.5-10,6.9C15.1,33.4,9,28.4,8.4,21.6
          S12.7,8.6,19.6,8z"/>
      </svg>
    </div>
 `;
}

export function makeRed(red) {
  return `
    <div class="tile">
      <svg viewbox='0 0 40 40'>
        <path fill="#AD402C" d="M20.1,6.3c-6.9,0-12.5,5.6-12.5,12.5v13.1c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1c0,1.7,1.4,3.1,3.1,3.1
          c1.7,0,3.1-1.4,3.1-3.1c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1V18.7
          C32.6,11.9,27,6.3,20.1,6.3z"/>
      </svg>
    </div>
  `;
}

export function makeOrange(orange) {
  return `
    <div class="tile">
      <svg viewbox='0 0 40 40'>
        <path fill="#F4A361" d="M20.1,6.3c-6.9,0-12.5,5.6-12.5,12.5v13.1c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1c0,1.7,1.4,3.1,3.1,3.1
          c1.7,0,3.1-1.4,3.1-3.1c0,1.7,1.4,3.1,3.1,3.1c1.7,0,3.1-1.4,3.1-3.1c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1V18.7
          C32.6,11.9,27,6.3,20.1,6.3z"/>
      </svg>
    </div>
  `;
}

export function makePill() {
  return `
    <div class="tile">
      <svg viewbox='0 0 100 100' id='pacman-sprite'>
        <circle fill="#846785" cx="50" cy="50" r="10"/>
      </svg>
    </div>
  `;
}

function rotate(direction) {
  switch(direction) {
  case UP:
    return 'rotate(270)';
  case DOWN:
    return 'rotate(90)';
  case RIGHT:
    return '';
  case LEFT:
    return 'rotate(180)';
  default:
    return '';
  }
}

export function renderBoard(state, element) {
  const boardHtml = buildTheBoard(state);
  element.innerHTML = boardHtml;
}

export function buildTheBoard(state) {
  const cellSize = 4;
  const matrix = [];
  const rows = state.board.rows;
  const cols = state.board.cols;
  for(let i = 0, iLen = cols; i < iLen; i += 1) {
    matrix[i] = [];
    for(let j = 0, jLen = rows; j < jLen; j += 1) {
      matrix[i][j] = makeTile();
    }
  }

  state.board.walls.forEach(wall => matrix[wall.x][wall.y] = makeWall());
  state.pills.forEach(pill => matrix[pill.x][pill.y] = makePill());
  if (state.pacman) matrix[state.pacman.x][state.pacman.y] = makePacman(state.pacman);
  if (state.red) matrix[state.red.x][state.red.y] = makeRed(state.red);
  if (state.orange) matrix[state.orange.x][state.orange.y] = makeOrange(state.orange);

  const renderMatrix = [];
  for(let j = 0, jLen = cols; j < jLen; j += 1) {
    for(let i = 0, iLen = rows; i < iLen; i += 1) {
      renderMatrix.push(matrix[i][rows - j - 1]);
    }
  }
  return `<div class="board" style="width: calc(${cellSize * cols}em + ${2 * cols}px)">${renderMatrix.join('')}</div>`;
}

export function renderStateAsSvg(state, width = 600, gutter = 10) {
  const scaleRatio = width / 600;
  const cellSize = width / state.board.cols;
  const height = cellSize * state.board.rows;
  const pacman = !state.pacman ? '' : `
<g transform="translate(${cellSize * state.pacman.x}, ${(state.board.rows - state.pacman.y - 1) * cellSize}) scale(${scaleRatio},${scaleRatio})">
  <path fill="#344975" d="M94,28.7c26.3-2.4,50.9,8.6,66.3,27.6l-58.9,48.4l68.7,33.8c-11.1,22.7-33.8,39.8-61.4,42.2c-42.2,3.8-79.8-27-83.3-68.7S51.8,32.4,94,28.7z"/>
</g>`;
  const red = !state.red ? '' : `
<g transform="translate(${cellSize * state.red.x}, ${(state.board.rows - state.red.y - 1) * cellSize}) scale(${scaleRatio},${scaleRatio})">
  <path fill="#AD402C" d="M104.1,17.6c-38.4,0-69.5,31.2-69.5,69.5v72.7c0,9.5,7.8,17.2,17.2,17.2s17.2-7.8,17.2-17.2c0,9.5,7.8,17.2,17.2,17.2s17.2-7.8,17.2-17.2c0,9.5,7.8,17.2,17.2,17.2s17.2-7.8,17.2-17.2c0,9.5,7.8,17.2,17.2,17.2c9.5,0,17.2-7.8,17.2-17.2V86.5C173.4,48.8,142.3,17.6,104.1,17.6z"/>
</g>`;
  const orange = !state.orange ? '' : `
<g transform="translate(${cellSize * state.orange.x}, ${(state.board.rows - state.orange.y - 1) * cellSize}) scale(${scaleRatio},${scaleRatio})">
  <path fill="#68A300" d="M104.1,17.6c-38.4,0-69.5,31.2-69.5,69.5v72.7c0,9.5,7.8,17.2,17.2,17.2s17.2-7.8,17.2-17.2c0,9.5,7.8,17.2,17.2,17.2s17.2-7.8,17.2-17.2c0,9.5,7.8,17.2,17.2,17.2s17.2-7.8,17.2-17.2c0,9.5,7.8,17.2,17.2,17.2c9.5,0,17.2-7.8,17.2-17.2V86.5C173.4,48.8,142.3,17.6,104.1,17.6z"/>
</g>`;
  const pills = state.pills.map(pill => {
    const offset = cellSize / 2 * scaleRatio;
    return `<g transform="translate(${cellSize * pill.x}, ${(state.board.rows - pill.y - 1) * cellSize})">
    <circle fill="#846785" cx="${offset}" cy="${offset}" r="${20 * scaleRatio}"/>
</g>`;
  });
  return `<svg width="${width}px" height="${height}px" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern x="0" y="0" viewBox="-${cellSize / 4 + gutter} ${gutter / 2} ${cellSize} ${cellSize}" id="grid" width="${cellSize}" height="${cellSize}" patternUnits="userSpaceOnUse" style="overflow:visible;">
      <rect x="-${cellSize / 4 + gutter}" y="${gutter / 2}" width="${cellSize}" height="${cellSize}" fill="#FFDB7B" stroke="#E5C56E" stroke-width="${gutter}"/>
    </pattern>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" stroke="#E5C56E" stroke-width="${2 * gutter}"/>
  ${pacman}
  ${red}
  ${orange}
  ${pills}
</svg>`;
}

export function Tree(d3, element, treeData, renderNode, w = 960, h = 500, collapseAll = true) {
  const margin = {top: 20, right: 90, bottom: 30, left: 90};
  const width = w - margin.left - margin.right;
  const height = h - margin.top - margin.bottom;

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  const svg = d3.select(element).append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .attr('class', 'graph');

  let i = 0;
  const duration = 750;

  // declares a tree layout and assigns the size
  const treemap = d3.tree().size([height, width]);//.nodeSize([100, 100]);

  // Assigns parent, children, height, depth
  let root = d3.hierarchy(treeData, d => d.children);
  root.x0 = height / 2;
  root.y0 = 0;

  // Collapse after the second level
  if (collapseAll) root.children.forEach(collapse);

  update(root);

  // Collapse the node and all it's children
  function collapse(d) {
    if(d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  const zoom = (container) => d3.zoom()
    .scaleExtent([1, 10])
    .on('zoom', () => container.select('g.graph').attr('transform', `translate(${d3.event.transform.x},${d3.event.transform.y}), scale(${d3.event.transform.k})`));

  // svg.append('rect')
  //   .attr('width', '100%')
  //   .attr('height', '100%')
  //   .style('fill', 'none')
  //   .style('pointer-events', 'all')
  //   .call(zoom(svg));

  function update(source) {

    // Assigns the x and y position for the nodes
    const treeData = treemap(root);

    // Compute the new tree layout.
    const nodes = treeData.descendants();
    const links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(d => d.y = d.depth * 180);

    // ****************** Nodes section ***************************

    // Update the nodes...
    const node = svg
        .select('g.graph')
        .selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i));

    // Enter any new modes at the parent's previous position.
    const nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${source.y0},${source.x0})`)
      .on('click', click);

    renderNode(nodeEnter);

    // UPDATE
    const nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    if (collapseAll) {
      nodeUpdate.transition()
        .duration(duration)
        .attr('transform', d => `translate(${d.y},${d.x})`);
    } else {
      nodeUpdate.attr('transform', d => `translate(${d.y},${d.x})`);
    }

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style('fill', d => d._children ? 'lightsteelblue' : '#fff')
      .attr('cursor', 'pointer');

    // Remove any exiting nodes
    const nodeExit = node.exit();
    if (collapseAll) {
      nodeExit.transition()
        .duration(duration)
        .attr('transform', d => `translate(${source.y},${source.x})`)
        .remove();
    }

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    const link = svg.select('g.graph')
      .selectAll('path.link')
      .data(links, d => d.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().insert('path', 'g')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', '2px')
      .attr('d', d => {
        const o = {x: source.x0, y: source.y0};
        return diagonal(o, o);
      });

    // UPDATE
    const linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    if (collapseAll) {
      linkUpdate.transition()
        .duration(duration)
        .attr('d', d => diagonal(d, d.parent));

      // Remove any exiting links
      const linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', d => {
          var o = {x: source.x, y: source.y};
          return diagonal(o, o);
        })
        .remove();
    } else {
      linkUpdate
        .attr('d', d => diagonal(d, d.parent));
    }

    // Store the old positions for transition.
    nodes.forEach(function(d){
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {

      const path = `M ${s.y} ${s.x}
        C ${(s.y + d.y) / 2} ${s.x},
          ${(s.y + d.y) / 2} ${d.x},
          ${d.y} ${d.x}`;

      return path;
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
  }
}


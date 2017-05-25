const {noRow, noCol, boardSize} = require('./boardVars.js');
const pacmanElement = document.getElementById('pacman-sprite');
const initialPos = `row-${Math.round((boardSize/noRow)/2)}-col-${Math.round((boardSize/noCol)/2)}`;

const SpriteClass = function(domElement, name, colRow, speed, direction) {
  this.physicalEntity = domElement;
  this.name = name;
  this.position = colRow;
  this.speed = speed;
  this.direction = direction;
};

const BoardClass = function(domElement, isWall, theId) {
  this.physicalEntity = domElement;
  this.id = theId;
  this.permeable = isWall;
}

let pacmanSprite = new SpriteClass(pacmanElement, "Pacman", initialPos, 1, "nope");

module.exports = {
  SpriteClass: SpriteClass,
  BoardClass: BoardClass,
  pacmanSprite: pacmanSprite
}

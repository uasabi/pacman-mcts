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

let pacmanSprite = new SpriteClass(pacmanElement, "Pacman", initialPos, 1, "nope");

module.exports = {
  SpriteClass: SpriteClass,
  pacmanSprite: pacmanSprite
}

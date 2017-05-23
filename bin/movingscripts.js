const {noRow, noCol, boardSize} = require('./boardVars.js');

const edges = {
  "left": "1",
  "up": "1",
  "right": noRow.toString(),
  "down": noCol.toString()
};

const isEdge = function(direction, position) {
  position = position.split("-");
  // row-4-col-4
  if (direction === "left" || direction === "right") {
    if (edges[direction] === position[3]) {
      return true;
    } else {
      return false;
    }
  } else if (direction === "up" || direction === "down") {
    if (edges[direction] === position[1]) {
      return true;
    } else {
      return false;
    }
  }
}

const positionChanger = function(direction, currentPos) {
  if (direction === "left") {
    if (isEdge(direction,currentPos)) {
      return currentPos.split("-").map((a,index)=>{if(index===3){return noCol;} else {return a;}}).join("-");
    } else {
      return currentPos.split("-").map((a,index)=>{if(index===3){return parseInt(a) - 1;} else {return a;}}).join("-");
    }
  } else if (direction === "right") {
    if (isEdge(direction,currentPos)) {
      return currentPos.split("-").map((a,index)=>{if(index===3){return "1";} else {return a;}}).join("-");
    } else {
      return currentPos.split("-").map((a,index)=>{if(index===3){return parseInt(a) + 1;} else {return a;}}).join("-");
    }
  } else if (direction === "up") {
    if (isEdge(direction,currentPos)) {
      return currentPos.split("-").map((a,index)=>{if(index===1){return noRow;} else {return a;}}).join("-");
    } else {
      return currentPos.split("-").map((a,index)=>{if(index===1){return parseInt(a) - 1;} else {return a;}}).join("-");
    }
  } else if (direction === "down") {
    if (isEdge(direction,currentPos)) {
      return currentPos.split("-").map((a,index)=>{if(index===1){return "1";} else {return a;}}).join("-");
    } else {
      return currentPos.split("-").map((a,index)=>{if(index===1){return parseInt(a) + 1;} else {return a;}}).join("-");
    }
  }
  // left subtracts column
  // right adds column
  // up subtracts row
  // down adds row
};

module.exports = {
  isEdge: isEdge,
  positionChanger: positionChanger
}

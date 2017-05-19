const express = require('express');
var app = express();

app.get('/', function(req,res) {
  res.send('Hello World');
});

app.listen(8080, function() {
  console.log('App up at localhost:8080');
});

const trueIsTrue = function() {
  return true === true;
}

module.exports = {
  trueIsTrue: trueIsTrue
}

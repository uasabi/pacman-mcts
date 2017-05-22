const expect = require('chai').expect;
const indexJs = require('../src/index.js');
const request = require('request');

describe("Test suite", function() {
  describe("trueIsTrue()", function() {
    it("should return true", function() {
      var results = indexJs.trueIsTrue();
      expect(results).to.be.true;
    });
  });

  describe("Express server serving Hello World", function() {
    it("Request to server", function() {
      request('http://localhost:8080', function(error, response, body) {
        expect(body).to.equal('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Pacman</title><svg display="none"><symbol id="pacman" width="304px" height="310px" viewbox="0 0 304 310" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M-8.8817842e-16,221.303533 C25.5725766,273.737622 80.5345203,310 144.211886,310 C232.301304,310 303.711886,240.604136 303.711886,155 C303.711886,69.3958638 232.301304,0 144.211886,0 C82.8032711,0 29.5001009,33.7244373 2.84435068,83.1544643 L138.643891,160.52454 L-4.84945417e-13,221.303533 Z" id="Combined-Shape" fill="#F8E81C"/></g></symbol></svg></head><body><svg><use xlink:href="#pacman"/></svg></body></html>');
      });
    });
  });
});

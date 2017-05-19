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
        expect(body).to.equal('Hello World');
      });
    });
  });
});

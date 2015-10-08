/*global window*/
'use strict';

const assert = require('assert');
const btoa = require('../..').btoa;
const stripChars = require('../util').stripChars;
const cases = require('../fixtures/atob').cases;

function browserBtoa(input) {
  try {
    return window.btoa(input);
  } catch(e) {
    return null;
  }
}

describe('btoa', function () {

  cases.forEach(function (input) {
    const inputDescriptor = stripChars(input);

    it(`correctly converts ${inputDescriptor}`, function () {
      assert.strictEqual(btoa(input), browserBtoa(input));
    });
  });

});

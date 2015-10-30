/*global window*/
'use strict';

const assert = require('assert');
const atob = require('../..').atob;
const stripChars = require('../util').stripChars;
const cases = require('../fixtures/atob').cases;

function browserAtob(input) {
  try {
    return window.atob(input);
  } catch(e) {
    return null;
  }
}

describe('atob', function () {

  cases.forEach(function (input) {
    const inputDescriptor = stripChars(input);

    if (navigator.userAgent.indexOf('Windows') >= 0 && ieExemptCases.indexOf(input) >= 0) {
      return;
    }

    it(`correctly converts ${inputDescriptor}`, function () {
      assert.strictEqual(atob(input), browserAtob(input));
    });
  });

});

'use strict';

const assert = require('assert');
const atob = require('..').atob;

const cases = [
  ["", ""],
  ["abcd", String.fromCharCode(105, 0x00b7, 0x001d)],
  [" abcd", String.fromCharCode(105, 0x00b7, 0x001d)],
  // omitted a bunch of tests
  [{toString: function() { return "foo" }}, String.fromCharCode(126, 138)]
];

describe('atob', function () {
 
  cases.forEach(function (testCase) {
    const input = testCase[0];
    const expected = testCase[1];
    it(`correctly converts ${input} into ${expected}`, function () {
      assert.strictEqual(atob(input), expected);
    });
  });

});

'use strict';

const assert = require('assert');
const btoa = require('../..').btoa;
const stripChars = require('../util').stripChars;
const data = require('../fixtures/btoa');
const cases = data.cases;
const answers = data.answers;

describe('btoa', function () {

  cases.forEach(function (input, index) {
    let expected = answers[index];

    // TODO: update answers so this is unnecessary
    if (expected instanceof Array) {
      expected = String.fromCharCode.apply(null, expected);
    }

    const inputDescriptor = stripChars(input);
    const expectedDescriptor = stripChars(expected);

    it(`correctly converts ${inputDescriptor} into ${expectedDescriptor}`, function () {
      assert.strictEqual(btoa(input), expected);
    });
  });

});

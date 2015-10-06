'use strict';

const assert = require('assert');
const btoa = require('..').btoa;
const util = require('./util');
const data = require('./fixtures/btoa');
const cases = data.cases;
const answers = data.answers;

describe('btoa', function () {

  cases.forEach(function (input, index) {
    const expected = util.getAnswer(answers, index);
    const inputDescriptor = util.stripChars(input);
    const expectedDescriptor = util.stripChars(expected);

    it(`correctly converts ${inputDescriptor} into ${expectedDescriptor}`, function () {
      assert.strictEqual(btoa(input), expected);
    });
  });

});

'use strict';

const assert = require('assert');
const atob = require('..').atob;
const util = require('./util');
const data = require('./fixtures/atob');
const cases = data.cases;
const answers = data.answers;

describe('atob', function () {

  cases.forEach(function (input, index) {
    const expected = util.getAnswer(answers, index);
    const inputDescriptor = util.stripChars(input);
    const expectedDescriptor = util.stripChars(expected);

    it(`correctly converts ${inputDescriptor} into ${expectedDescriptor}`, function () {
      assert.strictEqual(atob(input), expected);
    });
  });

});

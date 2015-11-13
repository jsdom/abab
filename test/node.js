'use strict';

const assert = require('assert');
const abab = require('..');
const fixtures = require('./fixtures');

['atob', 'btoa'].forEach(abFnKey => {
  let abFn = abab[abFnKey];
  let cases = fixtures.get(abFnKey);

  cases.forEach(testCase => {
    it(`correctly converts ${testCase.inputDescriptor} into ${testCase.expectedDescriptor}`, () => {
      assert.strictEqual(abFn(testCase.input), testCase.expected);
    });

  });
});

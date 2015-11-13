'use strict';

const assert = require('assert');
const abab = require('..');
const fixtures = require('./fixtures');

const ieExemptCases = fixtures.ieExempt;

const browserAbab = {
  atob: function (input) {
    try {
      return window.atob(input);
    } catch (e) {
      return null;
    }
  },
  btoa: function (input) {
    try {
      return window.btoa(input);
    } catch (e) {
      return null;
    }
  }
};

['atob', 'btoa'].forEach(abFnKey => {
  let abFn = abab[abFnKey];
  let browserFn = browserAbab[abFnKey];
  let cases = fixtures.get(abFnKey);

  cases.forEach(testCase => {

    if (navigator.userAgent.indexOf('Windows') >= 0 && ieExemptCases.indexOf(testCase.input) >= 0) {
      return;
    }

    it(`correctly converts ${testCase.inputDescriptor} into ${testCase.expectedDescriptor}`, () => {
      assert.strictEqual(abFn(testCase.input), browserFn(testCase.input));
    });

  });
});

/* eslint-env browser, mocha */

"use strict";

const assert = require("assert");
const abab = require("..");
const fixtures = require("./fixtures");

const ieExemptCases = fixtures.ieExempt;

const browserAbab = {
  atob(input) {
    try {
      return window.atob(input);
    } catch (e) {
      return null;
    }
  },
  btoa(input) {
    try {
      return window.btoa(input);
    } catch (e) {
      return null;
    }
  }
};

["atob", "btoa"].forEach(abFnKey => {
  const abFn = abab[abFnKey];
  const browserFn = browserAbab[abFnKey];
  const cases = fixtures.get(abFnKey);

  describe(abFnKey, () => {
    cases.forEach(testCase => {
      if (navigator.userAgent.indexOf("Windows") >= 0 && ieExemptCases.indexOf(testCase.input) >= 0) {
        return;
      }

      it(`correctly converts ${testCase.inputDescriptor} into ${testCase.expectedDescriptor}`, () => {
        assert.strictEqual(abFn(testCase.input), browserFn(testCase.input));
      });
    });
  });
});

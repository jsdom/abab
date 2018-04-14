/* eslint-env mocha */

"use strict";

const assert = require("assert");
const abab = require("..");
const fixtures = require("./fixtures");

["atob", "btoa"].forEach(abFnKey => {
  const abFn = abab[abFnKey];
  const cases = fixtures.get(abFnKey);

  it(`${abFnKey} rejects symbol input`, () => {
    assert.throws(() => {
      abFn(Symbol.iterator);
    }, TypeError);
  });

  cases.forEach(testCase => {
    it(`correctly converts ${testCase.inputDescriptor} into ${testCase.expectedDescriptor}`, () => {
      assert.strictEqual(abFn(testCase.input), testCase.expected);
    });
  });
});

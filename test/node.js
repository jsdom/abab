/* eslint-env mocha */

"use strict";

const assert = require("assert");
const abab = require("..");
const fixtures = require("./fixtures");

const keystr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

for (let i = 0; i < 256; i++) {
  const input = `\0\0${String.fromCharCode(i)}`;
  const output = abab.btoa(input);

  const expectedOutput = `AA${keystr[Math.floor(i / 64)]}${keystr[i % 64]}`;

  it(`correctly converts ASCII char ${i} into ${expectedOutput}`, () => {
    assert.strictEqual(expectedOutput, output);
  });
}

for (let i = 0; i < 64; i++) {
  const input = `AAA${keystr[i]}`;
  const output = abab.atob(input);

  it(`correctly converts ${input} into ${keystr[i]}`, () => {
    assert.strictEqual(i, output.charCodeAt(2));
  });
}

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

"use strict";

const { stripChars } = require("./util");

const fixtures = {};

function charCodeArrayToString(expected) {
  if (Array.isArray(expected)) {
    return String.fromCharCode(...expected);
  }
  return expected;
}

module.exports.get = function (key) {
  return fixtures[key].map(fixture => {
    return {
      input: fixture[0],
      expected: charCodeArrayToString(fixture[1]),
      inputDescriptor: stripChars(fixture[0]),
      expectedDescriptor: stripChars(fixture[1])
    };
  });
};

fixtures.atob = [
  ["", []],
  ["abcd", [105, 183, 29]],
  [" abcd", [105, 183, 29]],
  ["abcd ", [105, 183, 29]],
  [" abcd===", null],
  ["abcd=== ", null],
  ["abcd ===", null],
  ["a", null],
  ["ab", [105]],
  ["abc", [105, 183]],
  ["abcde", null],
  [String.fromCharCode(0xd800, 0xdc00), null],
  ["=", null],
  ["==", null],
  ["===", null],
  ["====", null],
  ["=====", null],
  ["a=", null],
  ["a==", null],
  ["a===", null],
  ["a====", null],
  ["a=====", null],
  ["ab=", null],
  ["ab==", [105]],
  ["ab===", null],
  ["ab====", null],
  ["ab=====", null],
  ["abc=", [105, 183]],
  ["abc==", null],
  ["abc===", null],
  ["abc====", null],
  ["abc=====", null],
  ["abcd=", null],
  ["abcd==", null],
  ["abcd===", null],
  ["abcd====", null],
  ["abcd=====", null],
  ["abcde=", null],
  ["abcde==", null],
  ["abcde===", null],
  ["abcde====", null],
  ["abcde=====", null],
  ["=a", null],
  ["=a=", null],
  ["a=b", null],
  ["a=b=", null],
  ["ab=c", null],
  ["ab=c=", null],
  ["abc=d", null],
  ["abc=d=", null],
  // With whitespace
  ["ab\tcd", [105, 183, 29]],
  ["ab\ncd", [105, 183, 29]],
  ["ab\fcd", [105, 183, 29]],
  ["ab\rcd", [105, 183, 29]],
  ["ab cd", [105, 183, 29]],
  ["ab\u00a0cd", null],
  ["ab\t\n\f\r cd", [105, 183, 29]],
  [" \t\n\f\r ab\t\n\f\r cd\t\n\f\r ", [105, 183, 29]],
  ["ab\t\n\f\r =\t\n\f\r =\t\n\f\r ", [105]],
  // Test if any bits are set at the end.  These should all be fine, since
  // they end with A, which becomes 0:
  ["A", null],
  ["/A", [252]],
  ["//A", [255, 240]],
  ["///A", [255, 255, 192]],
  ["////A", null],
  // These are all bad, since they end in / (= 63, all bits set) but their
  // length isn't a multiple of four characters, so they can't be output by
  // btoa(). Thus one might expect some UAs to throw exceptions or otherwise
  // object, since they could never be output by btoa(), so they're good to
  // test.
  ["/", null],
  ["A/", [3]],
  ["AA/", [0, 15]],
  ["AAAA/", null],
  // But this one is possible:
  ["AAA/", [0, 0, 63]],
  // Binary-safety tests
  ["\0nonsense", null],
  ["abcd\0nonsense", null],
  // WebIDL tests
  [undefined, null],
  [null, [158, 233, 101]],
  [7, null],
  [12, [215]],
  [1.5, null],
  [true, [182, 187, 158]],
  [false, null],
  [NaN, [53, 163]],
  [Number(Infinity), [34, 119, 226, 158, 43, 114]],
  [-Infinity, null],
  [0, null],
  [-0, null],
  [
    { toString() {
      return "foo";
    } }, [126, 138]
  ],
  [
    { toString() {
      return "abcd";
    } }, [105, 183, 29]
  ]
];

fixtures.btoa = [
  ["עברית", null],
  ["", []],
  ["ab", [89, 87, 73, 61]],
  ["abc", [89, 87, 74, 106]],
  ["abcd", [89, 87, 74, 106, 90, 65, 61, 61]],
  ["abcde", [89, 87, 74, 106, 90, 71, 85, 61]],
  // This one is thrown in because IE9 seems to fail atob(btoa()) on it.  Or
  // possibly to fail btoa(). I actually can't tell what's happening here,
  // but it doesn't hurt.
  ["\xff\xff\xc0", [47, 47, 47, 65]],
  // Is your DOM implementation binary-safe?
  ["\0a", [65, 71, 69, 61]],
  ["a\0b", [89, 81, 66, 105]],
  // WebIDL tests.
  [undefined, [100, 87, 53, 107, 90, 87, 90, 112, 98, 109, 86, 107]],
  [null, [98, 110, 86, 115, 98, 65, 61, 61]],
  [7, [78, 119, 61, 61]],
  [12, [77, 84, 73, 61]],
  [1.5, [77, 83, 52, 49]],
  [true, [100, 72, 74, 49, 90, 81, 61, 61]],
  [false, [90, 109, 70, 115, 99, 50, 85, 61]],
  [NaN, [84, 109, 70, 79]],
  [Number(Infinity), [83, 87, 53, 109, 97, 87, 53, 112, 100, 72, 107, 61]],
  [-Infinity, [76, 85, 108, 117, 90, 109, 108, 117, 97, 88, 82, 53]],
  [0, [77, 65, 61, 61]],
  [-0, [77, 65, 61, 61]],
  [
    { toString() {
      return "foo";
    } }, [90, 109, 57, 118]
  ]
];

// These are cases in which IE's atob behavior is divergent
// from other implementations. We currently skip these cases.

module.exports.ieExempt = [
  " abcd",
  "abcd ",
  "ab\tcd",
  "ab\ncd",
  "ab\fcd",
  "ab\rcd",
  "ab cd",
  "ab\u00a0cd",
  "ab\t\n\f\r cd",
  " \t\n\f\r ab\t\n\f\r cd\t\n\f\r ",
  "ab\t\n\f\r =\t\n\f\r =\t\n\f\r "
];

'use strict';
module.exports = {
  stripChars: function (str) {
    if (typeof str === 'string') {
      return str.replace(/[^\x20-\x7F]/g, '?');
    } else {
      return str;
    }
  },
  getAnswer: function (answers, index) {
    const expected = answers[index];

    // TODO: update answers so this is unnecessary
    if (expected instanceof Array) {
      return String.fromCharCode.apply(null, expected);
    }
    return expected;
  }
};

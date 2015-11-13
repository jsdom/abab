'use strict';

module.exports = {
  stripChars: function (str) {
    if (typeof str === 'string') {
      return str.replace(/[^\x20-\x7F]/g, '?');
    } else {
      return str;
    }
  }
};

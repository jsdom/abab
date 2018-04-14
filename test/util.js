"use strict";

module.exports = {
  stripChars(str) {
    if (typeof str === "string") {
      return str.replace(/[^\x20-\x7F]/g, "?");
    }
    return str;
  }
};

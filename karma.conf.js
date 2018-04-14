"use strict";

module.exports = function (config) {
  config.set({
    basePath: "",
    files: ["./test/browser.js"],

    preprocessors: {
      "test/browser.js": ["webpack"]
    },

    webpack: {
      mode: "development"
    },

    frameworks: ["mocha"],

    reporters: ["dots"],

    browsers: ["Firefox"],
    singleRun: true
  });
};

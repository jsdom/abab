"use strict";

const webpack = require("webpack");

module.exports = function (config) {
  config.set({
    basePath: "",
    files: ["./test/browser.js"],

    preprocessors: {
      "test/browser.js": ["webpack"]
    },

    webpack: {
      mode: "development",
      plugins: [
        new webpack.ProvidePlugin({
          process: "process"
        })
      ]
    },

    frameworks: ["mocha", "webpack"],

    reporters: ["dots"],

    browsers: ["Firefox"],
    singleRun: true
  });
};

'use strict';

module.exports = function (config) {
  config.set({
    basePath: '',
    files: ['./test/browser.js'],

    preprocessors: {
      'test/browser.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [{
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel?presets[]=es2015'
        }]
      }
    },

    frameworks: ['mocha'],

    reporters: ['dots'],

    browsers: ['Firefox'],
    singleRun: true
  });
};

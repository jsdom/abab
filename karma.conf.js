function prefixTag(tagValue, tagPrefix) {
  return tagValue ? (tagPrefix ? tagPrefix + ":" + tagValue : tagValue) : undefined;
}

const sauceBrowsers = {
  'Chrome': {
    base: 'SauceLabs',
    browserName: 'Chrome'
  },
  'Firefox': {
    base: 'SauceLabs',
    browserName: 'Firefox'
  },
  'Internet Explorer': {
    base: 'SauceLabs',
    browserName: 'Internet Explorer'
  }
};
const browsers = process.env.SAUCE_USERNAME ? Object.keys(sauceBrowsers) : ['Firefox'];
if(!!process.env.SAUCE_USERNAME !== !!process.env.SAUCE_ACCESS_KEY) {
    throw new Error('Both SAUCE_USERNAME and SAUCE_ACCESS_KEY should be configured');
}

module.exports = function(config) {
  config.set({
    basePath: "",
    files: ['./test/browser/*.js'],

    preprocessors: {
      'test/browser/*.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [{
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel?optional[]=runtime&stage=0'
        }]
      }
    },

    frameworks: ["mocha"],

    reporters: ["dots", "saucelabs"],

    sauceLabs: {
      title: process.env.BUILD_NAME,
      tags:
        [
          prefixTag(process.env.TRAVIS_BRANCH, "branch"),
          prefixTag(process.env.TRAVIS_PULL_REQUEST, "pr"),
          prefixTag(process.env.TRAVIS_COMMIT, "commit"),
          prefixTag(process.env.TRAVIS_TAG, "tag")
        ]
        .filter(function(t) {
          // Remove useless tags
          return !!t && t !== "false";
        }),
      "public": "public"

    },

    customLaunchers: process.env.SAUCE_USERNAME && sauceBrowsers,

    browsers: browsers,
    singleRun: true
  });
};

'use strict';

const assert = require('assert');
const wd = require('wd');
const util = require('./util');
const abab = require('..');
const atob = abab.atob;
const btoa = abab.btoa;

function escape(input) {
    return typeof input === 'string' ? JSON.stringify(input) : '' +input;
}

function evaluateExpression(fn, input) {
    return `(function() {
      try {
        return ${fn}(${escape(input)});
      } catch(e) {
        return null;
      }
    })()`
}

const browsers = ['chrome', 'firefox', 'internet explorer'];

if (process.env.SAUCE_USERNAME) {
  const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
  const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

  describe('browser compatibility', function () {
    browsers.forEach(function (browserName) {
      describe(browserName, function () {
        var browser;
        before(function () {
          this.timeout(10000);
          return browser = wd.promiseChainRemote('ondemand.saucelabs.com', 80, SAUCE_USERNAME, SAUCE_ACCESS_KEY)
            .init({browserName: browserName})
            .get('about:blank');
        });
        after(function () {
          return browser.quit();
        });

        beforeEach(function() {
            this.timeout(10000);
        });

        describe('atob', function () {
          const data = require('./fixtures/atob');
          const cases = data.cases;
          const answers = data.answers;
          cases.forEach(function (input, index) {
            const expected = util.getAnswer(answers, index);
            const inputDescriptor = util.stripChars(input);
            const expectedDescriptor = util.stripChars(expected);

            it(`correctly converts ${inputDescriptor} into ${expectedDescriptor}`, function () {
              return browser.eval(evaluateExpression('atob', input)).then(function (result) {
                assert.strictEqual(atob(input), result);
              });
            });
          });
        });

        describe('btoa', function () {
          const data = require('./fixtures/btoa');
          const cases = data.cases;
          const answers = data.answers;
          cases.forEach(function (input, index) {
            const expected = util.getAnswer(answers, index);
            const inputDescriptor = util.stripChars(input);
            const expectedDescriptor = util.stripChars(expected);

            it(`correctly converts ${inputDescriptor} into ${expectedDescriptor}`, function () {
              return browser.eval(evaluateExpression('btoa', input)).then(function (result) {
                assert.strictEqual(btoa(input), result);
              });
            });
          });
        });

      });
    });
  });
} else {
  xit('browser tests are skipped', function () {});
}

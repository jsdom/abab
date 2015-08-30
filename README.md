# abab

WHATWG spec-compliant implementations of `window.atob` and `window.btoa`. The code in this module is originally from [w3c/web-platform-tests](https://github.com/w3c/web-platform-tests/blob/master/html/webappapis/atob/base64.html).

Compatibility: io.js (all major versions), browsers (using browserify or webpack)

## Contributing

- See the [PR checklist](CHECKLISTS.md)

# TODO

- [ ] Adapt raw file in ./test to real mocha tests
- [ ] Test all major versions of io.js on Travis CI
- [ ] Investigate browser testing story
- [ ] Update compatibility with specific browsers
- [ ] Add deploy checklist
- [ ] Investigate linting situation (clone jsdom's?) 
- [ ] Fill in rest of README
- [ ] Figure out LICENSE situation - the copyright is owned by Google, I believe

# Ideas

- If we can set up browser testing (Sauce?), would be cool to test against every browser's implementation of atob/btoa

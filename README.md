# abab

A module that implements `window.atob` and `window.btoa` according to the [WHATWG spec](https://html.spec.whatwg.org/multipage/webappapis.html#atob). The code is originally from [w3c/web-platform-tests](https://github.com/w3c/web-platform-tests/blob/master/html/webappapis/atob/base64.html).

Compatibility: io.js (all major versions), browsers (using browserify or webpack)

Install with `npm`:

```sh
npm install abab
```

## API

### `btoa`

```js
const btoa = require('abab').btoa;
atob('Hello, world!'); // 'SGVsbG8sIHdvcmxkIQ=='
```

### `atob`

```js
const atob = require('abab').atob;
atob('SGVsbG8sIHdvcmxkIQ=='); // 'Hello, world!'
```

## Contributing

- See the [PR checklist](CHECKLISTS.md)

# TODO

- [ ] Adapt raw file in ./test to real mocha tests
- [ ] Investigate browser testing story
- [ ] After above, update compatibility section with specific browsers
- [ ] Test all major versions of io.js on Travis CI
- [x] Add deploy checklist
- [ ] Investigate linting situation (clone jsdom's?) 
- [x] Fill in rest of README
- [ ] Figure out LICENSE situation - the copyright is owned by Google, I believe

# Ideas

- If we can set up browser testing (Sauce?), would be cool to test against every browser's implementation of atob/btoa

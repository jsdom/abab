# abab

[![npm version](https://badge.fury.io/js/abab.svg)](https://www.npmjs.com/package/abab)

A module that implements `window.atob` and `window.btoa` according to the [WHATWG spec](https://html.spec.whatwg.org/multipage/webappapis.html#atob). The code is originally from [w3c/web-platform-tests](https://github.com/w3c/web-platform-tests/blob/master/html/webappapis/atob/base64.html).

Compatibility: Node.js version 3+ and all major browsers (using browserify or webpack and an ES6 transpiler)

Install with `npm`:

```sh
npm install abab
```

## API

### `btoa` (base64 encode)

```js
const btoa = require('abab').btoa;
btoa('Hello, world!'); // 'SGVsbG8sIHdvcmxkIQ=='
```

### `atob` (base64 decode)

```js 
const atob = require('abab').atob;
atob('SGVsbG8sIHdvcmxkIQ=='); // 'Hello, world!'
```

#### Valid characters

[Per the spec](https://html.spec.whatwg.org/multipage/webappapis.html#atob:dom-windowbase64-btoa-3), `btoa` will accept strings "containing only characters in the range `U+0000` to `U+00FF`." If passed a string with characters above `U+00FF`, `btoa` will return `null`. If `atob` is passed a string that is not base64-valid, it will also return `null`. In both cases when `null` is returned, the spec calls for throwing a `DOMException` of type `InvalidCharacterError`.

## Browsers

If you want to include just one of the methods to save bytes in your client-side code, you could `require` the desired module directly.

```js
var atob = require('abab/lib/atob');
var btoa = require('abab/lib/btoa');
```

## Contributing

- See the [PR checklist](CONTRIBUTING.md#checklists)

# Ideas

- If we can set up browser testing (Sauce?), would be cool to test against every browser's implementation of atob/btoa

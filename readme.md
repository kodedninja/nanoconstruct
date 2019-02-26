# nanoconstruct
<a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
  <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" alt="Stability"/>
</a>
<a href="https://www.npmjs.com/package/nanoconstruct">
  <img src="https://img.shields.io/npm/v/nanoconstruct.svg?style=flat-square" alt="NPM version"/>
</a>

Tiny tool to test and develop [nanocomponents](https://github.com/choojs/nanocomponent).

`nanoconstruct` is a very simple wrapper around your components. It's inspired by [Kit](https://github.com/c8r/kit), uses [budo](https://github.com/mattdesl/budo) under the hood and contains snippets from [jalla](https://github.com/jallajs/jalla).

![Demo of nanoconstruct](demo.gif)

## Installation
```
npm i nanoconstruct
```

## Getting Started
If your component depends on custom states or parameters, you can wrap it into a simple wrapper function. Otherwise, input the component's file.

A simple wrapper function looks like this:
```javascript
var html = require('choo/html')
var Component = require('./components/component')

var c = new Component()

module.exports = () => html`${c.render()}`
```
Then just point `nanoconstruct` to this file with:
```
nanoconstruct example.js
```

### Multiple Components
It's also possible to use your whole component library at once. Just export all the wrapper functions from a `.js` file.

Like this:
```javascript
module.exports = {
  Title: require('./title-wrapper'),
  Content: require('./component/content')
}
```

## Usage
```
usage
  nanoconstruct [opts] <entry>
options
  --help, -h              show this help text
  --port, -p              server port
  --version, -v           print version
  --open, -o              open the page in the browser
examples
  start server
  nanoconstruct example.js

  start server on port 3000 and open it
  nanoconstruct example.js -p 3000 -o
```

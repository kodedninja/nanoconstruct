var html = require('choo/html')
var assert = require('assert')

var components = require('../../tmp')
// In case of a single component, simply wrap it
if (typeof components !== 'object') {
  components = {component: components}
}

module.exports = view

function view (state, emit) {
  return html`
    <body>
      ${Object.keys(components).map(key => {
        assert(typeof components[key] === 'function', 'nanoconstruct: You must wrap your components into functions.')

        return components[key]()
      })}
    </body>
  `

  function sidebar () {
    return html`
      <div>
        sidebar
      </div>
    `
  }
}

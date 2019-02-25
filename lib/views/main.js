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
      <div class="dx h100">
        ${Object.keys(components).length > 1 ? sidebar() : ''}
        ${inspector()}
      </div>
    </body>
  `

  function inspector () {
    var selected = state.nanoconstruct.selected
    return html`
      <div class="p1">
        ${selected ? components[selected]() : ''}
      </div>
    `
  }

  function sidebar () {
    return html`
      <div class="p1 br w250px">
        ${Object.keys(components).map(componentLink)}
      </div>
    `

    function componentLink (name) {
      // We also check if all the wrappers are correct
      assert(typeof components[name] === 'function', 'nanoconstruct: You must wrap your components into functions.')

      return html`
        <a href="#" class="db" onclick="${select}">${name}</a>
      `

      function select (e) {
        e.preventDefault()
        emit(state.events.SELECT, name)
      }
    }
  }
}

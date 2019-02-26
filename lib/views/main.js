var html = require('choo/html')
var assert = require('assert')

var components = require('../../tmp')
// Handle single components
if (typeof components !== 'object') {
  components = { component: components }
}
Object.keys(components).map(name => {
  var component = components[name]
  // If the component wasn't wrapped, we wrap it
  if (component.prototype && typeof component.prototype.createElement === 'function') {
    components[name] = wrap(component)
  }
  // We also check if all the wrappers are correct
  assert(typeof components[name] === 'function', 'nanoconstruct: Wrapper around component must be function')
})

var componentsCount = Object.keys(components).length

module.exports = view

function view (state, emit) {
  var selected = componentsCount > 1 ? state.params.component : 'component'

  return html`
    <body>
      <div class="dx h100vh">
        ${componentsCount > 1 ? sidebar() : ''}
        ${inspector()}
      </div>
    </body>
  `

  function inspector () {
    return html`
      <div class="p1 1">
        ${selected ? components[selected]() : placeholder()}
      </div>
    `

    function placeholder () {
      return html`
        <div class="dx center h100">
          <div class="f1">← Select a component to inspect.</div>
        </div>
      `
    }
  }

  function sidebar () {
    return html`
      <div class="br w250px lh nano">
        ${Object.keys(components).map(componentLink)}
      </div>
    `

    function componentLink (name) {
      return html`
        <a href="/${name}" class="db px1 ${selected === name ? 'black tcwhite' : 'tcblack'}">${name}</a>
      `
    }
  }
}

function wrap (Component) {
  return () => html`
    ${(new Component()).render()}
  `
}

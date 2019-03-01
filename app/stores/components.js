var html = require('choo/html')
var components = require('../../tmp')

// Handle single components
if (typeof components !== 'object' || (typeof components.render === 'function')) {
  components = { default: components }
}

module.exports = function (state, emitter) {
  state.nanoconstruct = {
    components: components
  }

  Object.keys(state.nanoconstruct.components).map(name => {
    var component = state.nanoconstruct.components[name]
    // If the component wasn't wrapped, we wrap it
    if (component.prototype && typeof component.prototype.createElement === 'function') {
      state.nanoconstruct.components[name] = wrap(component)
    }
  })

  state.nanoconstruct.componentsCount = Object.keys(components).length
}

function wrap (Component) {
  return () => html`
    ${(new Component()).render()}
  `
}

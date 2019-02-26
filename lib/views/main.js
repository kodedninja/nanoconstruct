var html = require('choo/html')

var components = require('../../tmp')
// Handle single components
if (typeof components !== 'object') {
  components = { default: components }
}
Object.keys(components).map(name => {
  var component = components[name]
  // If the component wasn't wrapped, we wrap it
  if (component.prototype && typeof component.prototype.createElement === 'function') {
    components[name] = wrap(component)
  }
})

var componentsCount = Object.keys(components).length

module.exports = view

function view (state, emit) {
  var selected = null
  if (componentsCount > 1) {
    if (components[state.params.component] !== undefined) {
      selected = state.params.component
    }
  } else {
    selected = 'default'
  }

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
        ${selected ? renderComponent() : message('← Select a component to inspect.')}
      </div>
    `

    function renderComponent () {
      if (typeof components[selected] !== 'function') return message('Cannot render component :(')
      // Render component
      return html`
        ${components[selected]()}
      `
    }

    function message (string) {
      return html`
        <div class="dx center h100">
          <div class="f1">${string}</div>
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

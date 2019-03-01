var html = require('choo/html')

module.exports = view

function view (state, emit) {
  var selected = null
  if (state.nanoconstruct.componentsCount > 1) {
    if (state.nanoconstruct.components[state.params.component] !== undefined) {
      selected = state.params.component
    }
  } else {
    selected = 'default'
  }

  return html`
    <body>
      <div class="dx h100vh">
        ${state.nanoconstruct.componentsCount > 1 ? sidebar() : ''}
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
      if (typeof state.nanoconstruct.components[selected] !== 'function') return message('Cannot render component :(')
      // Render component
      return html`
        ${state.nanoconstruct.components[selected]()}
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
        ${Object.keys(state.nanoconstruct.components).map(componentLink)}
      </div>
    `

    function componentLink (name) {
      return html`
        <a href="/${name}" class="db px1 ${selected === name ? 'black tcwhite' : 'tcblack'}">${name}</a>
      `
    }
  }
}

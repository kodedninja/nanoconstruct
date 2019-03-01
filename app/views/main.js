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
      var componentRender = state.nanoconstruct.components[selected]
      // Use render as the default method of the wrapper
      if (typeof componentRender !== 'function') {
        if (typeof componentRender.render === 'function') {
          componentRender = componentRender.render
        } else {
          return message('The component or the wrapper is not exported correctly.')
        }
      }

      var el = html`${componentRender()}`
      // pass it to test runner
      emit(state.events.TEST, selected, el)

      return el
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

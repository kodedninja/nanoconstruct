var html = require('choo/html')
var sidebar = require('../components/sidebar')
var inspector = require('../components/inspector')

module.exports = view

function view (state, emit) {
  var selected = null
  // get the current selected component, fallback to default
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
        ${renderSidebar()}
        ${inspector(state.nanoconstruct.components[selected], selected, state.events)}
      </div>
    </body>
  `

  function renderSidebar() {
    return state.nanoconstruct.componentsCount > 1 ?
      sidebar(Object.keys(state.nanoconstruct.components), selected) :
      null
  }
}

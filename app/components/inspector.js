var html = require('choo/html')
var { emit } = require('choo-shortemit')

module.exports = inspector

function inspector (componentRenderer, selected, events) {
  return html`
    <div class="p1 1">
      ${selected ? renderComponent() : message('← Select a component to inspect.')}
    </div>
  `

  function renderComponent () {
    // Use render as the default method of the wrapper
    if (typeof componentRenderer !== 'function') {
      if (typeof componentRenderer.render === 'function') {
        componentRenderer = componentRenderer.render
      } else {
        return message('The component or the wrapper is not exported correctly.')
      }
    }

    var el = html`${componentRenderer()}`
    // pass it to test runner
    emit(events.TEST, selected, el)

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

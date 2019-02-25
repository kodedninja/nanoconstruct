var html = require('choo/html')
var component = require('../../tmp')

module.exports = view

function view (state, emit) {
  return html`
    <body>
      ${component()}
    </body>
  `
}

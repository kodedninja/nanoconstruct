var html = require('choo/html')
var Alert = require('./components/alert')

var component = new Alert('Click me!')

module.exports = () => html`
  ${component.render(':)')}
`

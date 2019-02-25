var html = require('choo/html')
var Alert = require('./components/alert')

var component = new Alert()

module.exports = () => html`
  ${component.render()}
`

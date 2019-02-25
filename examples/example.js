var html = require('choo/html')
var SimpleComponent = require('./components/simple')

var component = new SimpleComponent()

module.exports = () => html`
  ${component.render()}
`

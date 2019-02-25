var html = require('choo/html')
var SimpleComponent = require('./component')

var component = new SimpleComponent()

module.exports = () => html`
  ${component.render()}
`

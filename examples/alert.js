var html = require('choo/html')
var Alert = require('./components/alert')

var component = new Alert('Click me!')

module.exports = {
  render: () => html`
    ${component.render(':)')}
  `,
  test: (t, el) => {
    t.plan(1)
    t.equal(el.innerHTML, 'Click me!')
  }
}

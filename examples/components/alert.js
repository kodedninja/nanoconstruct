var Component = require('choo/component')
var html = require('choo/html')

module.exports = class SimpleComponent extends Component {
  constructor (message) {
    super()
    this.message = message
  }

  createElement (message) {
    return html`
      <a href="#" onclick="${click}">${this.message}</a>
    `

    function click (e) {
      e.preventDefault()
      alert(message)
    }
  }

  update () {
    return false
  }
}

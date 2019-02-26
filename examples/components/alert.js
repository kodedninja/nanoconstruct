/* global alert */

var Component = require('choo/component')
var html = require('choo/html')

module.exports = class SimpleComponent extends Component {
  constructor (text) {
    super()
    this.text = text
  }

  createElement (message) {
    return html`
      <a href="#" onclick="${click}">${this.text}</a>
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

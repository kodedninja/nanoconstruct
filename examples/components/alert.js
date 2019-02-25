var Component = require('choo/component')
var html = require('choo/html')

module.exports = class SimpleComponent extends Component {
  constructor () {
    super()
    this.click = this.click.bind(this)
  }

  createElement () {
    return html`
      <a href="#" onclick="${this.click}">Click to alert</a>
    `
  }

  click (e) {
    e.preventDefault()
    alert('hello')
    this.rerender()
  }

  update () {
    return false
  }
}

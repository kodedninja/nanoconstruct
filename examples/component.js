var Component = require('choo/component')
var html = require('choo/html')

module.exports = class SimpleComponent extends Component {
  constructor () {
    super()
    this.count = 0

    this.click = this.click.bind(this)
  }

  createElement () {
    return html`
      <div>
        <div>I'm a simple component.</div>
        <div>
          <a href="#" onclick="${this.click}">I can count: ${this.count}</a>
        </div>
      </div>
    `
  }

  click (e) {
    e.preventDefault()
    this.count++
    this.rerender()
  }

  update () {
    return false
  }
}

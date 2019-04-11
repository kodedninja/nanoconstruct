var html = require('choo/html')

module.exports = sidebar

function sidebar (components, selected) {
  return html`
    <div class="br w250px lh nano">
      ${components.map(componentLink)}
    </div>
  `

  function componentLink (name) {
    return html`
      <a href="/${name}" class="db px1 ${selected === name ? 'black tcwhite' : 'tcblack'}">${name}</a>
    `
  }
}

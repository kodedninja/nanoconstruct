var choo = require('choo')
var devtools = require('choo-devtools')
var css = require('sheetify')

css('./styles/style.css')

var app = choo()

// In case anyone needs it (disable logging)
app.use(devtools({
  filter: () => false
}))

app.use(require('choo-shortemit'))
app.use(require('./stores/components'))
app.use(require('./stores/tests'))

app.route('/:component', require('./views/main'))

app.mount('body')

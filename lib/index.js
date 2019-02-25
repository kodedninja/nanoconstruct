var choo = require('choo')
var css = require('sheetify')

css('./styles/style.css')

var app = choo()

// In case anyone needs it
app.use(require('choo-devtools')())

app.use(require('./stores/select'))
app.route('*', require('./views/main'))

app.mount('body')

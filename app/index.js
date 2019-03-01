var choo = require('choo')
var devtools = require('choo-devtools')
var css = require('sheetify')

css('./styles/style.css')

var app = choo()

// In case anyone needs it
app.use(devtools())

app.use(require('./stores/components'))

app.route('/:component', require('./views/main'))

app.mount('body')

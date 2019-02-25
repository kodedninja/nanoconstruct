var choo = require('choo')

var app = choo()

app.route('*', require('./views/main'))

app.mount('body')

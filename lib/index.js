var choo = require('choo')

var app = choo()

// In case anyone needs it
app.use(require('choo-devtools')())

app.route('*', require('./views/main'))

app.mount('body')

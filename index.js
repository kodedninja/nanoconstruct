var budo = require('budo')
var path = require('path')
var dedent = require('dedent')
var chalk = require('chalk')
var fs = require('fs')
var rmrf = require('rimraf')

module.exports = app

var tmpDir = path.join(__dirname, 'tmp')

function app (entry, port) {
  var absolute = path.resolve(entry)

  writeForwarder(absolute)

  budo(path.join(__dirname, 'lib', 'index.js'), {
    live: true,
    port: port
  }).on('connect', function (ev) {
    console.log('\n', chalk.yellow(`Server running on ${chalk.cyan(ev.uri)}.`), '\n')
  }).on('update', function () {
    console.log('Changed!')
  }).on('exit', function () {
    console.log('Goodbye!')
  })
}

function writeForwarder (absolute) {
  // Ensure we have the tmp directory
  !fs.existsSync(tmpDir) && fs.mkdirSync(tmpDir)
  // Do the trick
  fs.writeFileSync(path.join(tmpDir, 'index.js'), dedent`
    module.exports = require('${absolute}')
  `)
}

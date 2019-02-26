var budo = require('budo')
var path = require('path')
var dedent = require('dedent')
var chalk = require('chalk')
var fs = require('fs')
var sheetify = require('sheetify')

module.exports = app

var tmpDir = path.join(__dirname, 'tmp')

function app (entry, opts) {
  var absolute = path.resolve(entry)

  writeForwarder(absolute, opts.library)

  budo(path.join(__dirname, 'lib', 'index.js'), {
    live: true,
    port: opts.port,
    open: opts.open,
    title: 'nanoconstruct',
    pushstate: true,
    browserify: {
      transform: sheetify
    }
  }).on('connect', function (ev) {
    console.log(`\n${chalk.yellow('nanoconstruct')} is listening on ${chalk.cyan(ev.uri)}\n`)
    console.log('Exit by Ctrl + C\n')
  })
}

function writeForwarder (absolute, libraryMode) {
  // Ensure we have the tmp directory
  !fs.existsSync(tmpDir) && fs.mkdirSync(tmpDir)

  if (libraryMode) {
    var files = fs.readdirSync(absolute, { withFileTypes: true })
    // Filter out directories
    files = files.filter(file => !file.isDirectory())
    fs.writeFileSync(path.join(tmpDir, 'index.js'), dedent`
      module.exports = {
        ${files.map(renderFile)}
      }
    `)

    function renderFile (file, id) {
      var componentName = file.name.replace('.js', '')
      return `"${componentName}": require('${absolute}/${file.name}')\n`
    }
  } else {
    // Do the trick
    fs.writeFileSync(path.join(tmpDir, 'index.js'), dedent`
      module.exports = require('${absolute}')
    `)
  }
}

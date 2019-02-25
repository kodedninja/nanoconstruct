var minimist = require('minimist')
var chalk = require('chalk')
var dedent = require('dedent')
var assert = require('assert')
var app = require('.')

var argv = minimist(process.argv.slice(2), {
  alias: {
    'help': 'h',
    'open': 'o',
    'port': 'p',
    'version': 'v'
  },
  default: {
    port: process.env.PORT || 8080
  },
  boolean: [
    'help',
    'open',
    'version'
  ]
})

if (argv.help) {
  console.log('\n', dedent`
    ${chalk.dim('usage')}
      ${chalk.yellow.bold('nanoconstruct')} [opts] <entry>
    ${chalk.dim('options')}
      --help, -h              show this help text
      --port, -p              server port
      --version, -v           print version
      --open, -o
    ${chalk.dim('examples')}
      ${chalk.bold('start server')}
      nanoconstruct example.js

      ${chalk.bold('start server on port 3000')}
      nanoconstruct example.js -p 3000
  `, '\n')
  process.exit(0)
}

if (argv.version) {
  console.log(require('./package.json').version)
  process.exit(0)
}

var entry = argv._[0]
assert(entry, 'nanoconstruct: entry file should be supplied')

app(entry, {
  port: argv.port,
  open: argv.open
})

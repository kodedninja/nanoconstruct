var test = require('tape')

module.exports = tests

function tests (state, emitter) {
  state.events.TEST = 'nanoconstruct:test'

  emitter.on(state.events.TEST, (componentName, el) => {
    var component = state.nanoconstruct.components[componentName]

    if (component && typeof component.test === 'function') {
      run(componentName, el, component.test)
    }
  })
}

function run (name, el, testFunction) {
  test(name, (t) => {
    testFunction(t, el)
  })
}

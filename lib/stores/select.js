module.exports = (state, emitter) => {
  state.nanoconstruct = {
    selected: null
  }

  state.events.SELECT = 'nanoconstruct:select'

  emitter.on(state.events.SELECT, (key) => {
    state.nanoconstruct.selected = key
    emitter.emit('render')
  })
}

'use strict'

class Root extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      width: this.getWindowWidth(),
      height: this.getWindowHeight(),
      keystroke: KeyboardDefault
    }
    this.handleKeystroke = this.handleKeystroke.bind(this)
  }

  getWindowWidth () { return window.innerWidth * 2 }
  getWindowHeight () { return window.innerHeight * 2 }

  componentDidMount () {
    const onResize = (e) => {
      const height = this.getWindowHeight()
      const width = this.getWindowWidth()

      this.setState({ width, height })
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', this.handleKeystroke)
  }

  handleKeystroke (event) {
    switch (event.code) {
      case 'Backspace': // so many poor people have lost so much unsaved state because of this idiotic "shortcut"
      case 'Tab':
        event.preventDefault()
    }

    if (event && event.key) {
      const { altKey, ctrlKey, shiftKey, code, key, location, metaKey, repeat, getModifierState, isComposing, isTrusted } = event

      setCurrentKeystroke({
        altKey,
        ctrlKey,
        shiftKey,
        code,
        key,
        character: filterKeyCharacter(key),
        location,
        metaKey,
        repeat,
        getModifierState,
        isComposing,
        isTrusted
      })
      this.setState({ keystroke: getCurrentKeystrokeOnce })
    }
  }

  render () {
    return (
      <KeyboardContext.Provider value={this.state.keystroke}>
        <svg viewBox={[0, 0, this.state.width, this.state.height]}>
          <App width={this.state.width} height={this.state.height} showLayout />
        </svg>
      </KeyboardContext.Provider>
    )
  }
}

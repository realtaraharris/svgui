'use strict'

const { h, Component } = require('preact')
const merge = require('lodash.merge')

// this is a dispatcher that focuses the KeyboardContext onto the input element in focus
class InputFocuser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      focusedIndex: 0
    }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeystroke = this.handleKeystroke.bind(this)
  }

  handleFocus (index) {
    this.setState({ focusedIndex: index })
  }

  handleKeystroke (event) {
    switch (event.code) {
      case 'Tab': {
        const nextFocusedIndex = this.state.focusedIndex + (event.shiftKey ? -1 : 1)
        const nextChildrenLength = this.props.tabs - 1

        if (nextChildrenLength < nextFocusedIndex) {
          this.handleFocus(0)
        } else if (nextFocusedIndex < 0) {
          this.handleFocus(nextChildrenLength)
        } else {
          this.handleFocus(nextFocusedIndex)
        }
      }
    }
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeystroke)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeystroke)
  }

  render () {
    return this.props.render(this.state.focusedIndex, this.handleFocus)
  }
}

// https://www.w3.org/TR/uievents-code/
const permittedKeys = [
  'Backquote', // `~ on a US keyboard. This is the 半角/全角/漢字 (hankaku/zenkaku/kanji) key on Japanese keyboards
  'Backslash', // Used for both the US \| (on the 101-key layout) and also for the key  located between the ', // and Enter keys on row C of the 102-, 104- and 106-key layouts. Labelled #~ on a UK (102) keyboard.
  'Backspace', // Backspace or ⌫. Labelled Delete on Apple keyboards.
  'BracketLeft', // [{ on a US keyboard.
  'BracketRight', //  ]} on a US keyboard.
  'Comma', // ,< on a US keyboard.
  'Digit0', //  0) on a US keyboard.
  'Digit1', //  1! on a US keyboard.
  'Digit2', //  2@ on a US keyboard.
  'Digit3', //  3# on a US keyboard.
  'Digit4', //  4$ on a US keyboard.
  'Digit5', //  5% on a US keyboard.
  'Digit6', //  6^ on a US keyboard.
  'Digit7', //  7& on a US keyboard.
  'Digit8', //  8* on a US keyboard.
  'Digit9', //  9( on a US keyboard.
  'Equal', // =+ on a US keyboard.
  'IntlBackslash', // Located between the left Shift and Z keys.  Labelled \| on a UK keyboard.
  'IntlRo', //  Located between the / and right Shift keys. Labelled \ろ (ro) on a Japanese keyboard.
  'IntlYen', // Located between the = and Backspace keys. Labelled ¥ (yen) on a Japanese keyboard. \/ on a Russian keyboard.
  'KeyA', //  a on a US keyboard. Labelled q on an AZERTY (e.g., French) keyboard.
  'KeyB', //  b on a US keyboard.
  'KeyC', //  c on a US keyboard.
  'KeyD', //  d on a US keyboard.
  'KeyE', //  e on a US keyboard.
  'KeyF', //  f on a US keyboard.
  'KeyG', //  g on a US keyboard.
  'KeyH', //  h on a US keyboard.
  'KeyI', //  i on a US keyboard.
  'KeyJ', //  j on a US keyboard.
  'KeyK', //  k on a US keyboard.
  'KeyL', //  l on a US keyboard.
  'KeyM', //  m on a US keyboard.
  'KeyN', //  n on a US keyboard.
  'KeyO', //  o on a US keyboard.
  'KeyP', //  p on a US keyboard.
  'KeyQ', //  q on a US keyboard. Labelled a on an AZERTY (e.g., French) keyboard.
  'KeyR', //  r on a US keyboard.
  'KeyS', //  s on a US keyboard.
  'KeyT', //  t on a US keyboard.
  'KeyU', //  u on a US keyboard.
  'KeyV', //  v on a US keyboard.
  'KeyW', //  w on a US keyboard. Labelled z on an AZERTY (e.g., French) keyboard.
  'KeyX', //  x on a US keyboard.
  'KeyY', //  y on a US keyboard. Labelled z on a QWERTZ (e.g., German) keyboard.
  'KeyZ', //  z on a US keyboard. Labelled w on an AZERTY (e.g., French) keyboard, and y on a QWERTZ (e.g., German) keyboard.
  'Minus', // -_ on a US keyboard.
  'Period', //  .> on a US keyboard.
  'Quote', // '', // on a US keyboard.
  'Semicolon', // ;: on a US keyboard.
  'Slash', // /? on a US keyboard.

  'Space'
]

class InputController extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayValue: ''
    }

    this.handleKeystroke = this.handleKeystroke.bind(this)
  }

  handleKeystroke (event) {
    const focused = this.props.tabIndex === this.props.focusedIndex
    if (!focused) { return }

    if (!permittedKeys.find(permittedKey => event.code === permittedKey)) { return }

    switch (event.code) {
      case 'Shift':
      case 'Meta':
      case 'Tab': // ignore
        break
      case 'Backspace': // ignore
        this.setState({ displayValue: this.state.displayValue.slice(0, this.state.displayValue.length - 1) })
        break

      default: {
        this.setState({ displayValue: this.state.displayValue + event.key })
      }
    }
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeystroke)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeystroke)
  }

  render () {
    const focused = this.props.tabIndex === this.props.focusedIndex
    return (
      <Input {...this.props} text={this.state.displayValue} focused={focused} />
    )
  }
}

const Input = (props) => {
  const textHeight = 21
  return (
    <g>
      <rect
        x={0}
        y={0}
        width={props.width}
        height={props.height}
        stroke={props.focused ? 'skyblue' : 'gray'}
        strokeWidth={props.focused ? 4 : 0}
        fill={'darkgray'}
        rx={4}
        ry={4}
        onMouseEnter={(event) => console.log('mouseEnter', event)}
        onClick={(event) => props.onClick(props.tabIndex)}
      />
      <text
        x={20}
        y={(props.height / 2) + (textHeight / 2)}
        fill={!props.text ? 'gray' : 'black'}
        style={{ font: '30px sans-serif' }}
      >{!props.text ? props.placeholder : props.text}</text>
    </g>
  )
}

module.exports = { InputFocuser, InputController, Input }

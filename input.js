'use strict'

// this is a dispatcher that focuses the KeyboardContext onto the input element in focus
class InputFocuser extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      focusedIndex: 0
    }

    this.handleFocus = this.handleFocus.bind(this)
  }

  handleFocus (index) {
    this.setState({ focusedIndex: index })
  }

  render () {
    const { keystroke } = this.props

    if (keystroke.code === 'Tab') {
      const nextFocusedIndex = this.state.focusedIndex + (keystroke.shiftKey ? -1 : 1)
      const nextChildrenLength = this.props.tabs - 1

      if (nextChildrenLength < nextFocusedIndex) {
        this.state.focusedIndex = 0
      } else if (nextFocusedIndex < 0) {
        this.state.focusedIndex = nextChildrenLength
      } else {
        this.state.focusedIndex = nextFocusedIndex
      }
    }

    return this.props.render(this.state.focusedIndex, this.handleFocus)
  }
}

class InputController extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayValue: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps || !nextProps.keystroke || !nextProps.keystroke.code) { return }

    const focused = nextProps.tabIndex === nextProps.focusedIndex
    if (!focused) { return }

    if (nextProps.keystroke.code === 'Backspace') {
      this.setState({ displayValue: this.state.displayValue.slice(0, this.state.displayValue.length - 1) })
    } else {
      this.setState({ displayValue: this.state.displayValue + nextProps.keystroke.character })
    }
  }

  render () {
    return (
      <Input {...this.props} text={this.state.displayValue} focused={this.props.tabIndex === this.props.focusedIndex} />
    )
  }
}

const Input = (props) => {
  const textHeight = 21
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

'use strict'

// this is a dispatcher that focuses the KeyboardContext onto the input element in focus
class InputFocuser extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      focusIndex: 0
    }

    this.handleFocus = this.handleFocus.bind(this)
  }

  handleFocus (index) {
    this.setState({ focusIndex: index })
  }

  render () {
    const keystroke = this.props.keystroke()

    if (keystroke.code === 'Tab') {
      const nextFocusedIndex = this.state.focusIndex + (keystroke.shiftKey ? -1 : 1)
      const nextChildrenLength = this.props.children.length - 1

      if (nextChildrenLength < nextFocusedIndex) {
        this.state.focusIndex = 0
      } else if (nextFocusedIndex < 0) {
        this.state.focusIndex = nextChildrenLength
      } else {
        this.state.focusIndex = nextFocusedIndex
      }
    }

    return normalizeChildren(this.props.children).map((child, index) => {
      if (index === this.state.focusIndex) {
        return forwardProps(child, {
          focused: true,
          keystroke: keystroke,
          onClick: this.handleFocus,
          index
        })
      }

      return forwardProps(child, {
        onClick: this.handleFocus,
        index
      })
    })
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

    if (nextProps.keystroke.code === 'Backspace') {
      this.setState({ displayValue: this.state.displayValue.slice(0, this.state.displayValue.length - 1) })
    } else {
      this.setState({ displayValue: this.state.displayValue + nextProps.keystroke.character })
    }
  }

  render () {
    return (
      <Input {...this.props} text={this.state.displayValue} />
    )
  }
}

const Input = (props) => {
  return (
    <React.Fragment>
      <rect
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        stroke={props.focused ? 'skyblue' : 'gray'}
        strokeWidth={props.focused ? 4 : 0}
        fill={'darkgray'}
        rx={4}
        ry={4}
        onMouseEnter={(event) => console.log('mouseEnter', event)}
        onClick={(event) => props.onClick(props.index)}
      />
      <text
        x={props.x}
        y={props.y + (props.height / 2) }
        fill={'black'}
        style={{ font: '30px sans-serif' }}
      >{props.text}</text>
    </React.Fragment>
  )
}

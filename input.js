'use strict'

class InputController extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayValue: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.keystroke === undefined) { return }
    this.setState({ displayValue: this.state.displayValue + nextProps.keystroke })
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

'use strict'

class InputController extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayValue: ''
    }

    this.onKeyUp = this.onKeyUp.bind(this)
  }

  onKeyUp ({ charCode, keyCode }) {
    if (keyCode === 8) {
      const displayValue = this.state.displayValue.slice(0, this.state.displayValue.length - 1)
      console.log('displayValue:', displayValue)
      this.setState({ displayValue })
    } else {
      console.log('charCode:', charCode)
      this.setState({ displayValue: this.state.displayValue + charCode })
    }
  }

  render () {
    return <Input {...this.props} onKeyUp={this.onKeyUp} text={this.state.displayValue} />
  }
}

const Input = (props) => {
  return (
    <React.Fragment>
      <Focusable onKeyUp={props.onKeyUp}>
        <rect
          x={props.x}
          y={props.y}
          width={props.width}
          height={props.height}
          stroke={'gray'}
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
          tabIndex={0}
        >{props.text}</text>
      </Focusable>
    </React.Fragment>
  )
}

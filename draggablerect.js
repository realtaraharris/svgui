const React = require('react')
const Rect = require('./shapes/rect')

class DraggableRect extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mouseDown: false,
      shapePosition: { x: this.props.x, y: this.props.y },
      previousMousePosition: { x: 0, y: 0 },
      dragDelta: { x: 0, y: 0 }
    }

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
  }

  onMouseDown ({ x, y }) {
    this.setState({
      mouseDown: true,
      previousMousePosition: { x, y }
    })
  }

  onMouseUp () {
    const { shapePosition, dragDelta } = this.state
    this.setState({
      mouseDown: false,
      shapePosition: {
        x: shapePosition.x + dragDelta.x,
        y: shapePosition.y + dragDelta.y
      },
      dragDelta: { x: 0, y: 0 }
    })
  }

  onMouseMove ({ x, y }) {
    if (this.state.mouseDown) {
      const { previousMousePosition, shapePosition } = this.state
      const dragDelta = {
        x: (x - previousMousePosition.x) * 2,
        y: (y - previousMousePosition.y) * 2
      }

      this.setState({ dragDelta })

      const currentPosition = {
        x: shapePosition.x + dragDelta.x,
        y: shapePosition.y + dragDelta.y
      }
      this.props.mouseMove && this.props.onMouseMove(currentPosition)
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.x !== prevProps.x || this.props.y !== prevProps.y) {
      this.setState({
        mouseDown: false,
        shapePosition: { x: this.props.x, y: this.props.y },
        previousMousePosition: { x: 0, y: 0 },
        dragDelta: { x: 0, y: 0 }
      })
    }
  }

  render () {
    const { width, height, stroke, fill } = this.props
    const { shapePosition, dragDelta } = this.state

    return (
      <Rect
        x={shapePosition.x + dragDelta.x}
        y={shapePosition.y + dragDelta.y}
        width={width}
        height={height}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        stroke={stroke}
        fill={fill}
      />
    )
  }
}

module.exports = DraggableRect

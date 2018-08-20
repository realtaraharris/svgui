const React = require('react')
const Rect = require('./shapes/rect')

class DraggableRectGood extends React.Component {
  constructor (props) {
    super(props)

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
  }

  onMouseDown ({ x, y }) {
    this.props.onMouseDown({ x, y }, this.props.name) // previousMousePosition
  }

  onMouseUp () {
    const { shapePosition, dragDelta, name } = this.props
    this.props.onMouseUp(
      {
        x: shapePosition.x + dragDelta.x,
        y: shapePosition.y + dragDelta.y
      }, // shapePosition
      {
        x: 0, y: 0
      }, // dragDelta
      name
    )
  }

  onMouseMove ({ x, y }) {
    if (this.props.mouseDown) {
      const { previousMousePosition, shapePosition, name } = this.props
      const dragDelta = {
        x: (x - previousMousePosition.x) * 2,
        y: (y - previousMousePosition.y) * 2
      }

      const currentPosition = {
        x: shapePosition.x + dragDelta.x,
        y: shapePosition.y + dragDelta.y
      }

      this.props.onMouseMove(dragDelta, currentPosition, name)
    }
  }

  render () {
    const { width, height, stroke, fill, shapePosition, dragDelta } = this.props

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

module.exports = DraggableRectGood

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
    this.props.onMouseDown({ x, y }, this.props.name)
  }

  onMouseUp () {
    const { shapePosition, dragDelta, name } = this.props

    const newShapePosition = {
      x: shapePosition.x + dragDelta.x,
      y: shapePosition.y + dragDelta.y
    }
    const newDragDelta = { x: 0, y: 0 }

    this.props.onMouseUp(newShapePosition, newDragDelta, name)
  }

  onMouseMove ({ x, y }) {
    if (this.props.mouseDown) {
      const { dragDelta, previousMousePosition, shapePosition, name } = this.props

      const newDragDelta = {
        x: (x - previousMousePosition.x) * 2,
        y: (y - previousMousePosition.y) * 2
      }

      const newCurrentPosition = {
        x: shapePosition.x + newDragDelta.x,
        y: shapePosition.y + newDragDelta.y
      }

      this.props.onMouseMove(newDragDelta, newCurrentPosition, name)
    }
  }

  render () {
    const { width, height, stroke, fill, shapePosition, dragDelta } = this.props

    return (
      <Rect
        x={shapePosition.x + dragDelta.x - (width / 2)}
        y={shapePosition.y + dragDelta.y - (height / 2)}
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

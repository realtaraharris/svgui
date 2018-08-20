const React = require('react')
const Rect = require('./shapes/rect')

class DropTargetRect extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mouseDown: false,
      shapePosition: { x: this.props.x, y: this.props.y },
      previousMousePosition: { x: 0, y: 0 },
      dragDelta: { x: 0, y: 0 }
    }

    this.onDragMove = this.onDragMove.bind(this)
  }

  onDragMove () {
    const { x, y, name } = this.props
    this.props.onDragMove({ x, y }, name)
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
        onDragMove={this.onDragMove}
        stroke={stroke}
        fill={fill}
      />
    )
  }
}

module.exports = DropTargetRect

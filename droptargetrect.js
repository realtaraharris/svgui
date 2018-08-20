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

    // this.onMouseDown = this.onMouseDown.bind(this)
    // this.onMouseUp = this.onMouseUp.bind(this)
    // this.onMouseMove = this.onMouseMove.bind(this)
    this.onDragMove = this.onDragMove.bind(this)
  }

  onDragMove () {
    console.log('in onDragMove')
    const { x, y } = this.props
    this.props.onDragMove({ x, y })

    // if (this.state.mouseDown) {
    //   const { previousMousePosition, shapePosition } = this.state
    //   const dragDelta = {
    //     x: (x - previousMousePosition.x) * 2,
    //     y: (y - previousMousePosition.y) * 2
    //   }

    //   this.setState({ dragDelta })

    //   // const currentPosition = {
    //   //   x: shapePosition.x + dragDelta.x,
    //   //   y: shapePosition.y + dragDelta.y
    //   // }
    //   // this.props.onMouseMove(currentPosition)
    // }
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

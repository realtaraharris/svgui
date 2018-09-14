const React = require('react')
const { Component } = React
function createRef() { return function ref(c) { ref.current = c } } // preact is about to get this in the next release
const { addShape, updateShape, removeShape } = require('../events')

const getWorldCoordinate = (x, y, root, shape) => {
  const point = root.createSVGPoint()
  point.x = x
  point.y = y
  const ctm = shape.getScreenCTM()
  return point.matrixTransform(ctm)
}

class Rect extends Component {
  constructor (props) {
    super(props)

    this.state = {
      shapeId: null,
      previousWorldCoords: { x: 0, y: 0, width: 0, height: 0 }
    }

    this.rectRef = createRef()
    this.getWorldCoords = this.getWorldCoords.bind(this)
  }

  getWorldCoords (x, y, width, height) {
    const root = document.getElementById('svg-root')
    const rect = this.rectRef.current

    const worldOrigin = getWorldCoordinate(x, y, root, rect)
    const worldWidthHeight = getWorldCoordinate(width, height, root, rect)

    return {
      x: worldOrigin.x,
      y: worldOrigin.y,
      width: worldWidthHeight.x - worldOrigin.x,
      height: worldWidthHeight.y - worldOrigin.y
    }
  }

  componentDidMount () {
    const { x, y, width, height, onMouseUp, onMouseDown, onMouseMove, onDragMove } = this.props

    const worldCoords = this.getWorldCoords(x, y, width, height)

    const shapeId = addShape({
      x: worldCoords.x,
      y: worldCoords.y,
      width: width / 2, // worldCoords.width,
      height: height / 2, // worldCoords.height,
      onMouseUp,
      onMouseDown,
      onMouseMove,
      onDragMove
    })

    this.setState({ shapeId, previousWorldCoords: worldCoords })
  }

  componentDidUpdate (prevProps) {
    const { x, y, width, height, rx, ry, pathLength, onMouseUp, onMouseDown, onMouseMove, onDragMove } = this.props
    const { previousWorldCoords } = this.state

    const worldCoords = this.getWorldCoords(x, y, width, height)

    if (
      worldCoords.x !== previousWorldCoords.x ||
      worldCoords.y !== previousWorldCoords.y ||
      worldCoords.width !== previousWorldCoords.width ||
      worldCoords.height !== previousWorldCoords.height
    ) {
      updateShape({
        shapeId: this.state.shapeId,
        x: worldCoords.x,
        y: worldCoords.y,
        width: width / 2, // worldCoords.width,
        height: height / 2, // worldCoords.height,
        onMouseUp,
        onMouseDown,
        onMouseMove,
        onDragMove,
        rx,
        ry,
        pathLength
      })
    }
  }

  componentWillUnmount () {
    removeShape(this.state.shapeId)
    this.setState({ shapeId: null })
  }

  render () {
    const { x, y, width, height, rx, ry, pathLength, stroke, fill } = this.props
    // explicitly pass props to prevent event handlers such as onMouseUp and friends from getting through
    return (
      <rect
        ref={this.rectRef}
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        ry={ry}
        pathLength={pathLength}
        stroke={stroke}
        fill={fill}
      />
    )
  }
}

module.exports = Rect

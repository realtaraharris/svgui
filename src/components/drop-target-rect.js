const { h, Component } = require('preact')
const Rect = require('../shapes/rect')

const DropTargetRect = (props) => {
  const { x, y, width, height, name, onDragMove, stroke, fill } = props

  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      onDragMove={() => onDragMove({ x, y, width, height }, name)}
      stroke={stroke}
      fill={fill}
    />
  )
}

module.exports = DropTargetRect

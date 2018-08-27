'use strict'

const React = require('react')

const DraggableRect = require('../components/draggable-rect')

// const dot = (v1, v2) => {
//   const slope1 = (v1.y2 - v1.y1) / (v1.x2 - v1.x1)

//   const a = v2.x2 - v2.x1
//   const b = v2.y2 - v2.y1

//   const length = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

//   const angle = Math.atan(slope1)
//   const deltaX = length * Math.cos(angle)
//   const deltaY = length * Math.sin(angle)

//   return { x: deltaX, y: deltaY }
// }

const DRAGGER_HEIGHT = 50
const DRAGGER_WIDTH = 50

class MarginEditable extends React.Component {
  constructor (props) {
    super(props)

    const { width, height, left, right, top, bottom } = props

    const initial = (x, y) => ({
      mouseDown: false,
      previousMousePosition: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 },
      dragDelta: { x: 0, y: 0 },
      shapePosition: { x, y }
    })

    this.state = {
      rects: {
        top: initial(
          (props.width / 2) + props.x,
          top + props.y
        ),
        left: initial(
          left + props.x,
          props.y + (props.height / 2)
        ),
        right: initial(
          width - right + props.x,
          props.y + (props.height / 2)
        ),
        bottom: initial(
          (props.width / 2) + props.x,
          height - bottom + props.y
        )
      },

      topDragLoc: top,
      leftDragLoc: left,
      rightDragLoc: width - right,
      bottomDragLoc: height - bottom
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseDown (previousMousePosition, name) {
    const nextState = Object.assign({}, this.state.rects[name], {
      mouseDown: true,
      previousMousePosition
    })
    this.setState({ rects: Object.assign({}, this.state.rects, { [name]: nextState }) })
  }

  handleMouseUp (shapePosition, dragDelta, name) {
    const nextState = Object.assign({}, this.state.rects[name], {
      mouseDown: false,
      shapePosition,
      dragDelta
    })
    this.setState({ rects: Object.assign({}, this.state.rects, { [name]: nextState }) })
  }

  handleMouseMove (dragDelta, currentPosition, name) {
    const nextState = Object.assign({}, this.state.rects[name], {
      currentPosition,
      dragDelta
    })
    this.setState({ rects: Object.assign({}, this.state.rects, { [name]: nextState }) })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.x !== this.props.x) {
      this.state.rects.left.shapePosition.x = this.props.x + this.props.left
      this.forceUpdate()
    } else if (prevProps.y !== this.props.y) {
      this.state.rects.top.shapePosition.y = this.props.y + this.props.top
      this.forceUpdate()
    } else if (prevProps.width !== this.props.width) {
      this.state.rects.right.shapePosition.x = this.props.width - this.props.left + this.props.x
      this.forceUpdate()
    } else if (prevProps.height !== this.props.height) {
      this.state.rects.bottom.shapePosition.y = this.props.height - this.props.top + this.props.y
      this.forceUpdate()
    }
  }

  render () {
    const { x, y, width, height, showLayout, render } = this.props
    const { rects } = this.state

    const innerX = rects.left.shapePosition.x + rects.left.dragDelta.x
    const innerY = rects.top.shapePosition.y + rects.top.dragDelta.y
    const innerWidth = rects.right.shapePosition.x - rects.left.shapePosition.x + rects.right.dragDelta.x - rects.left.dragDelta.x
    const innerHeight = rects.bottom.shapePosition.y - rects.top.shapePosition.y + rects.bottom.dragDelta.y - rects.top.dragDelta.y

    const innerProps = {
      x: innerX,
      y: innerY,
      width: innerWidth,
      height: innerHeight
    }

    return (
      <React.Fragment>
        {
          showLayout && (
            <React.Fragment>
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                stroke={'blue'}
                strokeDasharray={'1,1'}
                fill={'none'}
              />
              <rect
                x={innerX}
                y={innerY}
                width={innerWidth}
                height={innerHeight}
                stroke={'red'}
                strokeDasharray={'5,5'}
                fill={'none'}
              />
            </React.Fragment>
          )
        }
        <g transform={`translate(${innerX}, ${innerY})`}>
          {
            render(innerProps)
          }
        </g>
        <DraggableRect
          width={innerWidth}
          height={DRAGGER_HEIGHT}
          fill={'rgba(29,82,255,0.05)'}
          name={'top'}
          shapePosition={{x: innerX + innerWidth / 2, y: rects.top.shapePosition.y }}
          previousMousePosition={rects.top.previousMousePosition}
          dragDelta={rects.top.dragDelta}
          mouseDown={rects.top.mouseDown}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
        <DraggableRect
          width={innerWidth}
          height={DRAGGER_HEIGHT}
          fill={'rgba(29,82,255,0.05)'}
          name={'bottom'}
          shapePosition={{x: innerX + innerWidth / 2, y: rects.bottom.shapePosition.y }}
          previousMousePosition={rects.bottom.previousMousePosition}
          dragDelta={rects.bottom.dragDelta}
          mouseDown={rects.bottom.mouseDown}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
        <DraggableRect
          width={DRAGGER_WIDTH}
          height={innerHeight}
          fill={'rgba(29,82,255,0.05)'}
          name={'left'}
          shapePosition={{x: rects.left.shapePosition.x, y: innerY + innerHeight / 2 }}
          previousMousePosition={rects.left.previousMousePosition}
          dragDelta={rects.left.dragDelta}
          mouseDown={rects.left.mouseDown}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
        <DraggableRect
          width={DRAGGER_WIDTH}
          height={innerHeight}
          fill={'rgba(29,82,255,0.05)'}
          name={'right'}
          shapePosition={{x: rects.right.shapePosition.x, y: innerY + innerHeight / 2 }}
          previousMousePosition={rects.right.previousMousePosition}
          dragDelta={rects.right.dragDelta}
          mouseDown={rects.right.mouseDown}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
      </React.Fragment>
    )
  }
}

const Margin = (props) => {
  const { x, y, width, height, left, right, top, bottom, showLayout, render, editable } = props

  const innerX = x + left
  const innerY = y + top
  const innerWidth = width - left - right
  const innerHeight = height - top - bottom

  const innerProps = {
    x: innerX,
    y: innerY,
    width: innerWidth,
    height: innerHeight
  }

  if (editable) {
    return <MarginEditable {...props} />
  } else {
    return (
      <React.Fragment>
        {
          showLayout && (
            <React.Fragment>
              <rect
                x={x}
                y={y}
                width={width}
                height={height}
                stroke={'red'}
                strokeDasharray={'5,5'}
                fill={'none'}
              />
              <rect
                x={innerX}
                y={innerY}
                width={innerWidth}
                height={innerHeight}
                stroke={'brown'}
                strokeDasharray={'5,5'}
                fill={'none'}
              />
            </React.Fragment>
          )
        }
        <g transform={`translate(${innerX}, ${innerY})`}>
          {
            render(innerProps)
          }
        </g>
      </React.Fragment>
    )
  }
}

module.exports = Margin

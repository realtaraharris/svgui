'use strict'

const React = require('react')
const DraggableRect = require('../components/draggable-rect')

const { normalizeChildren } = require('../utils')

const DRAGGER_WIDTH = 50
const DRAGGER_HEIGHT = 50

class SpacedRayController extends React.Component {
  constructor (props) {
    super(props)

    const initial = (x, y) => ({
      mouseDown: false,
      previousMousePosition: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 },
      dragDelta: { x: 0, y: 0 },
      shapePosition: { x, y }
    })

    const { start, end } = props

    this.state = {
      rects: {
        start: initial(
          start[0],
          start[1]
        ),
        end: initial(
          end[0],
          end[1]
        )
      }
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

  render () {
    const { start, end, children, spaceBetween, showLayout, spaceEvenly, packLeft } = this.props
    const { rects } = this.state
    return (
      <React.Fragment>
        <SpacedRay
          start={[
            rects.start.shapePosition.x + rects.start.dragDelta.x,
            rects.start.shapePosition.y + rects.start.dragDelta.y
          ]}
          end={[
            rects.end.shapePosition.x + rects.end.dragDelta.x,
            rects.end.shapePosition.y + rects.end.dragDelta.y
          ]}
          children={children}
          spaceBetween={spaceBetween}
          showLayout={showLayout}
          spaceEvenly={spaceEvenly}
          packLeft={packLeft}
        />
        <DraggableRect
          width={DRAGGER_WIDTH}
          height={DRAGGER_HEIGHT}
          fill={'rgba(29,82,255,0.6)'}
          name={'start'}
          shapePosition={rects.start.shapePosition}
          previousMousePosition={rects.start.previousMousePosition}
          dragDelta={rects.start.dragDelta}
          mouseDown={rects.start.mouseDown}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
        <DraggableRect
          width={DRAGGER_WIDTH}
          height={DRAGGER_HEIGHT}
          fill={'rgba(29,82,255,0.6)'}
          name={'end'}
          shapePosition={rects.end.shapePosition}
          previousMousePosition={rects.end.previousMousePosition}
          dragDelta={rects.end.dragDelta}
          mouseDown={rects.end.mouseDown}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
      </React.Fragment>
    )
  }
}

const SpacedRay = (props) => {
  const { start, end, children, spaceBetween, showLayout, spaceEvenly, packLeft } = props

  const [x1, y1] = start
  const [x2, y2] = end

  const a = x2 - x1
  const b = y2 - y1

  const slope = b / a
  const angle = Math.atan(slope)
  const flippy = x1 > x2 ? -1 : 1

  const length = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
  const slice = length / (children.length - 1)

  const spaceBetweenArrayMode = Array.isArray(spaceBetween)

  let scratchX = 0
  let scratchY = 0

  return (
    <React.Fragment>
      {
        showLayout && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={'green'} strokeDasharray={'5,5'} />
      }
      <g transform={`translate(${x1}, ${y1})`}>
        {
          normalizeChildren(children).map((child, index) => {
            let deltaX = 0
            let deltaY = 0
            if (spaceBetweenArrayMode) {
              const nextIndex = index > 0 ? index - 1 : index
              deltaX = spaceBetween[nextIndex] * Math.cos(angle)
              deltaY = spaceBetween[nextIndex] * Math.sin(angle)
            } else if (spaceEvenly) {
              deltaX = slice * Math.cos(angle)
              deltaY = slice * Math.sin(angle)
            } else {
              deltaX = spaceBetween * Math.cos(angle)
              deltaY = spaceBetween * Math.sin(angle)
            }

            let result

            if (packLeft) {
              result = (
                <g transform={`translate(${scratchX * flippy}, ${scratchY * flippy})`} key={index}>
                  {child}
                  <circle cx={0} cy={0} r={2} stroke={'red'} />
                </g>
              )
              scratchX += (child.props.width + deltaX) * Math.cos(angle)
              scratchY += (child.props.width + deltaX) * Math.sin(angle)
            } else {
              result = (
                <g transform={`translate(${deltaX * index * flippy}, ${deltaY * index * flippy})`} key={index}>
                  {child}
                  <circle cx={0} cy={0} r={2} stroke={'red'} />
                </g>
              )
            }

            return result
          })
        }
      </g>
    </React.Fragment>
  )
}

module.exports = SpacedRayController

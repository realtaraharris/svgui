'use strict'
const React = require('react')

const { normalizeChildren, forwardProps } = require('./utils')
// const DraggableRect = require('./draggablerect')
const DraggableRect = require('./draggablerectgood') // TODO: consistentify the naming

const G = require('./shapes/g')

const Center = (props) => {
  const midX = props.x + (props.width / 2)
  const midY = props.y + (props.height / 2)

  return props.render(midX, midY)
  // return (
  //   <G transform={`translate(${midX}, ${midY})`}>{
  //     normalizeChildren(props.children).map(child => forwardProps(child, { width: props.width, height: props.height }))
  //   }</G>
  // )
}

const CenterHorizontal = (props) => {
  if (Array.isArray(props.children)) {
    return console.error('Center component only accepts single children')
  }

  if (!props.children.props.width || !props.children.props.height) {
    return console.error('Center component requires that child have width and height props')
  }

  const childWidth = props.children.props.width
  // const childHeight = props.children.props.height

  const midX = -childWidth / 2
  // const midY = -childHeight / 2

  return (
    <G transform={`translate(${midX}, ${props.offsetY})`}>{props.children}</G>
  )
}

// const ShiftXCenterY = (props) => {
//   if (Array.isArray(props.children)) {
//     return console.error('ShiftXCenterY component only accepts single children')
//   }

//   if (!props.children.props.width || !props.children.props.height) {
//     return console.error('ShiftXCenterY component requires that child have width and height props')
//   }

//   const childWidth = props.children.props.width
//   const childHeight = props.children.props.height

//   const midY = -childHeight / 2

//   return (
//     <G transform={`translate(${props.x}, ${midY})`}>{props.children}</G>
//   )
// }

// TODO: rename!
// TODO: props.interval should be renamed to props.spaceBetween or something?
// mode: spaceBetween, spaceAround?
const HorizontalSpacedRay = (props) => {
  const { x1, y1, x2, y2 } = props

  const slope = (y2 - y1) / (x2 - x1)

  const angle = Math.atan(slope)

  let deltaX = 0
  let deltaY = 0
  return (
    <React.Fragment>
      <G transform={`translate(${x1}, ${y1})`}>
        {
          normalizeChildren(props.children).map((child, index) => {
            const result = (
              <G transform={`translate(${deltaX}, ${deltaY})`} key={index}>
                {child}
                <circle cx={0} cy={0} r={2} stroke={'red'} />
              </G>
            )

            deltaX += (child.props.width + props.spaceBetween) * Math.cos(angle)
            deltaY += (child.props.width + props.spaceBetween) * Math.sin(angle)

            return result
          })
        }
      </G>
      {
        props.showLayout && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={'green'} strokeDasharray={'5,5'} />
      }
    </React.Fragment>
  )
}

const HorizontalSpacedLine = (props) => {
  const { x1, y1, x2, y2 } = props
  const slope = (y2 - y1) / (x2 - x1)

  const a = x2 - x1
  const b = y2 - y1

  const length = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

  const slice = length / (props.children.length - 1)

  const angle = Math.atan(slope)
  const deltaX = slice * Math.cos(angle)
  const deltaY = slice * Math.sin(angle)

  return (
    <React.Fragment>
      {
        props.showLayout && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={'green'} strokeDasharray={'5,5'} />
      }
      <G transform={`translate(${x1}, ${y1})`}>
        {
          normalizeChildren(props.children).map((child, index) => {
            return (
              <G transform={`translate(${deltaX * index}, ${deltaY * index})`} key={index}>
                {child}
                <circle cx={0} cy={0} r={2} stroke={'red'} />
              </G>
            )
          })
        }
      </G>
    </React.Fragment>
  )
}

// <SpacedRay x1={0} y1={0} x2={500} y2={500} interval={30} />
const SpacedRay = (props) => {
  const { x1, y1, x2, y2 } = props
  const slope = (y2 - y1) / (x2 - x1)

  const angle = Math.atan(slope)
  const deltaX = props.interval * Math.cos(angle)
  const deltaY = props.interval * Math.sin(angle)

  return (
    <React.Fragment>
      {
        props.showLayout && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={'green'} strokeDasharray={'5,5'} />
      }
      {
        props.render(deltaX, deltaY)
        // normalizeChildren(props.children).map((child, index) => {
        //   return (
        //     <G transform={`translate(${deltaX * index}, ${deltaY * index})`} key={index}>
        //       {child}
        //       <circle cx={0} cy={0} r={2} stroke={'red'} />
        //     </G>
        //   )
        // })
      }
    </React.Fragment>
  )
}

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
const DRAGGER_WIDTH = 25

class MarginDev extends React.Component {
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
        top: initial((props.width / 2) + props.x, top + props.y),
        left: initial(left + props.x, props.y + (props.height / 2)),
        right: initial(width - right + props.x, props.y + (props.height / 2)),
        bottom: initial((props.width / 2) + props.x, height - bottom + props.y)
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
        {
          render(innerProps)
        }
        <DraggableRect
          width={DRAGGER_WIDTH}
          height={DRAGGER_HEIGHT}
          fill={'rgba(29,82,255,0.6)'}
          name={'top'}

          shapePosition={rects.top.shapePosition}
          previousMousePosition={rects.top.previousMousePosition}
          dragDelta={rects.top.dragDelta}
          mouseDown={rects.top.mouseDown}

          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
        <DraggableRect
          width={DRAGGER_WIDTH}
          height={DRAGGER_HEIGHT}
          fill={'rgba(29,82,255,0.6)'}
          name={'bottom'}

          shapePosition={rects.bottom.shapePosition}
          previousMousePosition={rects.bottom.previousMousePosition}
          dragDelta={rects.bottom.dragDelta}
          mouseDown={rects.bottom.mouseDown}

          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
        <DraggableRect
          width={DRAGGER_WIDTH}
          height={DRAGGER_HEIGHT}
          fill={'rgba(29,82,255,0.6)'}
          name={'left'}

          shapePosition={rects.left.shapePosition}
          previousMousePosition={rects.left.previousMousePosition}
          dragDelta={rects.left.dragDelta}
          mouseDown={rects.left.mouseDown}

          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
        <DraggableRect
          width={DRAGGER_WIDTH}
          height={DRAGGER_HEIGHT}
          fill={'rgba(29,82,255,0.6)'}
          name={'right'}

          shapePosition={rects.right.shapePosition}
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

// const Margin = (props) => {
//   const innerX = props.x + props.left
//   const innerY = props.y + props.top
//   const innerWidth = props.width - props.left - props.right
//   const innerHeight = props.height - props.top - props.bottom

//   const innerProps = {
//     x: innerX,
//     y: innerY,
//     width: innerWidth,
//     height: innerHeight
//   }

//   const innerChildren = Object.assign({}, props.children, { props: innerProps })

//   return (
//     <React.Fragment>
//       {
//         props.showLayout && (
//           <React.Fragment>
//             <rect
//               x={props.x}
//               y={props.y}
//               width={props.width}
//               height={props.height}
//               stroke={'red'}
//               strokeDasharray={'5,5'}
//               fill={'none'}
//             />
//             <rect
//               x={innerX}
//               y={innerY}
//               width={innerWidth}
//               height={innerHeight}
//               stroke={'brown'}
//               strokeDasharray={'5,5'}
//               fill={'none'}
//             />
//           </React.Fragment>
//         )
//       }
//       {
//         this.props.render(innerProps)
//       }
//     </React.Fragment>
//   )
// }

module.exports = { Center, CenterHorizontal, Margin: MarginDev, HorizontalSpacedRay, HorizontalSpacedLine, SpacedRay }

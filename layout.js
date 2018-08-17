'use strict'
const React = require('react')

const { normalizeChildren, forwardProps } = require('./utils')
const Rect = require('./shapes')

const Center = (props) => {
  const midX = -props.width / 2
  const midY = -props.height / 2

  return (
    <g transform={`translate(${midX}, ${midY})`}>{
      normalizeChildren(props.children).map(child => forwardProps(child, { width: props.width, height: props.height }))
    }</g>
  )
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
    <g transform={`translate(${midX}, ${props.offsetY})`}>{props.children}</g>
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
//     <g transform={`translate(${props.x}, ${midY})`}>{props.children}</g>
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
      <g transform={`translate(${x1}, ${y1})`}>
        {
          normalizeChildren(props.children).map((child, index) => {
            const result = (
              <g transform={`translate(${deltaX}, ${deltaY})`} key={index}>
                {child}
                <circle cx={0} cy={0} r={2} stroke={'red'} />
              </g>
            )

            deltaX += (child.props.width + props.spaceBetween) * Math.cos(angle)
            deltaY += (child.props.width + props.spaceBetween) * Math.sin(angle)

            return result
          })
        }
      </g>
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
      <g transform={`translate(${x1}, ${y1})`}>
        {
          normalizeChildren(props.children).map((child, index) => {
            return (
              <g transform={`translate(${deltaX * index}, ${deltaY * index})`} key={index}>
                {child}
                <circle cx={0} cy={0} r={2} stroke={'red'} />
              </g>
            )
          })
        }
      </g>
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
      <g transform={`translate(${x1}, ${y1})`}>
        {
          normalizeChildren(props.children).map((child, index) => {
            return (
              <g transform={`translate(${deltaX * index}, ${deltaY * index})`} key={index}>
                {child}
                <circle cx={0} cy={0} r={2} stroke={'red'} />
              </g>
            )
          })
        }
      </g>
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

class MovableDot extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 100,
      mouseDown: false,
      shapePosition: { x: 0, y: 0 },
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
      const { previousMousePosition } = this.state
      const dragDelta = {
        x: (x - previousMousePosition.x) * 2,
        y: (y - previousMousePosition.y) * 2
      }

      this.setState({ dragDelta })
    }
  }

  render () {
    const { state, props } = this

    return (
      <React.Fragment>
        <line
          x1={0}
          y1={0}
          x2={props.restrictVect.x}
          y2={props.restrictVect.y}
          stroke={'orange'}
          strokeDasharray={'2,2'}
        />
        <line
          x1={state.x1}
          y1={state.y1}
          x2={state.x2}
          y2={state.y2}
          stroke={'brown'}
          strokeDasharray={'5,5'}
        />
        <Rect
          x={state.shapePosition.x + state.dragDelta.x}
          y={state.shapePosition.y + state.dragDelta.y}
          width={this.props.width}
          height={this.props.height}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
          fill={this.props.fill}
        />
      </React.Fragment>
    )
  }
}

class MarginDev extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    const { props } = this

    const innerX = props.x + props.left
    const innerY = props.y + props.top
    const innerWidth = props.width - props.left - props.right
    const innerHeight = props.height - props.top - props.bottom

    const innerProps = Object.assign({}, props.children.props, {
      x: innerX,
      y: innerY,
      width: innerWidth,
      height: innerHeight
    })

    const innerChildren = Object.assign({}, props.children, { props: innerProps })

    return (
      <React.Fragment>
        {
          props.showLayout && (
            <React.Fragment>
              <rect
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
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
        {
          innerChildren
        }
        <MovableDot restrictVect={{ x: 200, y: 0 }} width={100} height={200} fill={'rgba(255,0,0,0.2)'} />
        <MovableDot restrictVect={{ x: 200, y: 0 }} width={200} height={100} fill={'rgba(0,255,0,0.2)'} />
        <MovableDot restrictVect={{ x: 200, y: 0 }} width={200} height={200} fill={'rgba(0,0,255,0.2)'} />
      </React.Fragment>
    )
  }
}

// const Margin = (props) => {
//   const innerX = props.x + props.left
//   const innerY = props.y + props.top
//   const innerWidth = props.width - props.left - props.right
//   const innerHeight = props.height - props.top - props.bottom

//   const innerProps = Object.assign({}, props.children.props, {
//     x: innerX,
//     y: innerY,
//     width: innerWidth,
//     height: innerHeight
//   })

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
//         innerChildren
//       }
//     </React.Fragment>
//   )
// }

module.exports = { Center, CenterHorizontal, Margin: MarginDev, HorizontalSpacedRay, HorizontalSpacedLine, SpacedRay }

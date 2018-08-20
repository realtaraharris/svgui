'use strict'
const React = require('react')

const { normalizeChildren, forwardProps } = require('./utils')
const DraggableRect = require('./draggablerect')

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

const DRAGGER_HEIGHT = 50
const DRAGGER_WIDTH = 25

class MarginDev extends React.Component {
  constructor (props) {
    super(props)

    const { width, height, left, right, top, bottom } = props

    this.state = {
      topDragLoc: top,
      leftDragLoc: left,
      rightDragLoc: width - right,
      bottomDragLoc: height - bottom
    }

    this.setTopDragLoc = this.setTopDragLoc.bind(this)
    this.setBottomDragLoc = this.setBottomDragLoc.bind(this)
    this.setLeftDragLoc = this.setLeftDragLoc.bind(this)
    this.setRightDragLoc = this.setRightDragLoc.bind(this)
  }

  setTopDragLoc ({ x, y }) {
    this.setState({ topDragLoc: y + (DRAGGER_HEIGHT / 2) })
  }

  setBottomDragLoc ({ x, y }) {
    this.setState({ bottomDragLoc: y + (DRAGGER_HEIGHT / 2) })
  }

  setLeftDragLoc ({ x, y }) {
    this.setState({ leftDragLoc: x + (DRAGGER_WIDTH / 2) })
  }

  setRightDragLoc ({ x, y }) {
    this.setState({ rightDragLoc: x + (DRAGGER_WIDTH / 2) })
  }

  render () {
    const { props } = this

    const innerX = props.x + this.state.leftDragLoc
    const innerY = props.y + this.state.topDragLoc
    const innerWidth = this.state.rightDragLoc - this.state.leftDragLoc
    const innerHeight = this.state.bottomDragLoc - this.state.topDragLoc

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
        <DraggableRect restrictVect={{ x: 200, y: 0 }} x={(this.props.width / 2) - (DRAGGER_WIDTH / 2)} y={this.state.topDragLoc - (DRAGGER_HEIGHT / 2)} width={DRAGGER_WIDTH} height={DRAGGER_HEIGHT} fill={'rgba(255,255,0,0.2)'} onMouseMove={this.setTopDragLoc} />
        <DraggableRect restrictVect={{ x: 200, y: 0 }} x={(this.props.width / 2) - (DRAGGER_WIDTH / 2)} y={this.state.bottomDragLoc - (DRAGGER_HEIGHT / 2)} width={DRAGGER_WIDTH} height={DRAGGER_HEIGHT} fill={'rgba(255,255,0,0.2)'} onMouseMove={this.setBottomDragLoc} />
        <DraggableRect restrictVect={{ x: 200, y: 0 }} x={this.state.leftDragLoc - (DRAGGER_WIDTH / 2)} y={12.5} width={DRAGGER_WIDTH} height={DRAGGER_HEIGHT} fill={'rgba(0,255,255,0.2)'} onMouseMove={this.setLeftDragLoc} />
        <DraggableRect restrictVect={{ x: 200, y: 0 }} x={this.state.rightDragLoc - (DRAGGER_WIDTH / 2)} y={12.5} width={DRAGGER_WIDTH} height={DRAGGER_HEIGHT} fill={'rgba(0,0,255,0.2)'} onMouseMove={this.setRightDragLoc} />
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

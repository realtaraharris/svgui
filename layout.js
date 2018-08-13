'use strict'
const React = require('react')

const { normalizeChildren, forwardProps } = require('./utils')

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

const Margin = (props) => {
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
    </React.Fragment>
  )
}

module.exports = { Center, CenterHorizontal, Margin, HorizontalSpacedRay, HorizontalSpacedLine, SpacedRay }

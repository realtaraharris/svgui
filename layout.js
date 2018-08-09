'use strict'

const Center = (props) => {
  if (Array.isArray(props.children)) {
    return console.error('Center component only accepts single children')
  }

  if (!props.children.props.width || !props.children.props.height) {
    return console.error('Center component requires that child have width and height props')
  }

  const childWidth = props.children.props.width
  const childHeight = props.children.props.height

  const midX = -childWidth / 2
  const midY = -childHeight / 2

  return (
    <g transform={`translate(${midX}, ${midY})`}>{props.children}</g>
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
  const childHeight = props.children.props.height

  const midX = -childWidth / 2
  const midY = -childHeight / 2

  return (
    <g transform={`translate(${midX}, ${props.offsetY})`}>{props.children}</g>
  )
}

const ShiftXCenterY = (props) => {
  if (Array.isArray(props.children)) {
    return console.error('ShiftXCenterY component only accepts single children')
  }

  if (!props.children.props.width || !props.children.props.height) {
    return console.error('ShiftXCenterY component requires that child have width and height props')
  }

  const childWidth = props.children.props.width
  const childHeight = props.children.props.height

  const midY = -childHeight / 2

  return (
    <g transform={`translate(${props.x}, ${midY})`}>{props.children}</g>
  )
}

// TODO: rename!
// TODO: props.interval should be renamed to props.spaceBetween or something?
// mode: spaceBetween, spaceAround?
const HorizontalSpacedRay = (props) => {
  const x1 = props.x
  const x2 = props.width
  const y1 = props.y
  const y2 = props.y

  const slope = (y2 - y1) / (x2 - x1)

  const angle = Math.atan(slope)

  let deltaX = 0
  let deltaY = 0
  return (
    <React.Fragment>
      {
        props.showLayout && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={'green'} strokeDasharray={'5,5'} />
      }
      <g transform={`translate(${x1}, ${y1})`}>
        {
          normalizeChildren(props.children).map((child, index) => {
            const result = (
              <g transform={`translate(${deltaX}, ${deltaY})`} key={index}>
                {child}
                <circle cx={0} cy={0} r={2} stroke={'red'}/>
              </g>
            )

            deltaX += (child.props.width + props.interval) * Math.cos(angle)
            deltaY += child.props.height * Math.sin(angle)

            return result
          })
        }
      </g>
    </React.Fragment>
  )
}

const HorizontalSpacedLine = (props) => {
  const slice = props.width / (props.children.length - 1)

  let result = []
  let currentPosition = 0
  for (let i = 0; i < props.children.length; i++) {
    result.push(currentPosition)
    currentPosition += slice
  }
  return (
    <g transform={`translate(${props.x}, ${0})`}>
      {props.showLayout && <line x1={0} y1={props.y} x2={props.width} y2={props.y} stroke={'green'} strokeDasharray={'5,5'} />}
      {
        result.map((pos, index) => {
          const child = props.children[index]
          return <g transform={`translate(${pos}, ${props.y})`} key={index}>{child}</g>
        })
      }
    </g>
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
                <circle cx={0} cy={0} r={2} stroke={'red'}/>
              </g>
            )
          })
        }
      </g>
    </React.Fragment>
  )
}

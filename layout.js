'use strict'

const Center = (props) => {
  const childWidth = props.children.props.width
  const childHeight = props.children.props.height

  const midX = -childWidth / 2
  const midY = -childHeight / 2

  return (
    <g transform={`translate(${midX}, ${midY})`}>
      {
        normalizeChildren(props.children).map((child, index) => {
          return forwardProps(child, props)
        })
      }
    </g>
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

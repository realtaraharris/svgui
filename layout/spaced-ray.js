'use strict'

const React = require('react')
const { normalizeChildren } = require('../utils')

const SpacedRay = (props) => {
  const { x1, y1, x2, y2 } = props

  const a = x2 - x1
  const b = y2 - y1

  const slope = b / a
  const length = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
  const slice = length / (props.children.length - 1)

  const angle = Math.atan(slope)
  const spaceBetweenArrayMode = Array.isArray(props.spaceBetween)

  let scratchX = 0
  let scratchY = 0

  return (
    <React.Fragment>
      {
        props.showLayout && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={'green'} strokeDasharray={'5,5'} />
      }
      <g transform={`translate(${x1}, ${y1})`}>
        {
          normalizeChildren(props.children).map((child, index) => {
            let deltaX = 0
            let deltaY = 0
            if (spaceBetweenArrayMode) {
              const nextIndex = index > 0 ? index - 1 : index
              deltaX = props.spaceBetween[nextIndex] * Math.cos(angle)
              deltaY = props.spaceBetween[nextIndex] * Math.sin(angle)
            } else if (props.spaceEvenly) {
              deltaX = slice * Math.cos(angle)
              deltaY = slice * Math.sin(angle)
            } else {
              deltaX = props.spaceBetween * Math.cos(angle)
              deltaY = props.spaceBetween * Math.sin(angle)
            }

            let result

            if (props.packLeft) {
              result = (
                <g transform={`translate(${scratchX}, ${scratchY})`} key={index}>
                  {child}
                  <circle cx={0} cy={0} r={2} stroke={'red'} />
                </g>
              )
              scratchX += child.props.width + deltaX
              scratchY += deltaY
            } else {
              result = (
                <g transform={`translate(${deltaX * index}, ${deltaY * index})`} key={index}>
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

module.exports = SpacedRay

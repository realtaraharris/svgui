'use strict'

const React = require('react')
const { Fragment } = React
const { normalizeChildren, forwardProps } = require('../utils')

const Center = (props) => {
  const { showLayout, horizontal, vertical, width, height, children } = props
  const midX = horizontal ? -width / 2 : 0
  const midY = vertical ? -height / 2 : 0

  return (
    <Fragment>
      {
        showLayout && (
          <rect
            x={midX}
            y={midY}
            width={width}
            height={height}
            stroke={'black'}
            strokeDasharray={'5,5'}
            fill={'none'}
          />
        )
      }
      <g transform={`translate(${midX}, ${midY})`}>
      {
        normalizeChildren(children).map(child => forwardProps(child, { width, height }))
      }
      </g>
    </Fragment>
  )
}

module.exports = Center

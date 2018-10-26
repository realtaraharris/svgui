'use strict'

const React = require('react')
const { Fragment } = React
// const { normalizeChildren, forwardProps } = require('../utils')

const Offset = (props) => {
  const { showLayout, offsetX, offsetY, width, height, children } = props

  return (
    <Fragment>
      {
        showLayout && (
          <rect
            x={offsetX}
            y={offsetY}
            width={width}
            height={height}
            stroke={'black'}
            strokeDasharray={'5,5'}
            fill={'none'}
          />
        )
      }
      <g transform={`translate(${offsetX}, ${offsetY})`}>
      {
        children
      }
      </g>
    </Fragment>
  )
}

module.exports = Offset

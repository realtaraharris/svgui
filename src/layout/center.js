'use strict'

const { h, Component } = require('preact')
const { normalizeChildren, forwardProps } = require('../utils')

const Center = (props) => {
  const midX = props.horizontal ? -props.width / 2 : 0
  const midY = props.vertical ? -props.height / 2 : 0

  return (
    <g transform={`translate(${midX}, ${midY})`}>{
      normalizeChildren(props.children).map(child => forwardProps(child, { width: props.width, height: props.height }))
    }</g>
  )
}

module.exports = Center

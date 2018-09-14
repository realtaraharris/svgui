'use strict'

const { h, Component } = require('preact')
const Center = require('../layout/center')
const { measureTextWidth } = require('../utils')
const Label = require('./label')

const Button = (props) => {
  const textWidth = 3 * measureTextWidth({ // TODO: why 3x?
    text: props.text,
    fontWeight: 500,
    fontStyle: 'regular',
    fontSize: '30px',
    fontFamily: 'sans-serif'
  })
  const textHeight = 21

  return (
    <g>
      <rect x={0} y={0} width={props.width} height={props.height} rx={props.rx} ry={props.ry} fill={props.fill}
        stroke={props.focused ? 'skyblue' : props.fill}
        strokeWidth={props.focused ? 4 : 0}
        onClick={event => props.onClick()}
      />
      <Center width={textWidth} horizontal vertical height={textHeight}>
        <Label text={props.text} x={props.width / 2} y={props.height / 2} fill={'white'} />
      </Center>
    </g>
  )
}

module.exports = Button

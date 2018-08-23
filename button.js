'use strict'

const React = require('react')
const { Center } = require('./layout')
const { measureTextWidth } = require('./utils')
const Label = require('./label')

const G = require('./shapes/g')

const Button = (props) => {
  const textWidth = 3 * measureTextWidth({ // TODO: why 3x?
    text: props.text,
    fontWeight: 500,
    fontStyle: 'regular',
    fontSize: '30px',
    fontFamily: 'sans-serif'
  })
  const textHeight = 21

  console.log('textWidth:', textWidth)

  return (
    <React.Fragment>
      <rect x={props.x} y={props.y} width={props.width} height={props.height} rx={15} ry={15} fill={props.fill}
        stroke={props.focused ? 'skyblue' : props.fill}
        strokeWidth={props.focused ? 4 : 0}
        onClick={event => props.onClick()}
      />
      <Center x={props.x} y={props.y} width={props.width} height={props.height} render={(midX, midY) => (
        <Label text={props.text} x={midX - (textWidth / 2)} y={midY + (textHeight / 2)} fill={'white'} showLayout />
      )} />
    </React.Fragment>
  )
}

module.exports = Button

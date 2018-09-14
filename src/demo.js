'use strict'

const React = require('react')
const { Component } = React

const Center = require('./layout/center')
const Margin = require('./layout/margin')
const SpacedRay = require('./layout/spaced-ray')

const Button = require('./components/button')
const { Input } = require('./components/input')

const Star = (props) => (
  <g>
    {props.showLayout && <rect x={0} y={0} width={props.width} height={props.height} stroke={'orange'} fill={'none'} strokeDasharray={'5,5'} />}
    <g transform={`scale(${props.scale}, ${props.scale})`}>
      <polygon points={'90,0 30,188 180,68 0,68 150,188'} fill={'navy'} />
    </g>
  </g>
)

const Demo = (props) => {
  const star = <Star width={90} height={94} scale={0.5} />
  return (
    <g>
      <Button x={100} y={800} width={400} height={380} text={'App'} fill={'teal'} showLayout={props.showLayout} />
      <Input x={600} y={800} width={400} height={100} text={'This is an input element'} showLayout={props.showLayout} />
      <SpacedRay width={props.width} x={0} y={120} showLayout={props.showLayout} >
        <Center><Button width={120} height={120} text={'App'} fill={'red'} /></Center>
        <Center><Button width={120} height={120} text={'B'} fill={'goldenrod'} /></Center>
        <Center>{star}</Center>
        <Center><Button width={200} height={50} text={'Short Button'} fill={'orangered'} /></Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
      </SpacedRay>
      <Margin x={0} y={300} top={30} right={30} bottom={30} left={30} width={props.width} height={150}>
        <Button text={'Button Inside Margin'} fill={'purple'} />
      </Margin>

      <Margin x={0} y={500} top={47} right={100} bottom={47} left={100} width={props.width} height={94}>
        <SpacedRay>
          <Center>{star}</Center>
          <Center>{star}</Center>
          <Center>{star}</Center>
          <Center>{star}</Center>
          <Center>{star}</Center>
          <Center>{star}</Center>
          <Center>{star}</Center>
          <Center>{star}</Center>
        </SpacedRay>
      </Margin>

      {/* when no layout args are supplied, "inherit" from parent */}
      {/* TODO: when missing layout args and not inside layout container, console.error('layout props required - supply layout args or put ${componentName} into a layout container') */}
      {/* TODO: linear flow container that flows components in a text-like manner */}
      {/* TODO: scrolling container */}
    </g>
  )
}

module.exports = { Star, Demo }

'use strict'

const { h, Component } = require('preact')
const Button = require('./components/button')
const SpacedRay = require('./layout/spaced-ray')
const Center = require('./layout/center')

class ToolbarController extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mouseDown: false,
      previousMousePosition: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 },
      dragDelta: { x: 0, y: 0 },
      shapePosition: { x: 100, y: 100 } // this is the initial position
    }
  }


  handleMouseDown (previousMousePosition) {
    this.setState({
      mouseDown: true,
      previousMousePosition
    })
  }

  handleMouseUp (shapePosition, dragDelta) {
    this.setState({
      mouseDown: false,
      shapePosition,
      dragDelta
    })
  }

  handleMouseMove (dragDelta, currentPosition) {
    this.setState({
      currentPosition,
      dragDelta
    })
  }


  render () {
    const { shapePosition } = this.state
    return <Toolbar x={shapePosition.x} y={shapePosition.y} />
  }
}

const Toolbar = (props) => {
  const width = 120
  const height = 500
  return (
    <g transform={`translate(${100}, ${100})`}>
      <rect x={0} y={0} width={width} height={height} fill={'lightblue'} />
      <SpacedRay start={[10, 25 + 10]} end={[10, height]} spaceBetween={50} showLayout>
        <Center vertical width={50} height={50}>
          <Button text={'x'} fill={'gray'} rx={0} ry={0} onClick={() => {}} />
        </Center>
        <Center vertical width={50} height={50}>
          <Button text={'y'} fill={'gray'} rx={0} ry={0} onClick={() => {}} />
        </Center>
        <Center vertical width={50} height={50}>
          <Button text={'z'} fill={'gray'} rx={0} ry={0} onClick={() => {}} />
        </Center>
      </SpacedRay>
      <SpacedRay start={[60, 25 + 10]} end={[60, height]} spaceBetween={50} showLayout>
        <Center vertical width={50} height={50}>
          <Button text={'x'} fill={'gray'} rx={0} ry={0} onClick={() => {}} />
        </Center>
        <Center vertical width={50} height={50}>
          <Button text={'y'} fill={'gray'} rx={0} ry={0} onClick={() => {}} />
        </Center>
        <Center vertical width={50} height={50}>
          <Button text={'z'} fill={'gray'} rx={0} ry={0} onClick={() => {}} />
        </Center>
      </SpacedRay>
    </g>
  )
}

module.exports = ToolbarController

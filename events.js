const uuid = require('uuid')

// do this slowly, simply at first. replace with quadtree once API is right
let shapes = []

const React = require('react')

class ShapeRender extends React.Component {
  constructor (props) {
    super(props)

    this.handleKeystroke = this.handleKeystroke.bind(this)
  }

  handleKeystroke (event) {
    this.forceUpdate()
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeystroke)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeystroke)
  }

  render () {
    return shapes.map(shape => <rect fill={'orange'} stroke={'red'} x={shape.x * 2} y={shape.y * 2} width={shape.width * 2} height={shape.height * 2} />)
  }
}

const findHits = (x, y) => shapes.filter(shape => {
  return (
    x >= shape.x &&
    x <= shape.x + shape.width &&
    y >= shape.y &&
    y <= shape.y + shape.height
  )
})

const addShape = (shape) => {
  const shapeId = uuid()

  shapes.push(Object.assign({}, shape, { shapeId }))
  // console.log('addShape:', shapes)
  return shapeId
}

const updateShape = (newShape) => {
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].shapeId === newShape.shapeId) {
      shapes[i].x = newShape.x
      shapes[i].y = newShape.y
    }
  }
  // console.log('updateShape:', shapes)
}

const removeShape = (shapeId) => {
  shapes = shapes.filter(shape => shape.shapeId !== shapeId)
  // console.log('removeShape:', shapes)
}

// const first = addShape({ x: 10, y: 10, width: 20, height: 20,
//   onMouseUp: (stuff) => console.log(stuff),
//   onMouseDown: (stuff) => console.log(stuff),
//   onMouseMove: (stuff) => console.log(stuff)
// })

// const second = addShape({ x: 25, y: 25, width: 20, height: 20,
//   onMouseUp: (stuff) => console.log(stuff),
//   onMouseDown: (stuff) => console.log(stuff),
//   onMouseMove: (stuff) => console.log(stuff)
// })

// const third = addShape({ x: 30, y: 40, width: 20, height: 20,
//   onMouseUp: (stuff) => console.log(stuff),
//   onMouseDown: (stuff) => console.log(stuff),
//   onMouseMove: (stuff) => console.log(stuff)
// })

let hits

const awesomeDown = (x, y) => {
  hits = findHits(x, y)

  hits.forEach(shape => { shape.onMouseDown && shape.onMouseDown({ x, y }) })
}

const awesomeUp = (x, y) => {
  hits.forEach(shape => shape.onMouseUp && shape.onMouseUp())
  hits = []
}

const awesomeMove = (x, y) => {
  if (hits) {
    hits.forEach(shape => { shape.onMouseMove && shape.onMouseMove({ x, y }) })
  }

  const hoverHits = findHits(x, y)
  if (hoverHits) {
    // TODO: consider filtering out shapes that are also in `hits`
    hoverHits.forEach(shape => shape.onDragMove && shape.onDragMove({ x, y }))
  }
}

window.addEventListener('mouseup', (event) => {
  const { clientX, clientY } = event
  // console.log('onMouseUp!', clientX, clientY)
  awesomeUp(clientX, clientY)
})

window.addEventListener('mousedown', (event) => {
  const { clientX, clientY } = event
  // console.log('onMouseDown!', clientX, clientY)
  awesomeDown(clientX, clientY)
})

window.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event
  // console.log('onMouseMove!', clientX, clientY)
  awesomeMove(clientX, clientY)
})

module.exports = { addShape, updateShape, removeShape, ShapeRender }

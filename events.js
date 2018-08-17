const uuid = require('uuid')

// do this slowly, simply at first. replace with quadtree once API is right
let shapes = []

const findHits = (x, y) => shapes.filter(shape => (
  x >= shape.x &&
  x <= shape.x + shape.width &&
  y >= shape.y &&
  y <= shape.y + shape.height
))

/*
const findHits = (x, y) => {
  let hits = []
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i]

    const hit = (
      x >= shape.x &&
      x <= shape.x + shape.width &&
      y >= shape.y &&
      y <= shape.y + shape.height
    )

    if (hit) { hits.push(i) }
  }
  return hits
}
*/

const addShape = (shape) => {
  console.log('adding shape:', shape)
  const shapeId = uuid()
  shapes.push(Object.assign({}, shape, { shapeId }))
  return shapeId
}

const updateShape = (newShape) => {
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].shapeId === newShape.shapeId) {
      shapes[i].x = newShape.x
      shapes[i].y = newShape.y
    }
  }
}

const removeShape = (shapeId) => {
  shapes = shapes.filter(shape => shape.shapeId === shapeId)
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

const awesomeUp = (x, y) => {
  const hits = findHits(x, y)
  // console.log(`test ${x}, ${y}:`, hits)
  hits.forEach(shape => shape.onMouseUp(`onMouseUp: ${shape.shapeId}, ${shape.x}, ${shape.y}, ${shape.width}, ${shape.height}`))
}

const awesomeDown = (x, y) => {
  const hits = findHits(x, y)
  // console.log(`test ${x}, ${y}:`, hits)
  hits.forEach(shape => {
    shape.onMouseDown({ x, y })
  })
}

const awesomeMove = (x, y) => {
  const hits = findHits(x, y)
  // console.log(`test ${x}, ${y}:`, hits)
  hits.forEach(shape => {
    shape.onMouseMove({ x, y })
  })
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

module.exports = { addShape, updateShape, removeShape }

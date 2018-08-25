const React = require('react')
const DraggableRect = require('./draggablerectgood') // TODO: consistentify the naming
const DropTargetRect = require('./droptargetrect')

class DragAndDropDemo extends React.Component {
  constructor (props) {
    super(props)

    const initial = (x, y) => ({
      mouseDown: false,
      previousMousePosition: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 },
      dragDelta: { x: 0, y: 0 },
      shapePosition: { x, y }
    })

    this.state = {
      rects: {
        blue: initial(100, 100),
        purple: initial(200, 100),
        yellow: initial(200, 200),
        orange: initial(100, 200)
      }
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleDragMove = this.handleDragMove.bind(this)
  }

  handleMouseDown (previousMousePosition, name) {
console.log('in handleMouseDown', name)
    const nextState = Object.assign({}, this.state.rects[name], {
      mouseDown: true,
      previousMousePosition
    })
console.log('nextState:', nextState)

    this.setState({ rects: Object.assign({}, this.state.rects, { [name]: nextState }) })
  }

  handleMouseUp (shapePosition, dragDelta, name) {
console.log('in handleMouseUp', name)
    const nextState = Object.assign({}, this.state.rects[name], {
      mouseDown: false,
      shapePosition,
      dragDelta
    })
    this.setState({ rects: Object.assign({}, this.state.rects, { [name]: nextState }) })
  }

  handleMouseMove (dragDelta, currentPosition, name) {
console.log('in handleMouseMove', name)
    const nextState = Object.assign({}, this.state.rects[name], {
      currentPosition,
      dragDelta
    })
    this.setState({ rects: Object.assign({}, this.state.rects, { [name]: nextState }) })
  }

  handleDragMove ({ x, y, width, height }, name) { // consider doing this on mouse up?
console.log('in handleDragMove', name)
    if (!this.state.rects[name].mouseDown) { return }
    const nextState = Object.assign({}, this.state.rects[name], {
      shapePosition: { x: x + (width / 2), y: y + (height / 2) },
      dragDelta: { x: 0, y: 0 },
      mouseDown: false
    })
console.log('nextState:', nextState)
    this.setState({ rects: Object.assign({}, this.state.rects, { [name]: nextState }) })
  }

  render () {
    const { rects } = this.state
    return (
      <React.Fragment>
        <DraggableRect
          width={200}
          height={200}
          fill={'rgba(29,82,255,0.6)'}
          name={'blue'}

          shapePosition={rects['blue'].shapePosition}
          previousMousePosition={rects['blue'].previousMousePosition}
          dragDelta={rects['blue'].dragDelta}
          mouseDown={rects['blue'].mouseDown}

          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
        <DropTargetRect x={400} y={400} width={200} height={200} fill={'none'} stroke={'rgba(29,82,255,0.6)'} name={'blue'} onDragMove={this.handleDragMove} />
        <DropTargetRect x={900} y={300} width={200} height={200} fill={'none'} stroke={'rgba(29,82,255,0.6)'} name={'blue'} onDragMove={this.handleDragMove} />

        <DraggableRect
          width={200}
          height={200}
          fill={'rgba(93,27,255,0.6)'}
          name={'purple'}

          shapePosition={rects['purple'].shapePosition}
          previousMousePosition={rects['purple'].previousMousePosition}
          dragDelta={rects['purple'].dragDelta}
          mouseDown={rects['purple'].mouseDown}

          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
        <DropTargetRect x={450} y={450} width={200} height={200} fill={'none'} stroke={'rgba(93,27,255,0.6)'} name={'purple'} onDragMove={this.handleDragMove} />
        <DropTargetRect x={1150} y={300} width={200} height={200} fill={'none'} stroke={'rgba(93,27,255,0.6)'} name={'purple'} onDragMove={this.handleDragMove} />

        <DraggableRect
          width={200}
          height={200}
          fill={'rgba(255,217,0,0.6)'}
          name={'yellow'}

          shapePosition={rects['yellow'].shapePosition}
          previousMousePosition={rects['yellow'].previousMousePosition}
          dragDelta={rects['yellow'].dragDelta}
          mouseDown={rects['yellow'].mouseDown}

          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
        <DropTargetRect x={500} y={500} width={200} height={200} fill={'none'} stroke={'rgba(255,217,0,0.6)'} name={'yellow'} onDragMove={this.handleDragMove} />
        <DropTargetRect x={900} y={550} width={200} height={200} fill={'none'} stroke={'rgba(255,217,0,0.6)'} name={'yellow'} onDragMove={this.handleDragMove} />

        <DraggableRect
          width={200}
          height={200}
          fill={'rgba(255,176,0,0.6)'}
          name={'orange'}

          shapePosition={rects['orange'].shapePosition}
          previousMousePosition={rects['orange'].previousMousePosition}
          dragDelta={rects['orange'].dragDelta}
          mouseDown={rects['orange'].mouseDown}

          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
        <DropTargetRect x={550} y={550} width={200} height={200} fill={'none'} stroke={'rgba(255,176,0,0.6)'} name={'orange'} onDragMove={this.handleDragMove} />
        <DropTargetRect x={1150} y={550} width={200} height={200} fill={'none'} stroke={'rgba(255,176,0,0.6)'} name={'orange'} onDragMove={this.handleDragMove} />
      </React.Fragment>
    )
  }
}

module.exports = DragAndDropDemo

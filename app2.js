const React = require('react')
const DraggableRect = require('./draggablerect')
const DropTargetRect = require('./droptargetrect')
const Rect = require('./shapes/rect')

class App2 extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      blueRectPos: { x: 100, y: 100 },
      purpleRectPos: { x: 200, y: 100 },
      yellowRectPos: { x: 200, y: 200 },
      orangeRectPos: { x: 100, y: 200 }
    }

    this.handleDragMoveBlue = this.handleDragMoveBlue.bind(this)
    this.handleDragMoveOrange = this.handleDragMoveOrange.bind(this)
    this.handleDragMoveYellow = this.handleDragMoveYellow.bind(this)
    this.handleDragMovePurple = this.handleDragMovePurple.bind(this)
  }

  handleDragMoveBlue ({ x, y }) {
    this.setState({ blueRectPos: { x, y } })
  }

  handleDragMovePurple ({ x, y }) {
    this.setState({ purpleRectPos: { x, y } })
  }

  handleDragMoveOrange ({ x, y }) {
    this.setState({ orangeRectPos: { x, y } })
  }

  handleDragMoveYellow ({ x, y }) {
    this.setState({ yellowRectPos: { x, y } })
  }

  render () {
    const {
      yellowRectPos,
      orangeRectPos,
      blueRectPos,
      purpleRectPos
    } = this.state
    return (
      <React.Fragment>
        <DraggableRect
          initialX={blueRectPos.x}
          initialY={blueRectPos.y}
          x={blueRectPos.x}
          y={blueRectPos.y}
          width={200}
          height={200}
          fill={'rgba(29,82,255,0.6)'}
        />
        <DropTargetRect x={400} y={400} width={200} height={200} fill={'none'} stroke={'rgba(29,82,255,0.6)'} onDragMove={this.handleDragMoveBlue} />

        <DraggableRect
          initialX={purpleRectPos.x}
          initialY={purpleRectPos.y}
          x={purpleRectPos.x}
          y={purpleRectPos.y}
          width={200}
          height={200}
          fill={'rgba(93,27,255,0.6)'}
        />
        <DropTargetRect x={450} y={450} width={200} height={200} fill={'none'} stroke={'rgba(93,27,255,0.6)'} onDragMove={this.handleDragMovePurple} />

        <DraggableRect
          initialX={yellowRectPos.x}
          initialY={yellowRectPos.y}
          x={yellowRectPos.x}
          y={yellowRectPos.y}
          width={200}
          height={200}
          fill={'rgba(255,217,0,0.6)'}
        />
        <DropTargetRect x={500} y={500} width={200} height={200} fill={'none'} stroke={'rgba(255,217,0,0.6)'} onDragMove={this.handleDragMoveYellow} />

        <DraggableRect
          initialX={orangeRectPos.x}
          initialY={orangeRectPos.y}
          x={orangeRectPos.x}
          y={orangeRectPos.y}
          width={200}
          height={200}
          fill={'rgba(255,176,0,0.6)'}
        />
        <DropTargetRect x={550} y={550} width={200} height={200} fill={'none'} stroke={'rgba(255,176,0,0.6)'} onDragMove={this.handleDragMoveOrange} />

        <DraggableRect initialX={900} initialY={900} width={200} height={200} fill={'rgba(255,176,0,0.6)'} onMouseMove={console.log} />
      </React.Fragment>
    )
  }
}

module.exports = App2

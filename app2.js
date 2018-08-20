const React = require('react')
const DraggableRect = require('./draggablerect')
const DropTargetRect = require('./droptargetrect')
const Rect = require('./shapes/rect')

class App2 extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      blueRectPos: { x: 100, y: 100 },
      blueDropped: false,

      purpleRectPos: { x: 200, y: 100 },
      purpleDropped: false,

      yellowRectPos: { x: 200, y: 200 },
      yellowDropped: false,

      orangeRectPos: { x: 100, y: 200 },
      orangeDropped: false
    }

    this.handleDragMoveBlue = this.handleDragMoveBlue.bind(this)
    this.handleDragMoveOrange = this.handleDragMoveOrange.bind(this)
    this.handleDragMoveYellow = this.handleDragMoveYellow.bind(this)
    this.handleDragMovePurple = this.handleDragMovePurple.bind(this)
  }

  handleDragMoveBlue ({ x, y }) {
console.log('handleDragMoveBlue:')
    this.setState({ blueRectPos: { x, y }, blueDropped: true })
  }

  handleDragMovePurple ({ x, y }) {
console.log('handleDragMovePurple:')
    this.setState({ purpleRectPos: { x, y }, purpleDropped: true })
  }

  handleDragMoveOrange ({ x, y }) {
console.log('handleDragMoveOrange:')
    this.setState({ orangeRectPos: { x, y }, orangeDropped: true })
  }

  handleDragMoveYellow ({ x, y }) {
console.log('handleDragMoveYellow:')
    this.setState({ yellowRectPos: { x, y }, yellowDropped: true })
  }

  render () {
    const {
      yellowRectPos, yellowDropped,
      orangeRectPos, orangeDropped,
      blueRectPos, blueDropped,
      purpleRectPos, purpleDropped
    } = this.state
    return (
      <React.Fragment>
        <DraggableRect x={blueRectPos.x} y={blueRectPos.y} width={200} height={200} fill={'rgba(29,82,255,0.6)'} />
        <DropTargetRect x={400} y={400} width={200} height={200} fill={'none'} stroke={'rgba(29,82,255,0.6)'} onDragMove={this.handleDragMoveBlue} />

        <DraggableRect x={purpleRectPos.x} y={purpleRectPos.y} width={200} height={200} fill={'rgba(93,27,255,0.6)'} />
        <DropTargetRect x={450} y={450} width={200} height={200} fill={'none'} stroke={'rgba(93,27,255,0.6)'} onDragMove={this.handleDragMovePurple} />

        <DraggableRect x={yellowRectPos.x} y={yellowRectPos.y} width={200} height={200} fill={'rgba(255,217,0,0.6)'} />
        <DropTargetRect x={500} y={500} width={200} height={200} fill={'none'} stroke={'rgba(255,217,0,0.6)'} onDragMove={this.handleDragMoveYellow} />

        <DraggableRect x={orangeRectPos.x} y={orangeRectPos.y} width={200} height={200} fill={'rgba(255,176,0,0.6)'} />
        <DropTargetRect x={550} y={550} width={200} height={200} fill={'none'} stroke={'rgba(255,176,0,0.6)'} onDragMove={this.handleDragMoveOrange} />

        <DraggableRect x={900} y={900} width={200} height={200} fill={'rgba(255,176,0,0.6)'} onMouseMove={console.log} />
      </React.Fragment>
    )
  }
}

module.exports = App2

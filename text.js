'use strict'

const React = require('react')
const G = require('./shapes/g')

const { generateQuickGuid } = require('./utils')

const measure = (text, { fontWeight, fontStyle, fontSize, fontFamily }) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.font = `${fontSize}px ${fontStyle} ${fontFamily}`

  console.log('ctx.font:', ctx.font)

  // Object.assign(ctx, style) // we need to measure text with a particular style

  const tokenized = split(split(split([text], ' ', intersperse), '-', hyphenate), '\n', intersperse)

  return tokenized.map(token => ({
    token,
    width: ctx.measureText(token).width
  }))
}

/*
// list: [ 'But', 'I', 'must', 'explain' ], newItem: ' '
// returns: [ 'But', ' ', 'I', ' ', 'must', ' ', 'explain' ]
const interspersePure = (list, newItem) => list.reduce((initial, token, index) => {
  if (index < list.length - 1) {
    return initial.concat(token, newItem)
  } else {
    return initial.concat(token)
  }
}, [])
// exports.interspersePure = interspersePure
*/

const intersperse = (list, newItem) => {
  let result = []
  const listLength = list.length - 1
  list.forEach((item, index) => {
    if (index < listLength) {
      result.push(item, newItem)
    } else {
      result.push(item)
    }
  })
  return result
}
// exports.intersperse = intersperse

// input: [ 'master', 'builder' ], splitChar: '-'
// returns: [ 'master-', 'builder' ]
const hyphenate = (input, splitChar) => input.map((token, index) => {
  const atEnd = index === input.length - 1
  return atEnd ? token : token + splitChar
})
// exports.hyphenate = hyphenate

/*
// inputs: [ 'asdf asdf asdf asdf' ], ' ', intersperse
// input: [ 'asdf', ' ', 'asdf', ' ', 'asdf, ' ', 'asdf' ]
const splitPure = (input, splitChar, handler) => input.reduce((initial, token) => {
  const rawSplit = token.split(splitChar)
  const newTokens = rawSplit.length > 1 ? handler(rawSplit, splitChar) : token
  return initial.concat(newTokens)
}, [])
// exports.splitPure = splitPure
*/

const split = (input, splitChar, handler) => {
  let result = []
  input.forEach(token => {
    const rawSplit = token.split(splitChar)
    if (rawSplit.length > 1) {
      const newTokens = handler(rawSplit, splitChar)
      newTokens.forEach(newToken => {
        result.push(newToken)
      })
    } else {
      result.push(token)
    }
  })
  return result
}
// exports.split = split

const wrap = (tokens, maxWrapWidth) => (
  tokens.reduce(({ lineWidth, lines }, token) => {
    const tokenWidth = token.width
    if (((lineWidth + tokenWidth) < maxWrapWidth) && token.token !== '\n') {
      lineWidth += tokenWidth
    } else if (token.token === '\n') {
      lineWidth = 0
      lines.push([])
      return { lineWidth, lines }
    } else {
      if (token.token === ' ') { return { lineWidth, lines } }

      lineWidth = tokenWidth
      lines.push([])
    }

    lines[lines.length - 1].push(token)

    return { lineWidth, lines }
  }, {
    lineWidth: 0,
    lines: [[], []]
  }).lines
)
// exports.wrap = wrap

// const getLineWidths = lines => lines.map(line => line.reduce((width, line) => width + line.width, 0))

class Text extends React.Component {
  constructor (props) {
    super(props)

    const text = this.props.children
    // const text = `There is a fifth dimension beyond that which is known to man. It is a dimension as vast as space and as timeless as infinity. It is the middle ground between light and shadow, between science and superstition, and it lies between the pit of man's fears and the summit of his knowledge. This is the dimension of imagination. It is an area which we call the Twilight Zone. There is a fifth dimension beyond that which is known to man. It is a dimension as vast as space and as timeless as infinity. It is the middle ground between light and shadow, between science and superstition, and it lies between the pit of man's fears and the summit of his knowledge. This is the dimension of imagination. It is an area which we call the Twilight Zone. There is a fifth dimension beyond that which is known to man. It is a dimension as vast as space and as timeless as infinity. It is the middle ground between light and shadow, between science and superstition, and it lies between the pit of man's fears and the summit of his knowledge. This is the dimension of imagination. It is an area which we call the Twilight Zone. There is a fifth dimension beyond that which is known to man. It is a dimension as vast as space and as timeless as infinity. It is the middle ground between light and shadow, between science and superstition, and it lies between the pit of man's fears and the summit of his knowledge. This is the dimension of imagination. It is an area which we call the Twilight Zone.`
    const tokens = measure(text, props.fontStyle)

    this.state = {
      scrollPositionVertical: 0,
      tokens,
      wrappedText: wrap(tokens, this.props.width),
      guid: generateQuickGuid(),
      boundingClientRect: {},
      mouseDown: false,
      dragStartCoords: {},
      dragEndCoords: {}
    }

    this.scrollRectRef = React.createRef()
    this.onWheel = this.onWheel.bind(this)
    this.translateCoords = this.translateCoords.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
  }

  onWheel (event) {
    const textHeight = this.state.wrappedText.length * this.props.lineHeight
    const bottom = (this.props.height - textHeight)

    let scrollPositionVertical = this.state.scrollPositionVertical
    scrollPositionVertical += event.deltaY

    if (scrollPositionVertical < bottom) { scrollPositionVertical = bottom }
    if (scrollPositionVertical > 0) { scrollPositionVertical = 0 }

    this.setState({ scrollPositionVertical })
  }

  translateCoords ({ clientX, clientY }) {
    const { x, y } = this.state.boundingClientRect
    const clickX = clientX - x
    const clickY = clientY - y
    return { x: clickX * 2, y: clickY * 2 }
  }

  onMouseDown (event) {
    const { x, y } = this.translateCoords(event)
    console.log(`mouse down on (${x}, ${y})`)
    this.setState({ mouseDown: true, dragStartCoords: { x, y }, dragEndCoords: { x, y } })
  }

  onMouseUp (event) {
    const { x, y } = this.translateCoords(event)
    console.log(`mouse up on (${x}, ${y})`)
    this.setState({ mouseDown: false, dragEndCoords: { x, y } })
  }

  onMouseMove (event) {
    if (this.state.mouseDown) {
      const { x, y } = this.translateCoords(event)
      this.setState({ dragEndCoords: { x, y } })
    }
  }

  componentDidMount () {
    this.scrollRectRef.current.addEventListener('wheel', this.onWheel)
    this.scrollRectRef.current.addEventListener('mousemove', this.onMouseMove)
    this.scrollRectRef.current.addEventListener('mousedown', this.onMouseDown)
    this.scrollRectRef.current.addEventListener('mouseup', this.onMouseUp)

    const boundingClientRect = this.scrollRectRef.current.getBoundingClientRect()
    this.setState({ boundingClientRect })
  }

  componentWillUnmount () {
    this.scrollRectRef.current.removeEventListener('wheel', this.onWheel)
    this.scrollRectRef.current.removeEventListener('mousemove', this.onMouseMove)
    this.scrollRectRef.current.removeEventListener('mousedown', this.onMouseDown)
    this.scrollRectRef.current.removeEventListener('mouseup', this.onMouseUp)
  }

  render () {
    const scrollPositionAbs = Math.abs(this.state.scrollPositionVertical)
    const skipToLine = parseInt((scrollPositionAbs / this.props.lineHeight).toFixed())
    const skipAfterLine = parseInt(((this.props.height) / this.props.lineHeight).toFixed()) + Math.abs(skipToLine) + 1

    const textHeightFudge = 9 // TODO: clean this up - this is probably just the descender height?
    let verticalScratchPosition = 0
    const textClipId = `textClip-${this.state.guid}` // SVG clipPath uses this annoying global url(#thing)

    // console.log(`dragStartCoords: ${this.state.dragStartCoords.x}, dragEndCoords: ${this.state.dragEndCoords.x}`)

    let tokenIndex = 0
    let insideStartTokenIndex
    let insideEndTokenIndex = 999999999

    let selectionBoxes = []
    let textBoxes = []

    this.state.wrappedText.map((line, lineIndex) => {
      if (lineIndex < skipToLine || lineIndex > skipAfterLine) { return }
      const h = (lineIndex * this.props.lineHeight) - scrollPositionAbs

      let horizontalScratchPosition = 0
      return line.map((token) => {
        let result

        const textRect = {
          x: horizontalScratchPosition,
          y: verticalScratchPosition - this.props.lineHeight + h,
          width: token.width,
          height: this.props.lineHeight
        }

        const isInsideStart = insideBox({ clickX: this.state.dragStartCoords.x, clickY: this.state.dragStartCoords.y - scrollPositionAbs }, textRect)
        const isInsideEnd = insideBox({ clickX: this.state.dragEndCoords.x, clickY: this.state.dragEndCoords.y - scrollPositionAbs }, textRect)

        if (isInsideStart) {
          insideStartTokenIndex = tokenIndex
        }

        if (isInsideEnd) {
          insideEndTokenIndex = tokenIndex
        }

        const selection = (insideStartTokenIndex <= tokenIndex && tokenIndex <= insideEndTokenIndex) ? 'lightblue' : 'none'

        if (selection) {
          selectionBoxes.push(<rect key={tokenIndex} x={textRect.x} y={textRect.y} width={textRect.width} height={textRect.height} stroke={selection} fill={selection} clipPath={`url(#${textClipId})`} />)
        }

        if (token.token !== '') {
          // TODO: don't push all this extra geometry - just find the box encompassing the text selection for the entire line
          textBoxes.push(
            <text key={tokenIndex} style={this.props.fontStyle} x={horizontalScratchPosition} y={verticalScratchPosition + h - textHeightFudge} clipPath={`url(#${textClipId})`}>
              {token.token}
            </text>
          )
        }

        tokenIndex++
        horizontalScratchPosition += token.width
        return result
      })
    })

    return (
      <G>
        <clipPath id={textClipId}>
          <rect x={-1} y={-1} width={this.props.width + 1} height={this.props.height + 1} stroke={'none'} />
        </clipPath>
        {/*
          <rect
            x={this.state.dragStartCoords.x}
            y={this.state.dragStartCoords.y}
            width={Math.abs(this.state.dragEndCoords.x - this.state.dragStartCoords.x)}
            height={Math.abs(this.state.dragEndCoords.y - this.state.dragStartCoords.y)}
            fill={'lightblue'}
          />
        */}
        {selectionBoxes}
        {textBoxes}
        // NB: this rect catches pointer events, so it _must_ sit on top of the text
        <rect ref={this.scrollRectRef} fill={'rgba(0,0,0,0)'} stroke={'none'} x={0} y={0} width={this.props.width} height={this.props.height} />
      </G>
    )
  }
}

const insideBox = ({ clickX, clickY }, { x, y, width, height }) => {
  return (
    clickX > x &&
    clickY > y &&
    clickX < x + width &&
    clickY < y + height
  )
}

module.exports = Text

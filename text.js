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

// inputs: [ 'asdf asdf asdf asdf' ], ' ', intersperse
// input: [ 'asdf', ' ', 'asdf', ' ', 'asdf, ' ', 'asdf' ]
const splitPure = (input, splitChar, handler) => input.reduce((initial, token) => {
  const rawSplit = token.split(splitChar)
  const newTokens = rawSplit.length > 1 ? handler(rawSplit, splitChar) : token
  return initial.concat(newTokens)
}, [])
// exports.splitPure = splitPure

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

const getLineWidths = lines => lines.map(line => line.reduce((width, line) => width + line.width, 0))

class Text extends React.Component {
  constructor (props) {
    super(props)

    const text = this.props.children
    const tokens = measure(text, props.fontStyle)

    this.state = {
      scrollPositionVertical: 0,
      tokens,
      wrappedText: wrap(tokens, this.props.width),
      guid: generateQuickGuid()
    }

    console.log('this.state.wrappedText:', this.state.wrappedText)

    this.onWheel = this.onWheel.bind(this)
  }

  onWheel = (event) => {
    const textHeight = this.state.wrappedText.length * this.props.lineHeight
    const bottom = (this.props.height - textHeight)

    let scrollPositionVertical = this.state.scrollPositionVertical
    scrollPositionVertical += event.deltaY

    if (scrollPositionVertical < bottom) { scrollPositionVertical = bottom }
    if (scrollPositionVertical > 0) { scrollPositionVertical = 0 }

    console.log(`in onWheel, setting scrollPositionVertical to ${scrollPositionVertical}`)

    this.setState({ scrollPositionVertical })
  }

  componentDidMount () {
    window.addEventListener('wheel', this.onWheel)
  }

  componentWillUnmount () {
    window.removeEventListener('wheel', this.onWheel)
  }

  render () {
    const scrollPositionAbs = Math.abs(this.state.scrollPositionVertical)
    const skipToLine = parseInt((scrollPositionAbs / this.props.lineHeight).toFixed())
    const skipAfterLine = parseInt(((this.props.height) / this.props.lineHeight).toFixed()) + Math.abs(skipToLine) + 1

    let verticalScratchPosition = 0
    const textClipId = `textClip-${this.state.guid}`

    return (
      <React.Fragment>
        <clipPath id={textClipId}>
          <rect x={0} y={0} width={this.props.width} height={this.props.height} stroke={'blue'} fill={'none'} />
        </clipPath>
        {
          this.state.wrappedText.map((line, lineIndex) => {
            if (lineIndex < skipToLine || lineIndex > skipAfterLine) { return }
            const h = (lineIndex * this.props.lineHeight) - scrollPositionAbs

            let horizontalScratchPosition = 0
            return line.map((token, tokenIndex) => {
              let result
              if (token.token !== ' ') {
                result = (
                  <g key={`${lineIndex}-${tokenIndex}-${token.token}`}>
                    {/*
                      <rect x={horizontalScratchPosition} y={verticalScratchPosition - this.props.lineHeight + h} width={token.width} height={this.props.lineHeight} stroke={'red'} fill={'none'} />
                    */}
                    <text style={this.props.fontStyle} x={horizontalScratchPosition} y={verticalScratchPosition + h} clipPath={`url(#${textClipId})`}>
                      {token.token}
                    </text>
                  </g>
                )
              }
              horizontalScratchPosition += token.width
              return result
            })
          })
        }
      </React.Fragment>
    )
  }
}

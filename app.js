'use strict'

const React = require('react')
const { Fragment } = React
const { Star } = require('./demo')
const { InputController, InputFocuser } = require('./components/input')
// const Box = require('./layout/box')
const Center = require('./layout/center')
const Margin = require('./layout/margin')
const Offset = require('./layout/offset')

const SpacedRay = require('./layout/spaced-ray')
const Button = require('./components/button')
const Text = require('./components/text')
const DragAndDropDemo = require('./drag-and-drop-demo')
// const { ShapeRender } = require('./events')
const Toolbar = require('./toolbar')
const LayoutEditorContext = require('./layout-editor-context')

// const SpacedRays = require('./slides/01. SpacedRays')
const SpacedRays = require('./slides/01. SpacedRays')

const twilight = `There is a fifth dimension beyond that which is known to man. It is a dimension as vast as space and as timeless as infinity. It is the middle ground between light and shadow, between science and superstition, and it lies between the pit of man's fears and the summit of his knowledge. This is the dimension of imagination. It is an area which we call the Twilight Zone.`
const sampleText = `${twilight}

But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?

On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammeled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.`

const AddressForm = (props) => {
  const star = <Star width={90} height={94} scale={0.5} />
  const inputWidth = 1200
  const inputHeight = 80
  return (
    <React.Fragment>
      <InputFocuser
        tabs={6}
        render={(focusedIndex, handleFocus) => (
          <SpacedRay start={[props.width / 2, 0]} end={[props.width / 2, props.height]} spaceBetween={140} showLayout>
            <Center horizontal width={inputWidth} height={inputHeight} showLayout>
              <InputController
                placeholder={'Full Name'}
                tabIndex={0}
                focusedIndex={focusedIndex}
                onClick={(tabIndex) => handleFocus(tabIndex)}
              />
            </Center>
            <Center horizontal width={inputWidth} height={inputHeight}>
              <InputController
                placeholder={'Address'}
                tabIndex={1}
                focusedIndex={focusedIndex}
                onClick={(tabIndex) => handleFocus(tabIndex)}
              />
            </Center>
            <Center horizontal width={inputWidth} height={inputHeight}>
              <SpacedRay start={[0, 0]} end={[inputWidth, 0]} spaceBetween={60} packLeft showLayout>
                <InputController
                  width={600}
                  height={inputHeight}
                  placeholder={'City'}
                  tabIndex={2}
                  focusedIndex={focusedIndex}
                  onClick={(tabIndex) => handleFocus(tabIndex)}
                />
                <InputController
                  width={280}
                  height={inputHeight}
                  placeholder={'State'}
                  tabIndex={3}
                  focusedIndex={focusedIndex}
                  onClick={(tabIndex) => handleFocus(tabIndex)}
                />
                <InputController
                  width={200}
                  height={inputHeight}
                  placeholder={'ZIP Code'}
                  tabIndex={4}
                  focusedIndex={focusedIndex}
                  onClick={(tabIndex) => handleFocus(tabIndex)}
                />
              </SpacedRay>
            </Center>
            <Center horizontal width={inputWidth} height={inputHeight}>
              <Margin
                x={0} y={0} top={10} right={0} bottom={10} left={0} width={props.width} height={194} showLayout editable
                render={({ x, y, width, height }) => (
                  <Button x={x} y={y} width={width} height={height} text={'Button Inside Margin'} rx={15} ry={15} fill={'purple'} />
                )}
              />
            </Center>
            {/*
            <Center width={inputWidth} height={inputHeight}>
              <Margin x={0} y={0} top={10} right={10} bottom={10} left={10} width={props.width} height={194} showLayout>
                <Button text={'Button Inside Margin'} fill={'purple'} rx={15} ry={15}  />
              </Margin>
            </Center>
            <Center width={inputWidth} height={inputHeight}>
              <Margin x={0} y={0} top={10} right={100} bottom={10} left={100} width={props.width} height={194} showLayout>
                <Button text={'Button Inside Margin'} fill={'purple'} rx={15} ry={15} />
              </Margin>
            </Center>
            <Center width={inputWidth} height={inputHeight}>
              <Margin x={0} y={0} top={10} right={100} bottom={10} left={0} width={props.width} height={194} showLayout>
                <Button text={'Button Inside Margin'} fill={'purple'} rx={15} ry={15} />
              </Margin>
            </Center>
            <Center width={inputWidth} height={inputHeight}>
              <Margin x={0} y={0} top={10} right={0} bottom={10} left={100} width={props.width} height={194} showLayout>
                <Button text={'Button Inside Margin'} fill={'purple'} rx={15} ry={15}  />
              </Margin>
            </Center>
            */}

            <SpacedRay start={[-inputWidth / 2 + 94 / 2, 0]} end={[inputWidth / 2 - 94 / 2, 0]} spaceEvenly showLayout>
              <Center horizontal vertical width={90} height={94}>{star}</Center>
              <Center horizontal vertical width={90} height={94}>{star}</Center>
              <Center horizontal vertical width={90} height={94}>{star}</Center>
              <Center horizontal vertical width={90} height={94}>{star}</Center>
              <Center horizontal vertical width={90} height={94}>{star}</Center>
              <Center horizontal vertical width={90} height={94}>{star}</Center>
              <Center horizontal vertical width={90} height={94}>{star}</Center>
              <Center horizontal vertical width={90} height={94}>{star}</Center>
            </SpacedRay>
            <Center horizontal width={inputWidth} height={inputHeight}>
              <Button
                text={'Sign Up'}
                fill={'teal'}
                tabIndex={5}
                focused={focusedIndex === 5}
                focusedIndex={focusedIndex}
                rx={15} ry={15}
              />
            </Center>
            <Center horizontal width={inputWidth} height={300}>
              <Text
                width={inputWidth}
                height={300}
                fontStyle={{
                  fontWeight: 100,
                  fontStyle: 'regular',
                  fontSize: 30,
                  fontFamily: 'helvetica, sans-serif'
                }}
                lineHeight={31}
              >
                {[sampleText, sampleText, sampleText].join()}
              </Text>
            </Center>
          </SpacedRay>
        )}
      />
    </React.Fragment>
  )
}

const DoubleMarginDemo = (props) => {
  return (
    <Margin
      x={props.x} y={props.y}
      width={props.width} height={props.height}
      showLayout
      top={100} right={100} bottom={100} left={100}
      editable
      render={({ x, y, width, height }) => (
        <Margin
          x={0} y={0}
          width={width} height={height}
          showLayout
          top={200} right={200} bottom={200} left={200}
          editable
          render={({ x, y, width, height }) => (
            <Button x={x} y={y} width={width} height={height} text={'Button Inside Margin'} fill={'gray'} rx={15} ry={15} />
          )}
        />
      )}
    />
  )
}

class TextDemo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      textHeights: [100, 100, 100],
      // hue: 0
    }

    this.getTextHeight = this.getTextHeight.bind(this)
  }

  getTextHeight (textHeight, position) {
    const { textHeights } = this.state
    textHeights[position] = textHeight - 31
    this.setState({ textHeights })
  }

  // componentDidMount () {
  //   setInterval(() => {
  //     const { hue } = this.state
  //     if (hue >= 200) {
  //       this.setState({ hue: 0 })
  //     } else {
  //       this.setState({ hue: hue + 1 })
  //     }
  //   }, 16.666666 * 10)
  // }

  render () {
    const { textHeights, hue } = this.state
    const { x, y, width, height } = this.props

    const fontStyle = {
      fontWeight: 100,
      fontStyle: 'regular',
      fontSize: 30,
      fontFamily: 'helvetica, sans-serif'
    }

    const circleRadius = 20
    const circle = (label) => (
      <g>
        <circle cx={0} cy={0} r={20} fill={`hsla(${49}, 50%, 45%, 1.0)`} />
        <text x={-4} y={5} fill={'white'}>{label + 1}</text>
      </g>
    )

    const offset = 40
    const margin = 20
    const lineHeight = 31

    const finalTextHeight = textHeights.reduce((accumulator, height) => accumulator + height, 0) + (2 * margin)
    return (
      <Fragment>
        <rect width={width} height={finalTextHeight} fill={`hsla(${49}, ${100}%, ${50}%, 1.0)`} />
        <Margin
          x={0} y={0} top={margin} right={margin} bottom={margin} left={margin} width={width} height={finalTextHeight} showLayout editable
          render={({ x, y, width, height }) => (
            <Fragment>
              <SpacedRay start={[offset, 0]} end={[offset, 500]} spaceBetween={0} packLeft mode={'vertical'} showLayout>
                <Center width={width - offset} height={textHeights[0]}>
                  <Text
                    fontStyle={fontStyle}
                    lineHeight={lineHeight}
                    getTextHeight={textHeight => this.getTextHeight(textHeight, 0)}
                  >
                    {'Everything around you that you call life, was made up by people that were no smarter than you. And you can change it, you can influence it, you can build your own things that other people can use.\n'}
                  </Text>
                </Center>
                <Center width={width - offset} height={textHeights[1]}>
                  <Text
                    fontStyle={fontStyle}
                    lineHeight={lineHeight}
                    getTextHeight={textHeight => this.getTextHeight(textHeight, 1)}
                  >
                    {twilight + '\n'}
                  </Text>
                </Center>
                <Center width={width - offset} height={textHeights[2]}>
                  <Text
                    fontStyle={fontStyle}
                    lineHeight={lineHeight}
                    getTextHeight={textHeight => this.getTextHeight(textHeight, 2)}
                  >
                    {'What drives me to you is what drives me insane'}
                  </Text>
                </Center>
              </SpacedRay>
              <SpacedRay start={[0, 0]} end={[0, 500]} spaceBetween={0} packLeft mode={'vertical'} showLayout>
                <Offset offsetX={10} offsetY={10} height={textHeights[0]} showLayout>
                  {circle(0)}
                </Offset>
                <Offset offsetX={10} offsetY={10} height={textHeights[1]} showLayout>
                  {circle(1)}
                </Offset>
                <Offset offsetX={10} offsetY={10} height={textHeights[2]} showLayout>
                  {circle(2)}
                </Offset>
              </SpacedRay>
            </Fragment>
          )}
        />
      </Fragment>
    )
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedView: 'SpacedRay', // 'DoubleMarginDemo', // 'AddressForm', // 'DragAndDrop',
      updated: true
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleSetUpdate = this.handleSetUpdate.bind(this)
  }

  handleClick (selectedView) {
    this.setState({ selectedView })
  }

  handleSetUpdate () {
    this.setState({ updated: !this.state.updated })
  }

  render () {
    const { selectedView, updated } = this.state

    let view

    if (selectedView === 'AddressForm') {
      view = <AddressForm {...this.props} />
    } else if (selectedView === 'DoubleMarginDemo') {
      view = <DoubleMarginDemo x={0} y={0} width={this.props.width} height={this.props.height} />
    } else if (selectedView === 'DragAndDrop') {
      view = <DragAndDropDemo {...this.props} />
    } else if (selectedView === 'SpacedRay') {
      view = <SpacedRays />
    } else {
      view = <TextDemo {...this.props} />
    }

    return (
      <LayoutEditorContext.Provider value={{ updated, setUpdate: this.handleSetUpdate }}>
        <Margin
          x={0} y={0} top={10} right={10} bottom={10} left={10} width={this.props.width} height={this.props.height} showLayout
          editable
          render={({ x, y, width, height }) => (
            <SpacedRay start={[width / 2, 50]} end={[width / 2, height]} spaceBetween={100} showLayout>
              <SpacedRay start={[-width / 2, 0]} end={[width / 2, 0]} spaceBetween={50} packLeft showLayout>
                <Center vertical width={300} height={100}>
                  <Button text={'Spaced Ray'} fill={selectedView === 'SpacedRay' ? 'teal' : 'gray'} onClick={() => this.handleClick('SpacedRay')} />
                </Center>
                <Center vertical width={300} height={100}>
                  <Button text={'Double Margin'} fill={selectedView === 'DoubleMarginDemo' ? 'teal' : 'gray'} onClick={() => this.handleClick('DoubleMarginDemo')} />
                </Center>
                <Center vertical width={300} height={100}>
                  <Button text={'Drag And Drop'} fill={selectedView === 'DragAndDrop' ? 'teal' : 'gray'} onClick={() => this.handleClick('DragAndDrop')} />
                </Center>
                <Center vertical width={300} height={100}>
                  <Button text={'Text Demo'} fill={selectedView === 'TextDemo' ? 'teal' : 'gray'} onClick={() => this.handleClick('TextDemo')} />
                </Center>
                <Center vertical width={300} height={100}>
                  <Button text={'Address Form'} fill={selectedView === 'AddressForm' ? 'teal' : 'gray'} onClick={() => this.handleClick('AddressForm')} />
                </Center>
              </SpacedRay>
              <Center horizontal width={width} height={800}>
                {view}
              </Center>
            </SpacedRay>
          )}
        />
        <Toolbar />
        {/* <ShapeRender /> */}
      </LayoutEditorContext.Provider>
    )
  }
}

module.exports = App

'use strict'

const { h, Component } = require('preact')
const { Star } = require('./demo')
const { InputController, InputFocuser } = require('./components/input')
const merge = require('lodash.merge')
// const Box = require('./layout/box')
const Center = require('./layout/center')
const Margin = require('./layout/margin')
const SpacedRay = require('./layout/spaced-ray')
const Button = require('./components/button')
const Text = require('./components/text')
const DragAndDropDemo = require('./drag-and-drop-demo')
// const { ShapeRender } = require('./events')
const Toolbar = require('./toolbar')
const LayoutEditorContext = require('./layout-editor-context')

const sampleText = `There is a fifth dimension beyond that which is known to man. It is a dimension as vast as space and as timeless as infinity. It is the middle ground between light and shadow, between science and superstition, and it lies between the pit of man's fears and the summit of his knowledge. This is the dimension of imagination. It is an area which we call the Twilight Zone.

But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?

On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammeled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.`

const AddressForm = (props) => {
  const star = <Star width={90} height={94} scale={0.5} />
  const inputWidth = 1200
  const inputHeight = 80
  return (
    <g>
      <InputFocuser
        tabs={6}
        render={(focusedIndex, handleFocus) => (
          <SpacedRay start={[props.width / 2, 0]} end={[props.width / 2, props.height]} spaceBetween={140} showLayout>
            <Center horizontal width={inputWidth} height={inputHeight}>
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
    </g>
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

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedView: 'DoubleMarginDemo', // 'AddressForm', // 'DragAndDrop',
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
return <AddressForm {...this.props} />
    let view

    if (selectedView === 'AddressForm') {
      view = <AddressForm {...this.props} />
    } else if (selectedView === 'DoubleMarginDemo') {
      view = <DoubleMarginDemo x={0} y={0} width={this.props.width} height={this.props.height} />
    } else if (selectedView === 'DragAndDrop') {
      view = <DragAndDropDemo {...this.props} />
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
                  <Button text={'Address Form'} fill={selectedView === 'AddressForm' ? 'teal' : 'gray'} onClick={() => this.handleClick('AddressForm')} />
                </Center>
                <Center vertical width={300} height={100}>
                  <Button text={'Drag And Drop'} fill={selectedView === 'DragAndDrop' ? 'teal' : 'gray'} onClick={() => this.handleClick('DragAndDrop')} />
                </Center>
                <Center vertical width={300} height={100}>
                  <Button text={'Double Margin'} fill={selectedView === 'DoubleMarginDemo' ? 'teal' : 'gray'} onClick={() => this.handleClick('DoubleMarginDemo')} />
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

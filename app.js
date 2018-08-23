'use strict'

const React = require('react')
const { Star } = require('./demo')
const { InputController, InputFocuser } = require('./input')
const { Center, CenterHorizontal, Margin, HorizontalSpacedRay, HorizontalSpacedLine, SpacedRay } = require('./layout')
const Button = require('./button')
const Text = require('./text')
const DragAndDropDemo = require('./drag-and-drop-demo')
const { ShapeRender } = require('./events')

const sampleText = `There is a fifth dimension beyond that which is known to man. It is a dimension as vast as space and as timeless as infinity. It is the middle ground between light and shadow, between science and superstition, and it lies between the pit of man's fears and the summit of his knowledge. This is the dimension of imagination. It is an area which we call the Twilight Zone.

But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?

On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammeled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.`

const AddressFormDemo = (props) => {
  const star = <Star width={90} height={94} scale={0.5} />
  const inputWidth = 1200
  const inputHeight = 80
  return (
    <React.Fragment>
      <rect x={0} y={0} width={props.width} height={props.height} fill={'mintcream'} stroke={'cornsilk'} strokeWidth={2} strokeDasharray={'5,5'} />
      <InputFocuser
        tabs={6}
        render={(focusedIndex, handleFocus) => (
          <SpacedRay x1={props.width / 2} y1={100} x2={props.width / 2} y2={props.height} interval={140} showLayout render={(deltaX, deltaY) => {
            return [
              <Center x={deltaX * 0} y={deltaY * 0} width={inputWidth} height={inputHeight} render={(midX, midY) => (
                <InputController
                  x={midX} y={midY} width={inputWidth} height={inputHeight} key={0}
                  placeholder={'Full Name'}
                  tabIndex={0}
                  focusedIndex={focusedIndex}
                  onClick={(tabIndex) => handleFocus(tabIndex)}
                />
              )} />,
              <Center x={deltaX * 1} y={deltaY * 1} width={inputWidth} height={inputHeight} render={(midX, midY) => (
                <InputController
                  x={midX} y={midY} width={inputWidth} height={inputHeight} key={1}
                  placeholder={'Address'}
                  tabIndex={1}
                  focusedIndex={focusedIndex}
                  onClick={(tabIndex) => handleFocus(tabIndex)}
                />
              )} />,
              <Center x={deltaX * 2} y={deltaY * 2} width={inputWidth} height={200} render={(midX, midY) => (
                <Margin
                  x={midX} y={midY} top={10} right={10} bottom={10} left={10} width={inputWidth} height={200} showLayout
                  render={({ x, y, width, height }) => (
                    <Button x={x} y={y} width={width} height={height} text={'Button Inside Margin'} fill={'purple'} />
                  )}
                />
              )} />,
              <Center x={deltaX * 3} y={deltaY * 3} width={inputWidth} height={200} render={(midX, midY) => (
                <Text
                  x={midX}
                  y={midY}
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
              )} />
            ]
          }} />
        )}
      />

          {/*
            <Center width={inputWidth} height={inputHeight} render={(midX, midY) => (
              <HorizontalSpacedRay x1={midX} y1={midY} x2={inputWidth} y2={0} spaceBetween={60} showLayout>
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
              </HorizontalSpacedRay>
            )} />
            <Center width={inputWidth} height={inputHeight}>
              <Margin x={0} y={0} top={10} right={10} bottom={10} left={10} width={props.width} height={194} showLayout>
                <Button text={'Button Inside Margin'} fill={'purple'} />
              </Margin>
            </Center>
            <Center width={inputWidth} height={inputHeight}>
              <Margin x={0} y={0} top={10} right={100} bottom={10} left={100} width={props.width} height={194} showLayout>
                <Button text={'Button Inside Margin'} fill={'purple'} />
              </Margin>
            </Center>
            <Center width={inputWidth} height={inputHeight}>
              <Margin x={0} y={0} top={10} right={100} bottom={10} left={0} width={props.width} height={194} showLayout>
                <Button text={'Button Inside Margin'} fill={'purple'} />
              </Margin>
            </Center>
            <Center width={inputWidth} height={inputHeight}>
              <Margin x={0} y={0} top={10} right={0} bottom={10} left={100} width={props.width} height={194} showLayout>
                <Button text={'Button Inside Margin'} fill={'purple'} />
              </Margin>
            </Center>

            <HorizontalSpacedLine x1={-inputWidth / 2 + 94 / 2} y1={0} x2={inputWidth / 2 - 94 / 2} y2={0} showLayout>
              <Center width={90} height={94}>{star}</Center>
              <Center width={90} height={94}>{star}</Center>
              <Center width={90} height={94}>{star}</Center>
              <Center width={90} height={94}>{star}</Center>
              <Center width={90} height={94}>{star}</Center>
              <Center width={90} height={94}>{star}</Center>
              <Center width={90} height={94}>{star}</Center>
              <Center width={90} height={94}>{star}</Center>
            </HorizontalSpacedLine>
            <Center width={inputWidth} height={inputHeight}>
              <Button
                text={'Sign Up'}
                fill={'teal'}
                tabIndex={5}
                focused={focusedIndex === 5}
                focusedIndex={focusedIndex}
              />
            </Center>
            <CenterHorizontal offsetY={-inputHeight / 2}>
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
            </CenterHorizontal>
          </SpacedRay>
        )}
      /> */}
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
      render={({ x, y, width, height }) => (
        <Margin
          x={x} y={y}
          width={width} height={height}
          showLayout
          top={200} right={200} bottom={200} left={200}
          render={({ x, y, width, height }) => (
            <Button x={x} y={y} width={width} height={height} text={'Button Inside Margin'} fill={'gray'} />
          )}
        />
      )}
    />
  )
}

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedView: 'DoubleMarginDemo'
      // selectedView: 'AddressForm'
      // selectedView: 'DragAndDrop'
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (selectedView) {
    this.setState({ selectedView })
  }

  render () {
    const { selectedView } = this.state

// return <AddressForm {...this.props} />
// return <DoubleMarginDemo x={0} y={0} width={this.props.width} height={this.props.height} />

    return (
      <React.Fragment>
        <Margin
          x={0} y={0} top={200} right={200} bottom={200} left={200} width={this.props.width} height={this.props.height} showLayout
          render={({ x, y, width, height }) => (
            <SpacedRay x1={width / 2 + x} y1={y} x2={width / 2 + x} y2={height} interval={220} showLayout render={(deltaX, deltaY) => {
              return [
                <Center x={deltaX * 0} y={deltaY * 0} key={0} width={width} height={80} render={(midX, midY) => (
                  <Button x={midX} y={midY} width={400} height={100} text={'Address Form'} fill={selectedView === 'AddressForm' ? 'teal' : 'gray'} onClick={() => this.handleClick('AddressForm')} />
                )} />,
                <Center x={deltaX * 1} y={deltaY * 1} key={1} width={width} height={80} render={(midX, midY) => (
                  <Button x={midX} y={midY} width={400} height={100} text={'Drag And Drop'} fill={selectedView !== 'AddressForm' ? 'teal' : 'gray'} onClick={() => this.handleClick('DragAndDrop')} />
                )} />,
                <Center x={deltaX * 2} y={deltaY * 2} key={2} width={width/2} height={800/2} render={(midX, midY) => {
                  if (selectedView === 'AddressForm') {
                    return <AddressFormDemo x={midX} y={midY} width={width/2} height={800/2} />
                  } else if (selectedView === 'DoubleMarginDemo') {
                    return <DoubleMarginDemo x={midX} y={midY} width={width/2} height={height/2} />
                  } else if (selectedView === 'DragAndDrop') {
                    return <DragAndDropDemo {...this.props} />
                  }
                }} />
              ]
            }}/>
          )}
        />
        <ShapeRender random={Math.random()} />
      </React.Fragment>
    )
  }
}

module.exports = App

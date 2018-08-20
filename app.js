'use strict'

const React = require('react')
const { Star } = require('./demo')
const { InputController, InputFocuser } = require('./input')
const { Center, CenterHorizontal, Margin, HorizontalSpacedRay, HorizontalSpacedLine, SpacedRay } = require('./layout')
const Button = require('./button')
const Text = require('./text')

const sampleText = `There is a fifth dimension beyond that which is known to man. It is a dimension as vast as space and as timeless as infinity. It is the middle ground between light and shadow, between science and superstition, and it lies between the pit of man's fears and the summit of his knowledge. This is the dimension of imagination. It is an area which we call the Twilight Zone.

But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?

On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammeled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.`

const App = (props) => {
  const star = <Star width={90} height={94} scale={0.5} />
  const inputWidth = 1200
  const inputHeight = 80
  return (
    <React.Fragment>
      <rect x={0} y={0} width={props.width} height={props.height} fill={'mintcream'} stroke={'cornsilk'} strokeWidth={2} strokeDasharray={'5,5'} />
      <InputFocuser
        tabs={6}
        render={(focusedIndex, handleFocus) => (
          <SpacedRay x1={props.width / 2} y1={100} x2={props.width / 2} y2={props.height} interval={140} showLayout>
            <Center width={inputWidth} height={inputHeight}>
              <InputController
                placeholder={'Full Name'}
                tabIndex={0}
                focusedIndex={focusedIndex}
                onClick={(tabIndex) => handleFocus(tabIndex)}
              />
            </Center>
            <Center width={inputWidth} height={inputHeight}>
              <InputController
                placeholder={'Address'}
                tabIndex={1}
                focusedIndex={focusedIndex}
                onClick={(tabIndex) => handleFocus(tabIndex)}
              />
            </Center>
            <Center width={inputWidth} height={inputHeight}>
              <HorizontalSpacedRay x1={0} y1={0} x2={inputWidth} y2={0} spaceBetween={60} showLayout>
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
            </Center>
            <Center width={inputWidth} height={inputHeight}>
              <Margin x={0} y={0} top={10} right={0} bottom={10} left={0} width={props.width} height={194} showLayout>
                <Button text={'Button Inside Margin'} fill={'purple'} />
              </Margin>
            </Center>
            {/*
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
            */}

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
                height={500}
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
      />
    </React.Fragment>
  )
}

module.exports = App

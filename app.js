'use strict'

const App = (props) => {
  const star = <Star width={90} height={94} scale={0.5}/>
  const inputWidth = 1200
  const inputHeight = 80
  return (
    <React.Fragment>
      <rect x={0} y={0} width={props.width} height={props.height} fill={'white'} stroke={'cornsilk'} strokeWidth={2} strokeDasharray={'5,5'}/>
      <KeyboardContext.Consumer>
        {
          getKeystroke => {
            const keystroke = getKeystroke()
            return (
              <InputFocuser
                tabs={6}
                keystroke={keystroke}
                render={focusedIndex => (
                  <SpacedRay x1={props.width/2} y1={100} x2={props.width/2} y2={props.height} interval={140} showLayout>
                    <Center>
                      <InputController
                         width={inputWidth}
                         height={inputHeight}
                         placeholder={'Full Name'}
                         tabIndex={0}
                         focusedIndex={focusedIndex}
                         keystroke={keystroke}
                      />
                    </Center>
                    <Center>
                      <InputController
                        width={inputWidth}
                        height={inputHeight}
                        placeholder={'Address'}
                        tabIndex={1}
                        focusedIndex={focusedIndex}
                        keystroke={keystroke}
                      />
                    </Center>
                    <Center>
                      <InputController
                        width={inputWidth}
                        height={inputHeight}
                        placeholder={'City'}
                        tabIndex={2}
                        focusedIndex={focusedIndex}
                        keystroke={keystroke}
                      />
                    </Center>
                    <Center>
                      <InputController
                        width={inputWidth}
                        height={inputHeight}
                        placeholder={'State'}
                        tabIndex={3}
                        focusedIndex={focusedIndex}
                        keystroke={keystroke}
                      />
                    </Center>
                    <Center>
                      <InputController
                        width={inputWidth}
                        height={inputHeight}
                        placeholder={'ZIP Code'}
                        tabIndex={4}
                        focusedIndex={focusedIndex}
                        keystroke={keystroke}
                      />
                    </Center>
                    <Center>
                      <Button
                        x={0}
                        y={0}
                        width={inputWidth}
                        height={inputHeight}
                        text={'Sign Up'}
                        fill={'teal'}
                        tabIndex={5}
                        focused={focusedIndex === 5}
                        keystroke={keystroke}

                        focusedIndex={focusedIndex}
                      />
                    </Center>
                  </SpacedRay>
                )}
              />
            )
          }
        }
      </KeyboardContext.Consumer>
      <SpacedRay x1={100} y1={100} x2={100} y2={props.height} interval={props.width / 10} showLayout>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
        <Center>{star}</Center>
      </SpacedRay>
      <Margin x={0} y={800} top={47} right={100} bottom={47} left={100} width={props.width} height={94}>
        <HorizontalSpacedLine>
          <Center>{star}</Center>
          <Center>{star}</Center>
          <Center>{star}</Center>
          <Center>{star}</Center>
          <Center>{star}</Center>
          <Center>{star}</Center>
          <Center>{star}</Center>
          <Center>{star}</Center>
        </HorizontalSpacedLine>
      </Margin>
    </React.Fragment>
  )
}

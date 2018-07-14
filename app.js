'use strict'

const App = (props) => {
  const star = <Star width={90} height={94} scale={0.5}/>
  return (
    <React.Fragment>
      <rect x={0} y={0} width={props.width} height={props.height} fill={'white'} stroke={'cornsilk'} strokeWidth={2} strokeDasharray={'5,5'}/>
      <KeyboardContext.Consumer>
        {
          keystroke => (
            <InputFocuser keystroke={keystroke}>
              <InputController x={800} y={100} width={1200} height={80} placeholder={'Full Name'} showLayout={props.showLayout} />
              <InputController x={800} y={200} width={1200} height={80} placeholder={'Address'} showLayout={props.showLayout} />
              <InputController x={800} y={300} width={1200} height={80} placeholder={'City'} showLayout={props.showLayout} />
              <InputController x={800} y={400} width={1200} height={80} placeholder={'State'} showLayout={props.showLayout} />
              <InputController x={800} y={500} width={1200} height={80} placeholder={'ZIP Code'} showLayout={props.showLayout} />
              <Button x={800} y={600} width={1200} height={80} text={'Sign Up'} fill={'teal'} showLayout={props.showLayout} />
            </InputFocuser>
          )
        }
      </KeyboardContext.Consumer>
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

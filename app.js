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
              <SpacedRay x1={props.width/2} y1={100} x2={props.width/2} y2={props.height} interval={140} showLayout>
                <Center><InputController x={0} y={0} width={1200} height={80} placeholder={'Full Name'} showLayout={props.showLayout} /></Center>
                <Center><InputController x={0} y={0} width={1200} height={80} placeholder={'Address'} showLayout={props.showLayout} /></Center>
                <Center><InputController x={0} y={0} width={1200} height={80} placeholder={'City'} showLayout={props.showLayout} /></Center>
                <Center><InputController x={0} y={0} width={1200} height={80} placeholder={'State'} showLayout={props.showLayout} /></Center>
                <Center><InputController x={0} y={0} width={1200} height={80} placeholder={'ZIP Code'} showLayout={props.showLayout} /></Center>
                <Center><Button x={0} y={0} width={1200} height={80} text={'Sign Up'} fill={'teal'} showLayout={props.showLayout} /></Center>
              </SpacedRay>
            </InputFocuser>
          )
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

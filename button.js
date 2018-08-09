'use strict'

const Button = (props) => {
  const textWidth = measureTextWidth({
    text: props.text,
    fontWeight: 500,
    fontStyle: 'regular',
    fontSize: '30px',
    fontFamily: 'sans-serif'
  })
  console.log(`measured text width: ${textWidth}`)

  return (
    <React.Fragment>
      <g transform={`translate(${props.x}, ${props.y})`}>
        <rect x={0} y={0} width={props.width} height={props.height} rx={15} ry={15} fill={props.fill}
          stroke={props.focused ? 'skyblue' : props.fill}
          strokeWidth={props.focused ? 4 : 0}
        />
        <Center width={textWidth * 3} height={21}><Label text={props.text} x={props.width / 2} y={props.height / 2} fill={'white'} /></Center>
      </g>
    </React.Fragment>
  )
}
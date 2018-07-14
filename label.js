'use strict'

const Label = (props) => {
  return (
    <React.Fragment>
      {props.showLayout && <rect x={props.x} y={props.y} width={props.width} height={props.height} stroke={'red'} fill={'none'} strokeDasharray={'5,5'} />}
      <text x={props.x} y={props.y + props.height} fill={props.fill} style={{ font: '30px sans-serif' }}>{props.text}</text>
    </React.Fragment>
  )
}

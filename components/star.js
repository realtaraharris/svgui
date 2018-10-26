'use strict'

const React = require('react')

const Star = (props) => (
  <React.Fragment>
    {props.showLayout && <rect x={0} y={0} width={props.width} height={props.height} stroke={'orange'} fill={'none'} strokeDasharray={'5,5'} />}
    <g transform={`scale(${props.scale}, ${props.scale})`}>
      <polygon points={'90,0 30,188 180,68 0,68 150,188'} fill={'navy'} />
    </g>
  </React.Fragment>
)

module.exports = Star

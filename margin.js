'use strict'

const Margin = (props) => {
  const innerX = props.x + props.left
  const innerY = props.y + props.top
  const innerWidth = props.width - props.left - props.right
  const innerHeight = props.height - props.top - props.bottom

  const innerProps = Object.assign({}, props.children.props, {
    x: innerX,
    y: innerY,
    width: innerWidth,
    height: innerHeight
  })

  const innerChildren = Object.assign({}, props.children, { props: innerProps })

  return (
    <React.Fragment>
      {
        props.showLayout && (
          <React.Fragment>
            <rect
              x={props.x}
              y={props.y}
              width={props.width}
              height={props.height}
              stroke={'red'}
              strokeDasharray={'5,5'}
              fill={'none'}
            />
            <rect
              x={innerX}
              y={innerY}
              width={innerWidth}
              height={innerHeight}
              stroke={'brown'}
              strokeDasharray={'5,5'}
              fill={'none'}
            />
          </React.Fragment>
        )
      }
      {
        innerChildren
      }
    </React.Fragment>
  )
}

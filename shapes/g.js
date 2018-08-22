const React = require('react')

class G extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { transform, children } = this.props

    return (
      <g transform={transform}>{children}</g>
    )
  }
}

module.exports = G

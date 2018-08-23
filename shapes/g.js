const React = require('react')

class G extends React.Component {
  render () {
    const { transform, children } = this.props

    return (
      <g transform={transform}>{children}</g>
    )
  }
}

module.exports = G

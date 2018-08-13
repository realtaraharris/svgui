'use strict'

const React = require('react')
const App = require('./app')

// const { Demo } = require('./demo')

class Root extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      width: this.getWindowWidth(),
      height: this.getWindowHeight()
    }
    this.handleKeystroke = this.handleKeystroke.bind(this)
  }

  getWindowWidth () { return window.innerWidth * 2 }
  getWindowHeight () { return window.innerHeight * 2 }

  componentDidMount () {
    const onResize = (e) => {
      const height = this.getWindowHeight()
      const width = this.getWindowWidth()

      this.setState({ width, height })
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', this.handleKeystroke)
  }

  handleKeystroke (event) {
    switch (event.code) {
      case 'Backspace': // so many poor people have lost so much unsaved state because of this idiotic "shortcut"
      case 'Tab':
        event.preventDefault()
    }
  }

  render () {
    return (
      <svg viewBox={[0, 0, this.state.width, this.state.height]}>
        <App width={this.state.width} height={this.state.height} showLayout />
      </svg>
    )
  }
}

module.exports = Root

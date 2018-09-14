'use strict'

const { h, Component, render } = require('preact')

const Root = require('./root.js')

const injectStyle = (styleString) => {
  const node = document.createElement('style')
  node.innerHTML = styleString
  document.head.appendChild(node)
}

injectStyle(`
  svg text {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
    pointer-events: none;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
`)

render(<Root />, document.body)

// const root = document.createElement('div')
// root.setAttribute('id', 'root')
// document.body.appendChild(root)

// ReactDOM.render(<Root />, root)

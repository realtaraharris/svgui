'use strict'

const window = require('svgdom')
const { document } = window

console.dir(document)




const { h, Component } = require('preact')
const ReactDOM = require('react-dom')



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

const root = document.createElement('root')
document.body.appendChild(root)

ReactDOM.render(React.createElement('svg', null, null), root)


console.log('window:', window)

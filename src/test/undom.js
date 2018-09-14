const undom = require('undom')
require('undom/register')

let document = undom()
// window.document = document

// let foo = document.createElement('foo')
// foo.appendChild(document.createTextNode('Hello, World!'))
// document.body.appendChild(foo)

// let bar = document.createElement('svg')
// document.body.appendChild(bar)

const encode = s => s.replace(/[&'"<>]/g, a => `&#${a};`)
const formatAttribute = a => ` ${a.name}="${encode(a.value)}"`

const serialize = (element) => {
  if (element.nodeType === 3) { return encode(element.textContent) }

  const nodeName = element.nodeName.toLowerCase()
  const attributes = element.attributes.map(formatAttribute).join('')
  const childNodes = element.childNodes.map(serialize).join('')

  return `<${nodeName}${attributes}>${childNodes}</${nodeName}>`
}


window.addEventListener = () => console.log('window.addEventListener not implemented')
window.location = { protocol: 'https' }
navigator = { userAgent: 'Chrome' }
// console.log('document:', document)

// document.createElement('')

require('../index')

console.log(serialize(document.body))

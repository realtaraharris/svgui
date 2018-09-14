const { JSDOM } = require('jsdom')

const options = { runScripts: 'dangerously' }

JSDOM.fromURL('http://localhost:9966/', options).then(dom => {
  console.log(dom.serialize())
console.log(dom.window.document.location)
})

/*
const dom = new JSDOM('', {
  url: 'http://localhost:9966/',
  contentType: 'text/html',
  includeNodeLocations: true,
  storageQuota: 0,
})

console.log(dom.serialize())
*/

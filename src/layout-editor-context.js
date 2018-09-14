const { h, Component } = require('preact')
const { createContext } = require('./preact-context')

module.exports = createContext({
  updated: true,
  setUpdate: () => {}
})

const React = require('react')

module.exports = React.createContext({
  updated: true,
  setUpdate: () => {}
})

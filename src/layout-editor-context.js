const React = require('react')
const { Component } = React

const { createContext } = require('./preact-context')

module.exports = createContext({
  updated: true,
  setUpdate: () => {}
})

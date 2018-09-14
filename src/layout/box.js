'use strict'

// const React = require('react')
const { Component } = React
const { normalizeChildren, forwardProps } = require('../utils')

const Box = (props) => normalizeChildren(props.children).map(child => forwardProps(child, { width: props.width, height: props.height }))

module.exports = Box

'use strict'

const forwardProps = (child, newProps) => {
  const props = Object.assign({}, child.props, newProps)
  return Object.assign({}, child, { props })
}

const normalizeChildren = (childOrChildren) => {
  if (childOrChildren === undefined) { return [] }
  return Array.isArray(childOrChildren) ? childOrChildren : [ childOrChildren ]
}

const measureTextWidth = ({ text, fontWeight, fontStyle, fontSize, fontFamily }) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.font = `${fontWeight} ${fontStyle} ${fontSize} ${fontFamily}`
  return ctx.measureText(text).width
}

// original: https://stackoverflow.com/a/13403498
const generateQuickGuid = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

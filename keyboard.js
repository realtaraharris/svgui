'use strict'

function KeyboardDefault () {
  return {
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    code: '',
    key: '',
    character: '',
    location: 0,
    metaKey: false,
    repeat: false,
    getModifierState: () => false,
    isComposing: false,
    isTrusted: true
  }
}

const KeyboardContext = React.createContext(() => {
  console.error('whoops, got default keyboard handler')
  return KeyboardDefault
})

let currentKeystroke = KeyboardDefault()

function getCurrentKeystrokeOnce () {
  const keyEvent = Object.assign({}, currentKeystroke)
  currentKeystroke = {}
  return keyEvent
}

const setCurrentKeystroke = (keyEvent) => {
  currentKeystroke = keyEvent
}

// ensures that Tab, Enter, Meta, etc. strings don't make their way into `key`
const filterKeyCharacter = (key) => {
  if (key.length > 1) { return '' }
  return key
}

'use strict'

const puppeteer = require('puppeteer')
const ScreenTest = require('puppeteer-screenshot-tester')
const tape = require('tape')

tape('drag and drop works', async t => {
  const tester = await ScreenTest()

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const { mouse } = page

  await page.goto('http://localhost:9966')

  await mouse.click(243, 33) // Drag And Drop

  await mouse.move(85, 154) // the draggy shapes
  await mouse.down()
  await mouse.move(296, 365, { steps: 10 })
  await mouse.up()

  const result = await tester(page, 'drag-and-drop')
  await browser.close()

  t.ok(result)

  t.end()
})

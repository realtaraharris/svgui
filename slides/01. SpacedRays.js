'use strict'

const React = require('react')
const { Fragment } = React
const Star = require('../components/star')
const SpacedRay = require('../layout/spaced-ray')
const Center = require('../layout/center')
const Button = require('../components/button')
const { InputController } = require('../components/input')

const defaultStarCount = 0

class SpacedRays extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      starCount: defaultStarCount,
      packLeft: false,
      spaceEvenly: true
    }

    this.onAddStar = this.onAddStar.bind(this)
    this.onRemoveStar = this.onRemoveStar.bind(this)
    this.onResetStars = this.onResetStars.bind(this)
    this.onPackLeft = this.onPackLeft.bind(this)
    this.onSpaceEvenly = this.onSpaceEvenly.bind(this)
  }

  onAddStar () {
    const { starCount } = this.state
    this.setState({ starCount: starCount + 1 })
  }

  onRemoveStar () {
    const { starCount } = this.state
    this.setState({ starCount: starCount > 0 ? starCount - 1 : 0 })
  }

  onResetStars () {
    this.setState({ starCount: defaultStarCount }) 
  }

  onPackLeft () {
    const { packLeft } = this.state
    this.setState({ packLeft: !packLeft, spaceEvenly: false, packRight: false })
  }

  onSpaceEvenly () {
    const { spaceEvenly } = this.state
    this.setState({ spaceEvenly: !spaceEvenly, packLeft: false, packRight: false })
  }

  render () {
    const { starCount, packLeft, spaceEvenly } = this.state
    const { x, y, width, height } = this.props

    let stars = []
    for (let i = 0; i < starCount; i++) {
      stars.push(
        <Center key={i} horizontal vertical width={90} height={94}>
          <Star scale={0.5} />
        </Center>
      )
    }

    return (
      <Fragment>
        <SpacedRay
          start={[100, 300]}
          end={[1800, 300]}
          packLeft={packLeft}
          spaceEvenly={spaceEvenly}
          spaceBetween={packLeft ? 100 : null}
          showLayout
        >
          {stars}
        </SpacedRay>
        <SpacedRay start={[100, 100]} end={[1965, 100]} spaceBetween={20} packLeft mode={'horizontal'}>
          <Center vertical width={200} height={60}>
            <Button text={'Add a Star'} rx={15} ry={15} fill={'purple'} onClick={this.onAddStar} />
          </Center>
          <Center vertical width={250} height={60}>
            <Button text={'Remove a Star'} rx={15} ry={15} fill={'purple'} onClick={this.onRemoveStar} />
          </Center>
          <Center vertical width={250} height={60}>
            <Button text={'Reset Stars'} rx={15} ry={15} fill={'purple'} onClick={this.onResetStars} />
          </Center>
          <Center vertical width={200} height={60}>
            <Button text={'Pack'} rx={15} ry={15} fill={packLeft ? 'teal' : 'gray'} onClick={this.onPackLeft} />
          </Center>
          <Center vertical width={250} height={60}>
            <Button text={'Space Evenly'} rx={15} ry={15} fill={spaceEvenly ? 'teal' : 'gray'} onClick={this.onSpaceEvenly} />
          </Center>
        </SpacedRay>


      </Fragment>
    )
  }
}

module.exports = SpacedRays

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'react-bootstrap'

class AchievementList extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  render() {
    const { achievements: { allIds=[] } } = this.props
    return (
      <Table striped responsive hover condensed >
    	  <thead>
          <tr>
            <th>#</th>
            <th>Dog</th>
            <th>Round</th>
            <th>Dog Class</th>
            <th>Category</th>
            <th>Rank</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {allIds.map(this.renderRow)}
        </tbody>
      </Table>
    )
  }

  renderRow(id, idx) {
    const { achievements: { byId={} } } = this.props
    const achievement = achievements[id]
    return (
      <tr>
        <th><Button href="">{idx}</Button></th>
        <td>{achievement.dog.name}</td>
        <td>{achievement.round}</td>
        <td>{achievement.dogClass}</td>
        <td>{achievement.category}</td>
        <td>{achievement.rank}</td>
        <td>{achievement.score}</td>
      </tr>
    )
  }
}

AchievementList.propTypes = {
  achievements: PropTypes.object.isRequired
}

AchievementList.defaultProps = {
}

export default AchievementList

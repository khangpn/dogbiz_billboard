import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import AchievementList from './achievement_list'
import { searchAchievementsByShow } from '../actions/achievement-actions'

class AchievementListPanel extends Component {
  componentDidMount() {
    const { fetchAchievements, dogShowId } = this.props
    fetchAchievements(dogShowId)
  }

  render() {
    const { achievements } = this.props
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Achievements List</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <AchievementList achievements={achievements} />
        </Panel.Body>
      </Panel>
    )
  }

}

AchievementListPanel.propTypes = {
  dogShowId: PropTypes.string.isRequired,
  achievements: PropTypes.object.isRequired
}

AchievementListPanel.defaultProps = {
}

function mapStateToProps(state) {
  const { achievements } = state
  return {
    achievements
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAchievements: (showId) => {
      dispatch(searchAchievementsByShow(showId))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AchievementListPanel)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import AchievementList from './achievement_list'

class AchievementListPanel extends Component {
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AchievementListPanel)

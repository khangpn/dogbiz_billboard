import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import AchievementForm from './achievement_form'

class AddAchievementTool extends Component {
  render() {
    const { dogShowId } = this.props
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Add Achievement</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <AchievementForm dogShowId={dogShowId}/>
        </Panel.Body>
      </Panel>
    )
  }
}

AddAchievementTool.propTypes = {
  dogShowId: PropTypes.string.isRequired
}

AddAchievementTool.defaultProps = {
}

export default AddAchievementTool

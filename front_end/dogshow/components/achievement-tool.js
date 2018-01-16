import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import AddAchievementPanel from './add-achievement-panel'
import AchievementListPanel from './achievement-list-panel'

class AchievementTool extends Component {
  render() {
    const { dogShowId } = this.props
    return (
      <section>
        <AddAchievementPanel dogShowId={dogShowId}/>
        <AchievementListPanel />
      </section>
    )
  }
}

AchievementTool.propTypes = {
  dogShowId: PropTypes.string.isRequired
}

AchievementTool.defaultProps = {
}

export default AchievementTool

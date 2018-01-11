import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap'
import ValidableField from '../../../utils/components/validable-field.js'

class AchievementForm extends Component {
  render() {
    const { dogShowId, dogId="" } = this.props
    const { onDogChange } = this.props
    return (
      <section>
        <ValidableField value={dogId} required label="Dog" onChange={onDogChange}/>
      </section>
    )
  }
}

AchievementForm.propTypes = {
  dogShowId: PropTypes.string.isRequired
}

AchievementForm.defaultProps = {
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    onDogChanged: (e) => {
      e.prevenDefault()
      console.log(e.target.value)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AchievementForm)

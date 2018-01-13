import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectField from '../../../utils/components/select-field'

class JudgeSelectField extends Component {
  render() {
    const { judges={} } = this.props
    const { byId, allIds } = judges
    const options = allIds.map( judgeId => {
      return {
        value: judgeId,
        text: `${judgeId} - ${byId[judgeId]}`
      }
    })
    return  (
      <SelectField options={options} label='Judge' firstEmpty {...this.props}/>
    )
  }
}

JudgeSelectField.propTypes = {
  judges: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

JudgeSelectField.defaultProps = {
  required: false,
  disabled: false
}

function mapStateToProps(state) {
  return { 
    judges: state.judges
  }
}

export default connect(mapStateToProps, null)(JudgeSelectField)

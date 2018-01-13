import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectField from '../../../utils/components/select-field'
import { rounds } from '../../../utils/constants/form-fields-data'

class RoundSelectField extends Component {
  render() {
    const options = rounds.map( o => {
      return {
        value: o,
        text: o
      }
    })
    return  (
      <SelectField options={options} label='Round' firstEmpty {...this.props}/>
    )
  }
}

RoundSelectField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

RoundSelectField.defaultProps = {
  required: false,
  disabled: false
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, null)(RoundSelectField)

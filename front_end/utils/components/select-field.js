import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ValidableField from './validable-field'

/**
 * KnP: the component for all drop down list
 */
class SelectField extends Component {
  renderOption (option, idx) {
    const text = option.text || option.value
    return (
      <option key={idx} value={option.value}>{text}</option>
    )
  }
  render() {
    const { firstEmpty, options } = this.props
    return (
      <ValidableField componentClass="select" {...this.props}>
        {firstEmpty ? <option></option> : null}
        {options.map(this.renderOption)}
      </ValidableField>
    )
  }
}

SelectField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.shape(
    {
      value: PropTypes.string,
      text: PropTypes.node
    }
  )).isRequired,
  fistEmpty: PropTypes.bool,
  labelSize: PropTypes.number,
  fieldSize: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

SelectField.defaultProps = {
  firstEmpty: true,
  required: false,
  labelSize: 2,
  fieldSize: 3,
  disabled: false
}

export default SelectField

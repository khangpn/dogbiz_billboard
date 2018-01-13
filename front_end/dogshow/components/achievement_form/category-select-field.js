import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectField from '../../../utils/components/select-field'
import { categories } from '../../../utils/constants/form-fields-data'

class CategorySelectField extends Component {
  render() {
    const options = categories.map( o => {
      return {
        value: o,
        text: o
      }
    })
    return  (
      <SelectField options={options} label='Categories' firstEmpty {...this.props}/>
    )
  }
}

CategorySelectField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

CategorySelectField.defaultProps = {
  required: false,
  disabled: false
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, null)(CategorySelectField)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectField from '../../../utils/components/select-field'
import { dogClasses } from '../../../utils/constants/form-fields-data'

class DogClassSelectField extends Component {
  render() {
    //const { byId, allIds } = dogClasses
    const options = dogClasses.map( o => {
      return {
        value: o,
        text: o
      }
    })
    return  (
      <SelectField options={options} label='Dog Class' firstEmpty {...this.props}/>
    )
  }
}

DogClassSelectField.propTypes = {
  //dogClasses: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

DogClassSelectField.defaultProps = {
  required: false,
  disabled: false
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, null)(DogClassSelectField)

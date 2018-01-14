import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Typeahead } from 'react-bootstrap-typeahead'
import { FormGroup, ControlLabel, Col } from 'react-bootstrap'

class DogSelectField extends Component {
  render() {
    const { dogs={}, value, required } = this.props
    const { byId, allIds } = dogs
    const options = allIds.map( dogId => {
      return {
        value: dogId,
        text: `${dogId} - ${byId[dogId]}`
      }
    })
    const { fetchDogs, onChange } = this.props
    return  (
      <FormGroup validationState={this.validate(this.props) ? 'success' : 'error'}>
        <Col componentClass={ControlLabel} xs={2}>Dogs {required ? '*' : ''}</Col>
        <Col xs={3}>
          <Typeahead options={options} labelKey='text' selected={value}
            onChange={ onChange } onInputChange={ fetchDogs }/>
        </Col>
      </FormGroup>
    )
  }

  validate({ required = false, value = ''}) {
    if(!required) {
      return true
    }
    return value.trim() !== ''
  }
}

DogSelectField.propTypes = {
  dogs: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

DogSelectField.defaultProps = {
  required: false,
  disabled: false
}

function mapStateToProps(state) {
  const { dogs } = state
  return { 
    dogs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDogs: (dogInput) => {
      console.log(dogInput)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DogSelectField)

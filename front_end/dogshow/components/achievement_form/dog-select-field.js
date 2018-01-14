import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { FormGroup, ControlLabel, Col } from 'react-bootstrap'
import { fetchDogs } from  '../../actions/form-actions.js'

class DogSelectField extends Component {
  render() {
    const { dogs=[], value, required, isLoading=false } = this.props
    const options = dogs.map( dog => {
      return {
        value: dog.id,
        text: `${dog.chipId} - ${dog.name}`
      }
    })
    const { fetchDogs, onChange } = this.props
    return  (
      <FormGroup validationState={this.validate(this.props) ? 'success' : 'error'}>
        <Col componentClass={ControlLabel} xs={2}>Dogs {required ? '*' : ''}</Col>
        <Col xs={3}>
          <AsyncTypeahead options={options} labelKey='text' 
            onChange={ onChange } onSearch={ fetchDogs } delay={200} isLoading={isLoading}/>
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
  dogs: PropTypes.array.isRequired,
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
  const { form: { dogOptions: { isLoading=false, values: dogs = [] } = {} } } = state
  return { 
    isLoading,
    dogs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDogs: (dogInput) => {
      dispatch(fetchDogs(dogInput))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DogSelectField)

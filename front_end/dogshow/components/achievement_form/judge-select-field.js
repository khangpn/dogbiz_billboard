import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { FormGroup, ControlLabel, Col } from 'react-bootstrap'
import { fetchJudges } from  '../../actions/form-actions.js'

class JudgeSelectField extends Component {
  render() {
    const { judges=[], value, required, isLoading=false } = this.props
    const options = judges.map( judge => {
      return {
        value: judge.id,
        text: `${judge.id} - ${judge.fullname}`
      }
    })
    const { fetchJudges, onChange } = this.props
    return  (
      <FormGroup validationState={this.validate(this.props) ? 'success' : 'error'}>
        <Col componentClass={ControlLabel} xs={2}>Judges {required ? '*' : ''}</Col>
        <Col xs={3}>
          <AsyncTypeahead options={options} labelKey='text' 
            onChange={ onChange } onSearch={ fetchJudges } delay={200} isLoading={isLoading}/>
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

JudgeSelectField.propTypes = {
  judges: PropTypes.array.isRequired,
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
  const { form: { judgeOptions: { isLoading=false, values: judges = [] } = {} } } = state
  return { 
    isLoading,
    judges
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJudges: (judgeInput) => {
      dispatch(fetchJudges(judgeInput))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JudgeSelectField)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Typeahead } from 'react-bootstrap-typeahead'
import { FormGroup, ControlLabel, Col } from 'react-bootstrap'

class JudgeSelectField extends Component {
  render() {
    const { judges={}, value, required } = this.props
    const { byId, allIds } = judges
    const options = allIds.map( judgeId => {
      return {
        value: judgeId,
        text: `${judgeId} - ${byId[judgeId]}`
      }
    })
    const { fetchJudges, onChange } = this.props
    return  (
      <FormGroup validationState={this.validate(this.props) ? 'success' : 'error'}>
        <Col componentClass={ControlLabel} xs={2}>Judges {required ? '*' : ''}</Col>
        <Col xs={3}>
          <Typeahead options={options} labelKey='text' selected={value}
            onChange={ onChange } onInputChange={ fetchJudges }/>
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

function mapDispatchToProps(dispatch) {
  return {
    fetchJudges: (judgeInput) => {
      console.log(judgeInput)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JudgeSelectField)

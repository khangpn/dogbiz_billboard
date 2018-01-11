import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { HelpBlock, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap'

class ValidableField extends Component {
  render() {
    const { value, required, label, labelSize, fieldSize, message='', onChange } = this.props
    return (
      <FormGroup validationState={this.validate(this.props) ? 'success' : 'error'}>
        <Col componentClass={ControlLabel} xs={labelSize}>{label} {required ? '*' : ''}</Col>
        <Col xs={fieldSize}>
          <FormControl value={value} required={required} onChange={onChange} >
            {this.props.children}
          </FormControl>
        </Col>
        <Col>
          <HelpBlock>{message}</HelpBlock>
        </Col>
      </FormGroup>
    )
  }

  validate(props) {
    const { required, value } = props
    if(!required) {
      return true
    }
    if (!value) return false
    return value.trim() !== ''
  }
}

ValidableField.propTypes = {
  value: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  componentClass: PropTypes.node,
  labelSize: PropTypes.number,
  fieldSize: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.node
}

ValidableField.defaultProps = {
  value: '',
  required: false,
  fieldSize: 3,
  labelSize: 2
}

export default ValidableField

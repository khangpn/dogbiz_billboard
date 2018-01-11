import React, { Component, PropTypes } from 'react'
import { ControlLabel, FormGroup, Col, FormControl } from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker'
import { FormattedMessage } from 'react-intl'
import FontAwesome from 'react-fontawesome'

class DateField extends Component {
  render() {
    const { label, disabled, required, dateFormat, onChange, value} = this.props
    return(
      <FormGroup>
        <Col componentClass={ControlLabel} xs={2}>{label}{required ? '*' : null}</Col>
        <Col xs={3}>
          {
            disabled ? 
            <FormControl.Static>{value}</FormControl.Static>: 
            <DatePicker dateFormat={dateFormat} value={value} onChange={onChange}
              clearButtonElement={<FontAwesome name="times" />}/>
          }
        </Col>
      </FormGroup>
    )
  }
}

DateField.propTypes = {
  label: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  dateFormat: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

DateField.defaultProps = {
  dateFormat: 'YYYY-MM-DD',
  value: '',
  required: false,
  disabled: false
}
export default DateField
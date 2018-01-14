import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel, FormGroup, FormControl, HelpBlock, ControlLabel, Form } from 'react-bootstrap'
import { setAchievementField } from '../../actions/form-actions.js'
import ValidableField from '../../../utils/components/validable-field.js'
import JudgeSelectField from './judge-select-field.js'
import DogClassSelectField from './dog-class-select-field.js'
import RoundSelectField from './round-select-field.js'
import CategorySelectField from './category-select-field.js'
import DogSelectField from './dog-select-field.js'

class AchievementForm extends Component {
  render() {
    const { dogShowId, dogId, rank, note, judgeId, dogClass,
      round, category } = this.props
    const { onDogChange, onRankChange, onNoteChange,
      onJudgeChange, onDogClassChange, onRoundChange,
      onCategoryChange } = this.props
    return (
      <Form horizontal>
        <DogSelectField onChange={onDogChange} required value={dogId} />
        <JudgeSelectField onChange={onJudgeChange} value={judgeId} required />
        <DogClassSelectField onChange={onDogClassChange} value={dogClass} required />
        <RoundSelectField onChange={onRoundChange} value={round} required />
        <CategorySelectField onChange={onCategoryChange} value={category} required />
        <ValidableField value={rank} required label="Rank" onChange={onRankChange}/>
        <ValidableField componentClass="textarea" value={note} label="Note" onChange={onNoteChange}/>
      </Form>
    )
  }
}

AchievementForm.propTypes = {
  dogShowId: PropTypes.string.isRequired
}

AchievementForm.defaultProps = {
}

function mapStateToProps(state) {
  console.log("State", state)
  //const { judgeId, dogId, rank, note, dogClass } = state.form
  return {
    ...state.form
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCategoryChange: (e) => {
      e.preventDefault();
      dispatch(setAchievementField("category", e.target.value))
    },
    onRoundChange: (e) => {
      e.preventDefault();
      dispatch(setAchievementField("round", e.target.value))
    },
    onDogClassChange: (e) => {
      e.preventDefault();
      dispatch(setAchievementField("dogClass", e.target.value))
    },
    onJudgeChange: (e) => {
      e.preventDefault();
      dispatch(setAchievementField("judgeId", e.target.value))
    },
    onNoteChange: (e) => {
      e.preventDefault();
      dispatch(setAchievementField("note", e.target.value))
    },
    onRankChange: (e) => {
      e.preventDefault();
      dispatch(setAchievementField("rank", e.target.value))
    },
    onDogChange: (e) => {
      e.preventDefault();
      dispatch(setAchievementField("dogId", e.target.value))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AchievementForm)

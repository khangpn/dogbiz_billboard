import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel, FormGroup, FormControl, HelpBlock, ControlLabel, Form,
  Button} from 'react-bootstrap'
import { setAchievementField, saveAchievement } from '../../actions/form-actions.js'
import ValidableField from '../../../utils/components/validable-field.js'
import JudgeSelectField from './judge-select-field.js'
import DogClassSelectField from './dog-class-select-field.js'
import RoundSelectField from './round-select-field.js'
import CategorySelectField from './category-select-field.js'
import DogSelectField from './dog-select-field.js'

class AchievementForm extends Component {
  componentDidMount() {
    const { dogShowId, setDogShowId } = this.props
    setDogShowId(dogShowId)
  }

  render() {
    const { dogId, rank, note, judgeId, dogClass, score,
      round, category } = this.props
    const { onDogChange, onRankChange, onNoteChange,
      onJudgeChange, onDogClassChange, onRoundChange,
      onCategoryChange, onAddAchievementClick, onScoreChange,
      } = this.props
    return (
      <Form horizontal>
        <DogSelectField onChange={onDogChange} required value={dogId} />
        <JudgeSelectField onChange={onJudgeChange} value={judgeId} required />
        <DogClassSelectField onChange={onDogClassChange} value={dogClass} required />
        <RoundSelectField onChange={onRoundChange} value={round} required />
        <CategorySelectField onChange={onCategoryChange} value={category} required />
        <ValidableField value={rank} required label="Rank" onChange={onRankChange}/>
        <ValidableField value={score} required label="Score" onChange={onScoreChange}/>
        <ValidableField componentClass="textarea" value={note} label="Note" onChange={onNoteChange}/>
        <Button bsStyle="primary" onClick={onAddAchievementClick}>Add Achievement</Button>
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
    setDogShowId: (dogShowId) => {
      dispatch(setAchievementField("dogShowId", dogShowId))
    },
    onAddAchievementClick: (e) => {
      e.preventDefault();
      dispatch(saveAchievement())
    },
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
    onJudgeChange: (judge) => {
      if (judge.length > 0) {
        dispatch(setAchievementField("judgeId", judge[0].value.toString()))
      } else {
        dispatch(setAchievementField("judgeId", ''))
      }
    },
    onNoteChange: (e) => {
      e.preventDefault();
      dispatch(setAchievementField("note", e.target.value))
    },
    onRankChange: (e) => {
      e.preventDefault();
      dispatch(setAchievementField("rank", e.target.value))
    },
    onScoreChange: (e) => {
      e.preventDefault();
      dispatch(setAchievementField("score", e.target.value))
    },
    onDogChange: (dog) => {
      if (dog.length > 0) {
        dispatch(setAchievementField("dogId", dog[0].value.toString()))
      } else {
        dispatch(setAchievementField("dogId", ''))
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AchievementForm)

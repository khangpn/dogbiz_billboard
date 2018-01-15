import { combineReducers } from 'redux'
import judges from './judges'
import dogs from './dogs'
import achievements from './achievements'
import * as ActionTypes from '../constants/action-types.js'

const form = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FORM_SET_DOG_ID:
      return {...state, dogId: action.dogId, dog_id: action.dogId} 
    case ActionTypes.FORM_SET_DOG_OPTIONS:
      return {...state, dogOptions: action.dogOptions} 
    case ActionTypes.FORM_SET_DOG_SHOW_ID:
      return {...state, dogShowId: action.dogShowId, dog_show_id:action.dogShowId}
    case ActionTypes.FORM_SET_JUDGE_ID:
      return {...state, judgeId: action.judgeId, judge_id:action.judgeId}
    case ActionTypes.FORM_SET_DOG_CLASS:
      return {...state, dogClass: action.dogClass}
    case ActionTypes.FORM_SET_ROUND:
      return {...state, round: action.round}
    case ActionTypes.FORM_SET_CATEGORY:
      return {...state, category: action.category}
    case ActionTypes.FORM_SET_RANK:
      return {...state, rank: action.rank}
    case ActionTypes.FORM_SET_SCORE:
      return {...state, score: action.score}
    case ActionTypes.FORM_SET_NOTE:
      return {...state, note: action.note}
    case ActionTypes.FORM_FETCH_DOG_OPTIONS_REQUEST:
      return {...state, dogOptions: {isLoading: true}}
    case ActionTypes.FORM_FETCH_DOG_OPTIONS_SUCCESS:
      return {...state, dogOptions: {isLoading: false, values: action.dogs}}
    case ActionTypes.FORM_FETCH_DOG_OPTIONS_FAILURE:
      return {...state, dogOptions: {isLoading: false}}
    case ActionTypes.FORM_FETCH_JUDGE_OPTIONS_REQUEST:
      return {...state, judgeOptions: {isLoading: true}}
    case ActionTypes.FORM_FETCH_JUDGE_OPTIONS_SUCCESS:
      return {...state, judgeOptions: {isLoading: false, values: action.judges}}
    case ActionTypes.FORM_FETCH_JUDGE_OPTIONS_FAILURE:
      return {...state, judgeOptions: {isLoading: false}}
    case ActionTypes.SAVE_ACHIEVEMENT_REQUEST:
      return {...state, isSaving: true}
    case ActionTypes.SAVE_ACHIEVEMENT_SUCCESS:
      return {...state, isSaving: false}
    case ActionTypes.SAVE_ACHIEVEMENT_FAILURE:
      return {...state, isSaving: false}
    case ActionTypes.FORM_CLEAR:
      return {}
    default:
      return state
  }
}

const dogShowApp = combineReducers({
  judges,
  dogs,
  form,
  achievements
})

export default dogShowApp

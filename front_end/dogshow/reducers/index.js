import { combineReducers } from 'redux'
import dogs from './dogs'
import achievements from './achievements'
import * as ActionTypes from '../constants/action-types.js'

const form = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SET_DOG_ID:
      return {...state, dogId: action.dogId} 
    case ActionTypes.SET_SHOW_ID:
      return {...state, showId: action.showId}
    case ActionTypes.SET_JUDGE_ID:
      return {...state, judgeId: action.judgeId}
    case ActionTypes.SET_DOG_CLASS:
      return {...state, dogClass: action.dogClass}
    case ActionTypes.SET_ROUND_TYPE:
      return {...state, roundType: action.roundType}
    case ActionTypes.SET_CATEGORY:
      return {...state, category: action.category}
    case ActionTypes.SET_RANK:
      return {...state, rank: action.rank}
    case ActionTypes.SET_NOTE:
      return {...state, note: action.note}
    case ActionTypes.CLEAR:
      return {}
    default:
      return state
  }
}

const dogShowApp = combineReducers({
  dogs,
  form,
  achievements
})

export default dogShowApp

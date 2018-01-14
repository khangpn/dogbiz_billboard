import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/action-types.js'
import EntityHelper from '../../utils/reducer-helper.js'

const byId = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_JUDGE_ENTITIES:
      return EntityHelper.addEntities(state, action.judges)
    case ActionTypes.CLEAR_JUDGE_ENTITIES:
      return {}
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_JUDGE_ENTITIES:
      return EntityHelper.addEntityIds(state, action.judges)
    case ActionTypes.CLEAR_JUDGE_ENTITIES:
      return []
    default:
      return state
  }
}

const judges = combineReducers({
  byId,
  allIds
})

export default judges

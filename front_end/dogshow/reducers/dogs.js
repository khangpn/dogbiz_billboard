import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/action-types.js'
import EntityHelper from '../../utils/reducer-helper.js'

const byId = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DOG_ENTITIES:
      return EntityHelper.addEntities(state, action.dogs)
    case ActionTypes.CLEAR_DOG_ENTITIES:
      return {}
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_DOG_ENTITIES:
      return EntityHelper.addEntityId(state, action.dogs)
    case ActionTypes.CLEAR_DOG_ENTITIES:
      return []
    default:
      return state
  }
}

const dogs = combineReducers({
  byId,
  allIds
})

export default dogs

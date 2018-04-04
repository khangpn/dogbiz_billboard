import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/action-types.js'
import EntityHelper from '../../utils/reducer-helper.js'


const byId = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ACHIEVEMENT_ENTITIES:
      return { ...EntityHelper.addEntities(state, action.achievements) }
    case ActionTypes.SAVE_ACHIEVEMENT_SUCCESS:
      return { ...EntityHelper.addEntity(state, action.achievement) }
    case ActionTypes.CLEAR_ACHIEVEMENT_ENTITIES:
      return {}
    case ActionTypes.REMOVE_ACHIEVEMENT_ENTITY:
      var id = action.achievement.id;
      delete state[id];
      return {...state};
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_ACHIEVEMENT_ENTITIES:
      return [...EntityHelper.addEntityIds(state, action.achievements)]
    case ActionTypes.SAVE_ACHIEVEMENT_SUCCESS:
      return [...EntityHelper.addEntityId(state, action.achievement)]
    case ActionTypes.CLEAR_ACHIEVEMENT_ENTITIES:
      return [];
    case ActionTypes.REMOVE_ACHIEVEMENT_ENTITY:
      var result;
      state.forEach((id, index) => {
        if (id === action.achievement.id) {
          result = index;
        }
      });
      state.splice(result, 1);
      return [...state];
    default:
      return state
  }
}

const achievements = combineReducers({
  byId,
  allIds
})

export default achievements

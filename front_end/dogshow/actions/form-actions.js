import { formSetters } from '../constants/action-types.js'
import * as ActionTypes from '../constants/action-types.js'

export function setAchievementField (fieldName, fieldValue) {
  return {
    type: formSetters[fieldName],
    [fieldName]: fieldValue
  }
}

export function fetchDogs (dogInput) {
  return ( dispatch, getState ) => {

  }
}

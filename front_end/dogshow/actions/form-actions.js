import { buildUrl, getJSON } from '../../utils/fetch-helper.js'
import * as ActionTypes from '../constants/action-types.js'
const { formSetters } = ActionTypes

export function setAchievementField (fieldName, fieldValue) {
  return {
    type: formSetters[fieldName],
    [fieldName]: fieldValue
  }
}

export function addDogEntities(dogs) {
  return {
    type: ActionTypes.ADD_DOG_ENTITIES,
    dogs
  }
}

export function fetchDogRequest() {
  return {
    type: ActionTypes.FORM_FETCH_DOG_OPTIONS_REQUEST
  }
}

export function fetchDogFailure() {
  return {
    type: ActionTypes.FORM_FETCH_DOG_OPTIONS_FAILURE
  }
}

export function fetchDogSuccess(dogs) {
  return {
    type: ActionTypes.FORM_FETCH_DOG_OPTIONS_SUCCESS,
    dogs
  }
}

export function fetchDogs (dogInput) {
  return ( dispatch, getState ) => {
    if (!dogInput) return null
    const url = buildUrl('/api/dogs/', {searchTerm: dogInput})
    dispatch(fetchDogRequest())
    return getJSON(url).then( (dogs) => {
      dispatch(fetchDogSuccess(dogs))
    }).catch( (error) => {
      dispatch(fetchDogFailure())
      console.error("Fetch dogs errors", error)
      return null
    })
  }
}

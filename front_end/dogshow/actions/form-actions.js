import { buildUrl, getJSON, postJSON } from '../../utils/fetch-helper.js'
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

export function fetchJudgeRequest() {
  return {
    type: ActionTypes.FORM_FETCH_JUDGE_OPTIONS_REQUEST
  }
}

export function fetchJudgeFailure() {
  return {
    type: ActionTypes.FORM_FETCH_JUDGE_OPTIONS_FAILURE
  }
}

export function fetchJudgeSuccess(judges) {
  return {
    type: ActionTypes.FORM_FETCH_JUDGE_OPTIONS_SUCCESS,
    judges
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

export function fetchJudges (judgeInput) {
  return ( dispatch, getState ) => {
    if (!judgeInput) return null
    const url = buildUrl('/api/judges/', {searchTerm: judgeInput})
    dispatch(fetchJudgeRequest())
    return getJSON(url).then( (judges) => {
      dispatch(fetchJudgeSuccess(judges))
    }).catch( (error) => {
      dispatch(fetchJudgeFailure())
      console.error("Fetch judges errors", error)
      return null
    })
  }
}

export function saveAchievementRequest() {
  return {
    type: ActionTypes.SAVE_ACHIEVEMENT_REQUEST
  }
}

export function saveAchievementSuccess(achievement) {
  return {
    type: ActionTypes.SAVE_ACHIEVEMENT_SUCCESS,
    achievement
  }
}

export function saveAchievementFailure() {
  return {
    type: ActionTypes.SAVE_ACHIEVEMENT_FAILURE
  }
}

export function saveAchievement () {
  return ( dispatch, getState ) => {
    const form = getState().form
    dispatch(saveAchievementRequest())
    return postJSON('/api/achievements', form).then( (res) => {
      const {achievement, created} = res
      if (created) {
        dispatch(saveAchievementSuccess(achievement))
      } else {
        console.log("Achievement already existed", achievement)
        dispatch(saveAchievementFailure())
      }
      return achievement
    }).catch( (error) => {
      dispatch(saveAchievementFailure())
      console.error("Save achievement errors", error)
      return null
    })
  }
}

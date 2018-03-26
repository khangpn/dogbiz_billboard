import { buildUrl, getJSON, postJSON } from '../../utils/fetch-helper.js'
import { achievementEntities } from '../constants/action-types.js'

export function addAchievements (achievements) {
  return {
    type: achievementEntities.addBulk,
    achievements
  }
}

export function addAchievement(achievement) {
  return {
    type: achievementEntities.add,
    achievement
  }
}

export function clearAchievements () {
  return {
    type: achievementEntities.clear,
  }
}

export function removeAchievement(achievement) {
  return {
    type: achievementEntities.remove,
    achievement
  }
}

export function searchAchievementsByShow (showId) {
  return ( dispatch, getState ) => {
    if (!showId) return null
    const url = `/api/achievements/dog_show/${showId}`
    return getJSON(url).then( (achievements) => {
      dispatch(addAchievements(achievements))
    }).catch( (error) => {
      console.error("Search achievements failure", error)
      throw error
    })
  }
}

import { formSetters } from '../constants/action-types.js'

export function setAchievementField (fieldName, fieldValue) {
  return {
    type: formSetters[fieldName],
    [fieldName]: fieldValue
  }
}

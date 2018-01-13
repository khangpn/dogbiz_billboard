import { combineReducers } from 'redux'

const byId = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
}

const judges = combineReducers({
  byId,
  allIds
})

export default judges

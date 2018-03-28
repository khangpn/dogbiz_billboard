import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import dogShowApp from './reducers'
import AchievementTool from './components/achievement-tool'

let store = createStore(dogShowApp, applyMiddleware(thunk))

const container = document.getElementById('root')
document.addEventListener('DOMContentLoaded', () => {
  render (
    <Provider store={store}>
      <AchievementTool dogShowId={container.getAttribute('dogShowId')}/>
    </Provider>,
    container
  )
})

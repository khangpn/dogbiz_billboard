import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import dogShowApp from './reducers'
import AddAchievementTool from './components/add-achievement-tool'

let store = createStore(dogShowApp)

const container = document.getElementById('root')
document.addEventListener('DOMContentLoaded', () => {
  render (
    <Provider store={store}>
      <AddAchievementTool dogShowId={container.getAttribute('dogShowId')}/>
    </Provider>,
    container
  )
})

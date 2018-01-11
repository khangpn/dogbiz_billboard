import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import dogShowApp from './reducers'
import App from './components/app'

let store = createStore(dogShowApp)

document.addEventListener('DOMContentLoaded', () => {
  render (
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
})

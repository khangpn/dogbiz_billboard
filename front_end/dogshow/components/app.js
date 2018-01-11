import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import AchievementForm from './achievement_form'

class App extends Component {
  render() {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Add Achievement</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <AchievementForm dogShowId={"123"}/>
        </Panel.Body>
      </Panel>
    )
  }
}

export default App

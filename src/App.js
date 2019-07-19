import React from 'react'
import routes from './routes'
import Nav from './Components/Nav/Nav'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        {routes}
      </div>
    )
  }
}

export default App

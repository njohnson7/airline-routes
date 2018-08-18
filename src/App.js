import React, { Component } from 'react'
import './App.css'
import data from './data'

console.log(data)

class App extends Component {
  state = {
    routes: data.routes,
    airlines: data.airlines,
    airports: data.airports,
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <table>
            <thead>
              <tr>
                <th>Airline</th>
                <th>Source Airport</th>
                <th>Destination Airport</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.routes.map(route => (
                  <tr>
                    <td>{route.airline}</td>
                    <td>{route.src}</td>
                    <td>{route.dest}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </section>
      </div>
    )
  }
}

class Table extends Component {
  render() {
    return <p>42</p>
  }
}

export default App

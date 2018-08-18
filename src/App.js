import React, { Component } from 'react'
import './App.css'
import data from './data'

console.log(data.getAirlineById(24).name)

class App extends Component {
  state = {
    routes:   data.routes,
    airlines: data.airlines,
    airports: data.airports,
  }

  getAirlineById = data.getAirlineById

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
                    <td>{data.getAirlineById(route.airline).name}</td>
                    <td>{data.getAirportByCode(route.src).name}</td>
                    <td>{data.getAirportByCode(route.dest).name}</td>
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

console.log(App)
export default App

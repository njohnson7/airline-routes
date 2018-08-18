import React, { Component } from 'react'
import './App.css'
import data from './data'

const columns = [
  { name: 'Airline', property: 'airline' },
  { name: 'Source Airport', property: 'src' },
  { name: 'Destination Airport', property: 'dest' },
]

class App extends Component {
  state = {
    routes:   data.routes,
    airlines: data.airlines,
    airports: data.airports,
  }

  getAirlineById   = data.getAirlineById
  getAirportByCode = data.getAirportByCode

  formatValue(property, value = 'name') {
    return property[value]
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table className="routes-table" columns={columns} rows={this.state.routes} format={this.formatValue} />
        </section>
      </div>
    )
  }
}

class Table extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            {
              this.props.columns.map(column => (
                <th>{this.props.format(column)}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            this.props.rows.map(row => (
              <tr>
                <td>{this.props.format(data.getAirlineById(row.airline))}</td>
                <td>{this.props.format(data.getAirportByCode(row.src))}</td>
                <td>{this.props.format(data.getAirportByCode(row.dest))}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default App

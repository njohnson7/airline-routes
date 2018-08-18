import React, { Component } from 'react'
import './App.css'
import data from './data'

const p = x => {
  console.log(x)
  return x
}

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
          <Table
            className="routes-table"
            columns={columns}
            rows={this.state.routes}
            format={this.formatValue}
            perPage={25}
            start={0}
          />
        </section>
      </div>
    )
  }
}

class Table extends Component {
  constructor() {
    super()
    this.state = { currentPage: 1 }
  }
  totalPages = () => {
    return Math.ceil(this.props.rows / this.props.perPage)
  }
  startIndex = () => {
    return p(p(this.props.perPage) * (p(this.state.currentPage) - 1))
  }
  endIndex = () => {
    return p(this.startIndex() + this.props.perPage)
  }
  previousPageClick = () => {
    this.setState({ currentPage: Math.max(this.state.currentPage - 1, 1) })
    this.render()
  }
  nextPageClick = () => {
    this.setState({ currentPage: Math.min(this.state.currentPage + 1, this.totalPages()) })
    this.render()
  }
  render() {
    return (
      <div>
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
              this.props.rows.slice(this.startIndex(), this.endIndex()).map(row => (
                <tr>
                  <td>{this.props.format(data.getAirlineById(row.airline))}</td>
                  <td>{this.props.format(data.getAirportByCode(row.src))}</td>
                  <td>{this.props.format(data.getAirportByCode(row.dest))}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <p>Showing {this.props.start + 1}-{this.props.start + this.props.perPage} of {this.props.rows.length} routes</p>
        <button onClick={this.previousPageClick}>Previous Page</button>
        <button onClick={this.nextPageClick}>Next Page</button>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import './App.css'
import data from './data'

// const p = x => {
//   console.log(x)
//   return x
// }

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

  formatValue(property, value = 'name') {
    return property[value]
  }

  filter = () => {
    let airlineId = document.querySelector('#airline').value
    let airportCode = document.querySelector('#airport').value
    this.setState({
      routes: data.routes.filter(route => (
        (!airlineId || route.airline == airlineId)
        && (!airportCode || route.src == airportCode || route.dest == airportCode)
      )),
    })
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
            filter={this.filter}
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

  // log = (fn_name = '[FN NAME]') => {
  //   console.log(fn_name)
  //   console.log('Table.props: ', this.props)
  //   console.log('Table.state: ', this.state, JSON.stringify(this.state))
  // }

  totalPages = () => {
    return Math.ceil(this.props.rows.length / this.props.perPage)
  }

  startIndex = () => {
    return this.props.perPage * (this.state.currentPage - 1)
  }

  endIndex = () => {
    return this.startIndex() + this.props.perPage
  }

  previousPageClick = () => {
    if (this.state.currentPage <= 1) {
      // TODO: disable button
      return
    }
    this.setState({ currentPage: this.state.currentPage - 1 })
  }

  nextPageClick = () => {
    if (this.state.currentPage >= this.totalPages()) {
      // TODO: disable button
      return
    }
    this.setState({ currentPage: this.state.currentPage + 1 })
  }

  filter = () => {
    this.setState({
      currentPage: 1,
    })
    this.props.filter()
  }

  reset = (e) => {
    e.preventDefault()
    document.querySelector('#filter').reset()
    this.filter()
  }

  render() {
    return (
      <div>
        <div className='filter'>
          <form id='filter' onChange={this.filter}>
            <label className='airline'>Show routes on</label>
            <select id='airline' className='airline'>
              <option value=''>All Airlines</option>
              {
                data.airlines.map(airline => (
                  <option value={this.props.format(airline, 'id')} disabled={!this.props.rows.some(row => row.airline == airline.id)}>
                    {this.props.format(airline)}
                  </option>
                ))
              }
            </select>
            <label className='airport'>flying in or out of</label>
            <select id='airport' className='airport'>
              <option value=''>All Airports</option>
              {
                data.airports.map(airport => (
                  <option value={this.props.format(airport, 'code')} disabled={!this.props.rows.some(row => [row.src, row.dest].includes(airport.code))}>
                    {this.props.format(airport)}
                  </option>
                ))
              }
            </select>
            <button type='reset' onClick={this.reset}>Show All Routes</button>
          </form>
        </div>
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
        <p>Showing {this.startIndex() + 1}-{Math.min(this.startIndex() + this.props.perPage, this.props.rows.length)} of {this.props.rows.length} routes</p>
        <button id='previous' onClick={this.previousPageClick}>Previous Page</button>
        <button id='next' onClick={this.nextPageClick}>Next Page</button>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Main from '../main'

class Head extends Component {
  constructor (props) {
    super()
  }
  render () {
    return (
      <nav id='head' className='row navbar navbar-default navbar-static-top'>
        <div className='container'>
          <h1>Flickr-Api</h1>
        </div>
      </nav>
    )
  }
}

export default Head

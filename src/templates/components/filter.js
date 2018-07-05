import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Filter = (props) => {
  return (
    <div className='col-xs-5'>
      <small>Sort:</small>
      <select onChange={props.callback}>
        <option value='relevance'>Relevance</option>
        <option value='interestingness-asc'>Interestingness ASC</option>
        <option value='interestingness-desc'>Interestingness DESC</option>
        <option value='date-posted-asc'>Date posted ASC</option>
        <option value='date-posted-desc'>Date posted DESC</option>
        <option value='date-taken-asc'>Date taken ASC</option>
        <option value='date-taken-desc'>Date taken DESC</option>
      </select>
    </div>
  )
}

Filter.propTypes = {
  callback: PropTypes.func.isRequired
}

export default Filter

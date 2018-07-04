import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types"

const SearchInput = (props) => {
  function preventSubmit(e){
    e.preventDefault()
  }
  return (
    <form className="col-xs-7" onSubmit={preventSubmit}>
      <small>Search:</small>
      <input onChange={props.callback} autoComplete="off" type="text" name="search" value={props.searchTerm} />
    </form>
  )
}

SearchInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
}

export default SearchInput;

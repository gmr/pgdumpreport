import React from 'react'

const style = {color: '#fff'};

export default function(props) {
  return (
    <nav className="navbar navbar-dark bg-primary justify-content-between">
      <a className="navbar-brand" id="top" style={style}>
        <i className="fas fa-database" /> {props.file}
      </a>
      <form className="form-inline">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
      </form>
    </nav>);
}

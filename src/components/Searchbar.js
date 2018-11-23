import React, { Component } from 'react';
import { connect } from "react-redux";
// Redux Actions
import { addArticle, setFilter } from '../actions';
// Images
import Search from '../assets/icon/search.svg';

const mapDispatch = dispatch => {
  return {
    setFilter: filterParam => dispatch(setFilter(filterParam))
  };
};

class Searchbar extends Component {

  constructor() {
    super();
    this.state = {
    };
  };

  handleInputChanges = (e) => {
    const filterParam = e.target.value.toLowerCase();
    this.props.setFilter(filterParam);
  }

  render() {
    console.log(this);
    return ( 
      <div className="c-searchbar">
        <div className="c-searchbar-container">
          <img  className="c-searchbar-icon" src= {Search} alt=""/>
          <input className="c-searchbar-input" placeholder="Buscar..." type="text" onChange={this.handleInputChanges} />
        </div>
      </div>
    );
  }
}


export default connect(null, mapDispatch)(Searchbar);
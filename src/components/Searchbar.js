import React, { Component } from 'react';
import { connect } from "react-redux";
// Redux Actions
import { setFilter } from './../redux';
// Images
import Search from '../assets/icon/search.svg';
import iconAdd from '../assets/icon/add.svg';
import { fs } from '../firestore';

const mapState = state => ({ 
  filter: state.filter,
 });

const mapDispatch = dispatch => ({
  setFilter: filterParam => dispatch(setFilter(filterParam)),
});

class Searchbar extends Component {

  constructor() {
    super();
    this.state = {
    };
  };

  componentDidMount() {
    this.props.setFilter('');
  }

  render() {
    return ( 
      <div className="c-searchbar">
        {/* <div style={({color: 'white'})}>{this.props.filter}</div> */}
        <div className="c-searchbar-container">
          <img  className="c-searchbar-icon" src= {Search} alt=""/>
          <input className="c-searchbar-input" placeholder="Buscar..." type="text" onChange={this.handleInputChanges} />
        </div>
        <div className="c-searchbar-add" onClick={this.newProduct}>
          <img src= {iconAdd} alt=""/>
        </div>
        
      </div>
    );
  }

  handleInputChanges = (e) => {
    const filterParam = e.target.value.toLowerCase();
    this.props.setFilter(filterParam);
  }

  newProduct = () => fs.addDoc({
    name: this.props.filter,
    onList: true,
    checked: false
  })

}


export default connect(mapState, mapDispatch)(Searchbar);
import React, { Component } from 'react';

// Components
import Topbar from '../components/Topbar';
import { fs } from '../firestore';

const NewProductInput = props => {
  const getValue = (event) => {props.getValue(event.target.value)}
  return (
    <input 
      className="c-input"
      placeholder={props.placeholder}
      type="text"
      value={props.value}
      onChange={getValue}
    />
  )
};

const Button = props => {
  return (
    <button disabled={props.disabled} className={`c-button`} onClick={props.handleClick}>Añadir producto</button>
  )
};

class Newproduct extends Component {
  
  constructor() {
    super();
    this.state = {
      onList: false,
      checked: false,
      name: ''
    };
  };

  setValue = (value) => {
    this.setState(() => ({
      name: value
    }));
  }

  submit = () => {
    fs.addDoc({
      name: this.state.name.toLowerCase(),
      onList: this.state.onList,
      checked: this.state.checked
    })
    this.setState(() => ({
      name: ''
    }));
  }

  render() {
    return ( 
      <div className={`o-page ${this.props.history.action}`}>
        <Topbar
          history={this.props.history}
          displayBack={true} 
          title={'Nuevo producto'}
        />
        <section className="o-section --flex">
          <div className="c-newproduct-input">
            <NewProductInput
              getValue={this.setValue}
              value={this.state.name}
              placeholder={'Nuevo producto'}
            />
          </div>
          <div className="c-newproduct-submit">          
            <Button 
              disabled={this.state.name === '' ? true : false}
              handleClick={this.submit}
            />
          </div>
        </section>
      </div>
    );
  }

}

export default Newproduct;
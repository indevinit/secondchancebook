import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
 
export default class Home extends Component {  
  render() {
    return (
      <div className='logreg'>
        <h1 className='header' >Second Chance Book</h1> <br/>
        <div className="welcome" >where books are given the second chance to enlight your days<br/>
        <h3>#1 site to Buy and Sell Books</h3></div>
        <br/>
        <br/>
      
        <Register/>
     
        <Login history={this.props.history} />
      </div>
  
    )
  }
}

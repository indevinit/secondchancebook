import React, { Component } from 'react';
import axios from 'axios';

import { Redirect, Link } from 'react-router-dom';
axios.defaults.withCredentials= true;

class Showlisting extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:null,
            isLoggedIn:true
        }
        axios.get(`https://server-secondchancebook.herokuapp.com/api/showOne/${this.props.match.params.listingId}`)
        .then((data)=>{this.setState({data:data.data})});
        axios.get('https://server-secondchancebook.herokuapp.com/api/isloggedin')
        .then((user)=>{this.setState({isLoggedIn:user.data})})
    }
    
    render() {
        var listing = this.state.data;
        return (
            !this.state.isLoggedIn ? <Redirect to='/'/> :

            (this.state.data &&
            <div className="card text-center">
                <div className="card-body">
                    <h3 className="card-title">Book Title: {listing.title}</h3>
                    <p className="card-text"><b>Book Description:</b> {listing.description}</p>
                    <p className="card-text btn-sm"> <b>Location:</b> {listing.location}</p>
                    <p className="card-text btn-sm"> <b>Phone number:</b> {listing.contact}</p>
                </div>
                <div className="card-footer text-muted"> offered by: {listing.user.firstname} | at {(listing.createdAt).slice(0,10)}</div>
                <Link style={{width:'200px', margin:'auto'}} className='btn btn-warning btn-sm' to='/mainpage' > Back to listings</Link>
            </div>)
        );
    }
}

export default Showlisting;

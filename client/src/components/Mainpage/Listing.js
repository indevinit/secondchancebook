import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials= true;
class Listing extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:null
        }

        axios.get('https://server-secondchancebook.herokuapp.com/api/current_user')
        .then((user)=>{this.setState({user:user.data})})
        this.deleteHandler = this.deleteHandler.bind(this);
    }
    
    deleteHandler(e){
        axios.delete('https://server-secondchancebook.herokuapp.com/api/postdelete/'+this.props.listing._id)
        .then((res)=>{
            this.props.pageRefresh();
        })
    }
    render() {
        var listing = this.props.listing;
        return (
            
           <div className="card">
                <h5 className="card-header">{listing.title} </h5>
                <div className="card-body">
                    <h5 className="card-title">offered by : {listing.user.firstname}</h5>
                    <p className="card-text">{listing.description}</p>
                    <Link to={'/listing/'+listing._id} className="btn btn-success btn-sm">See book detail</Link> <br/><br/>
                    {this.state.user && this.state.user._id===listing.user._id && <p className='btn btn-danger btn-sm' name={listing._id} onClick={() => { if (window.confirm('Are you sure you want to delete this post?')) this.deleteHandler() } } >Delete your book listing</p> }
                </div>
            </div>
        );
    }
}

export default Listing;

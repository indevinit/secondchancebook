import React, { Component } from 'react';
import axios from 'axios';

import { Redirect, Link } from 'react-router-dom';
axios.defaults.withCredentials= true;

class Postlisting extends Component {
    constructor(props) {
        super(props);
        this.state={
            formData:{
                title:'',
                description:'',
                location:'',
                price:'',
                contact:''
            },
            isLoggedIn:true,
            errors:null
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        axios.get('https://server-secondchancebook.herokuapp.com/api/isloggedin')
        .then((user)=>{this.setState({isLoggedIn:user.data})})
    }
    
    changeHandler(event){
        var formData=this.state.formData;
        formData[event.target.name]= event.target.value;
        this.setState({formData:formData})
    }
    submitHandler(e){
        e.preventDefault();
        axios.post('https://server-secondchancebook.herokuapp.com/api/postlisting',this.state.formData)
        .then((res)=>{
            if(res.data.success){
              return  this.props.history.push('/mainpage');
            }
            this.setState(res.data)
        })
    }
    render() {
        return (
            !this.state.isLoggedIn ? <Redirect to='/' /> :
            <div className="welcome">

           <form onSubmit={this.submitHandler} >
                <div className="form-group">
                    <h3>Please insert information about the book you want to sell</h3>
                    {/* <label htmlFor="title">Book Title</label> */}
                    <br/>
                    <input type="text" onChange={this.changeHandler} className="form-control" id="title" name='title' placeholder="Insert book title"/>
                    {this.state.errors && this.state.errors.title && <p className='text-danger' >{this.state.errors.title.msg}</p> }
                </div>
                <br/>
                <div className="form-group">
                    {/* <label htmlFor="description">Book Description</label> */}
                    <input type="text" onChange={this.changeHandler} className="form-control" name='description' id="description" placeholder="Insert book description"/>
                    {this.state.errors && this.state.errors.description && <p className='text-danger' >{this.state.errors.description.msg}</p> }                    
                </div>
                <br/>
                <div className="form-group">
                    {/* <label htmlFor="Location">Location</label> */}
                    <input type="text" onChange={this.changeHandler} className="form-control" name='location' id="Location" placeholder="Insert your location"/>
                    {this.state.errors && this.state.errors.location && <p className='text-danger' >{this.state.errors.location.msg}</p> }                   
                </div>
                <br/>
                <div className="form-group">
                    {/* <label htmlFor="Price">Price</label> */}
                    <input type="number" onChange={this.changeHandler} className="form-control" id="Price" name='price' placeholder="Insert book price"/>
                    {this.state.errors && this.state.errors.price && <p className='text-danger' >{this.state.errors.price.msg}</p> }                    
                </div>
                <br/>
                <div className="form-group">
                    {/* <label htmlFor="Contact">Contact</label> */}
                    <input type="text" onChange={this.changeHandler} className="form-control" name='contact' id="Contact" placeholder="Your contact"/>
                    {this.state.errors && this.state.errors.contact && <p className='text-danger' >{this.state.errors.contact.msg}</p> }                    
                </div>
                <br/>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
            <br/>
            <Link className='btn btn-warning' to='/mainpage' >Back to book listing </Link>
            </div>
        );
    }
}

export default Postlisting;

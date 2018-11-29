import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';

axios.defaults.withCredentials = true;
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:{
        email:'',
        password:''
      },
      error:null,
      errors:null,
      isloggedIn:false
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  
  submitHandler(e){
    e.preventDefault();
    axios.post("https://server-secondchancebook.herokuapp.com/api/login", this.state.data).then((res)=>{
    console.log(res);
    if (res.data.errors) {
    return  this.setState({errors:res.data.errors})
    }
    if (res.data.error) {
    return  this.setState({error:res.data.message, errors:null})
    }
    return this.setState({isloggedIn:true});
  });
}

  changeHandler(e){
    var formData = this.state.data;
    formData[e.target.name] = e.target.value;
    this.setState({
        data : formData
    })

  }
    
  render() {
      var changeHandler= this.changeHandler;
    return (
      this.state.isloggedIn ? <Redirect to='/mainpage' /> :
      <div className='loginform'>
        <h3>Login</h3>
        {this.state.error && <p className='text-danger' >{this.state.error}</p> }
 
      <form onSubmit={this.submitHandler}>
            <div className="form-group">
            <div className="row-auto">
  
                        <input type="email" value={this.state.data.email} name="email" onChange={changeHandler} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                        {this.state.errors && this.state.errors.email && <p className='text-danger' >{this.state.errors.email.msg}</p>  }
                        </div>
            </div>
            <div className="form-group">
            <div className="row-auto">
                        <input onChange={changeHandler} value={this.state.data.password} name="password" type="password" className="form-control" id="password" placeholder="Password"/>
                        {this.state.errors && this.state.errors.password && <p className='text-danger' >{this.state.errors.password.msg}</p>  }
                        </div>      
            </div>
            <button type="submit" className="btn btn-success">Login</button>
        </form>
      </div>
    )
  }
}

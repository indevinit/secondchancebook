import React, { Component } from 'react'
import axios from 'axios';

axios.defaults.withCredentials= true;
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:{
        firstname:'', 
        lastname:'',
        email:'',
        password:'',
      },
      errors:null
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  
  submitHandler(e){
    e.preventDefault();
    axios.post("https://server-secondchancebook.herokuapp.com/api/register", this.state.data).then((res)=>{
      if(res.data.errors){
        console.log(res.data.errors);
       return this.setState({errors:res.data.errors})
      }
      if(res.data.ok){
        return this.setState({error:"Succesfully registrated", errors:null})
      }
      console.log(res);
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
    return (
      <div className="formstyle">
        {this.state.error &&<p className="btn-danger" >{this.state.error}</p>}
       
          <h3>Register</h3>
          <form onSubmit={this.submitHandler}>
          {/* <div className="form-group">  */}
          <div className="row-auto">
              <input type="text" onChange={this.changeHandler} name='firstname' className="form-control" value={this.state.data.firstname} placeholder="First Name"/>
              {this.state.errors && this.state.errors.firstname && <p className="text-danger"> {this.state.errors.firstname.msg}</p>}
          {/* </div> */}
          </div>
          <br/>
          {/* <div className="form-group">  */}
          <div className="row-auto">
                <input type="text" onChange={this.changeHandler} name='lastname' className="form-control" value={this.state.data.lastname} placeholder="Last Name"/>
              {this.state.errors && this.state.errors.lastname && <p className="text-danger"> {this.state.errors.lastname.msg}</p>}        
          </div>
          {/* </div> */}
          <br/>
          {/* <div className="form-group">  */}
          <div className="row-auto">
            <input type="email" onChange={this.changeHandler} name='email' className="form-control" value={this.state.data.email} placeholder="Email"/>
              {this.state.errors && this.state.errors.email && <p className="text-danger"> {this.state.errors.email.msg}</p>}
          </div>
          {/* </div> */}
          <br/>
          {/* <div className="form-group">  */}
          <div className="row-auto">
              <input type="password" onChange={this.changeHandler} name='password' className="form-control" value={this.state.data.password} placeholder="Password"/>
              {this.state.errors && this.state.errors.password && <p className="text-danger"> {this.state.errors.password.msg}</p>}
          </div>
          {/* </div> */}
      
        <div className="welcome">
        <br/>
        <button type='submit' className="btn btn-success">Register</button>
          </div>
          
      </form>
     
      </div>
    )
  }
}

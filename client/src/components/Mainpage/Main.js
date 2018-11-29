import React, { Component } from 'react';
// import { Link} from 'react-router-dom';
import Listing from './Listing';
import axios from 'axios';
import Nav from './Nav';
import { Redirect } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state={
            user:null,
    
            listings:null,
            isLoggedIn:true            
        }
        axios.get('https://server-secondchancebook.herokuapp.com/api/current_user')
        .then((user)=>{this.setState({user:user.data})})
      
         axios.get('https://server-secondchancebook.herokuapp.com/api/isloggedin')
         .then((user)=>{this.setState({isLoggedIn:user.data})})
        
         this.getPostings = this.getPostings.bind(this);
     this.logoutHandler = this.logoutHandler.bind(this);     
     this.pageRefresh = this.pageRefresh.bind(this);   
     }



    getPostings(){
        axios.get('https://server-secondchancebook.herokuapp.com/api/showlistings')
        .then((listings)=>{
            this.setState({listings:listings.data})
        })
    }
 
    componentDidMount(){
        this.getPostings();
    }
    logoutHandler(){
        axios.get('https://server-secondchancebook.herokuapp.com/api/logout')
        .then((answer)=>{this.setState({isLoggedIn:false})})
      }
      pageRefresh(){
          this.getPostings();
      }
      render() {
        return (
            !(this.state.isLoggedIn) ? <Redirect to='/'/> :
            <div>
 
            <Nav logoutHandler={this.logoutHandler} />
           <div className="welcome">Welcome at Second Chance Book , {this.state.user && this.state.user.firstname} {this.state.user && this.state.user.lastname}</div>
            <div id="idb_publications_widget"><span>See Book Review from top Publications          </span>
            <div id="idb_publications_attribution" apikey="6699351e22e191d204c9839d539f709bf0d54923" style={{marginTop: 0, paddingLeft: 5}}>
              <a href="//idreambooks.com" rel="noopener noreferrer" target="_blank" > 
                <img src="//idreambooks.com/images/embed/idb-logo-name.png" style={{width: 140, height: 30, verticalAlign: '-50%'}} alt="Book Reviews from top publications" title="Book Reviews from top publications" />
              </a> 
            </div>	
  
          </div>

                {this.state.listings && this.state.listings.map((listing)=>{
                    return(
                        
                        <Listing pageRefresh={this.pageRefresh} key={listing._id} listing={listing} />
                    )
                })}
            
 
                </div>
        );
    }
}

export default Main;

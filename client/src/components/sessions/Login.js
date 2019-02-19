import React, { Component } from 'react';
//import fetch from 'isomorphic-fetch';
import './LoginForm.css'
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import axios from 'axios'
import { MDBIcon } from "mdbreact";
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
  super(props)
    this.state = {
      email: "",
      password: "",
    }
  }
handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }


// handleOnSubmit = (event) => {
//     event.preventDefault()
//   let request = {"auth": {"email": this.state.email, "password": this.state.password}}
//     //console.log(request)

// fetch('/api/user_token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(request)
//     })
//     .then(function(rsp){
//       if (!rsp.ok) {
//         throw Error(rsp.statusText);
//         this.setState({auth: true})
//       }
//       return rsp.json()
//       console.log(rsp)
//     })
//     .then((data) => localStorage.setItem("jwt", data.jwt) )
//     .catch(error => {console.log(error)});
//     this.displayError()
//     console.log(this.state.auth)

//   }





displayError = () => {
if (localStorage.getItem("jwt") === null) {
        this.setState({error: true})
      } else if (localStorage.getItem("jwt") !== null) {
        this.setState({error: false})
      }

    }



render(){



    let error = '';
    if (this.state.error) {
      error = 'Sorry, wrong login or/and password'
    }

    return(
      <div className="loginForm">
        <h1> TODOLIST </h1>
        <h2> GET THINGS DONE </h2>



      <form className="form" onSubmit={(e) => this.props.handleLoginSubmit(e, this.state.email, this.state.password)} >

        <br /> <br />
        <input
          name="email"
          id="email"
          placeholder='email'
          type="email"
          value={this.state.email}
          onChange={(event) => this.handleChange(event)}
        />
        <br /> <br />

        <br />
        <input
          name="password"
          id="password"
          placeholder='password'
          type="password"
          value={this.state.password}
          onChange={(event) => this.handleChange(event)}
          />
        <br /><br /><br />
        <input className="submit" type="submit" value="LOGIN" />
          <br />

      </form>
      <p className="r-link"> You don't have any account yet?  <Link to='/register' className="r-link">  Create an account   <MDBIcon icon="long-arrow-alt-right"/></Link> </p>

      </div>

    )
  }
}
export default withRouter(Login);

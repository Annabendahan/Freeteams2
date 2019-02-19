import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import CoursesContainer from './components/CoursesContainer';
import Login from './components/sessions/Login'
import RegisterForm from './components/sessions/RegisterForm'

class App extends Component {
    constructor() {
    super();
    this.state = {
      auth: (localStorage.getItem("jwt")),
      errorLogin: false,
      errorRegister: false

    };
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }



handleRegisterSubmit = (event, email, password, password_confirmation) => {
  event.preventDefault()
  const user = {
    email: email,
    password: password,
    password_confirmation: password_confirmation
  }
  let request = {"auth": {"email": email, "password": password}}
  console.log(request)
  console.log(user)
    axios.post(
    `/api/users`,
    {
      user: user
    })
  .then(response => {
    this.setState({errorRegister: false})
    this.handleLoginSubmit(event, email, password)
  })
  .catch(error =>
    console.log(error),
    this.setState({
          errorRegister: true}))

  // fetch('/api/user_token', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(request)
  //   })
  //   .then(res => res.json() )
  //       .then(res => {
  //         localStorage.setItem("jwt", res.jwt);
  //         this.setState({

  //           auth: localStorage.getItem("jwt"),
  //           error: false
  //         });

  //       }).catch(err=> {
  //         this.setState({error: true})
  //         console.log(err);
  //       })

  }



 handleLogout(e) {
  console.log(this.state.auth)
  localStorage.removeItem("jwt")
  this.setState({auth: localStorage.getItem("jwt")})
  console.log(this.state.auth)
 }


handleLoginSubmit = (event, email, password) => {
    if (event!== undefined) {event.preventDefault()}
  let request = {"auth": {"email": email, "password": password}}
    console.log(request)

fetch('/api/user_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    .then(res => res.json() )
        .then(res => {
          localStorage.setItem("jwt", res.jwt);
          this.setState({

            auth: localStorage.getItem("jwt"),
            errorLogin: false
            //shouldGoToDash: true,
          });

        }).catch(err=> {
          this.setState({
          errorLogin: true})
          console.log(err);
        })
  }


  updateState = () => {
    this.setState({auth: localStorage.getItem("jwt")})
  }


  render() {

console.log(this.state.auth)
console.log(this.state.error)
  let errorLogin = null;
    if (this.state.errorLogin) {
      errorLogin = 'Sorry, invalid email or password'
    }


    let errorRegister = null;
    if (this.state.errorRegister) {
      errorRegister = 'Sorry, an error occured when register'
    }

  let logout = null;
  if(this.state.auth) {
    logout = <button onClick={() => this.handleLogout() } className="logout"> Logout </button>
  }


    return (
      <Router>
      <div className="grey-container">
        <header className="App-header">
        </header>
        {logout}
<div className="error"> {errorLogin}  {errorRegister} </div>
          <Route
            exact path="/"
            render={() => (this.state.auth !== null)
              ? < CoursesContainer />
              : <Redirect to="/login" /> } />




          <Route
            exact path="/register"
            render={() => (this.state.auth !== null )
              ? <Redirect to="/" />
              : <RegisterForm
              handleRegisterSubmit= {this.handleRegisterSubmit} />} />

          <Route
              exact path="/login"
              render={() => (this.state.auth !== null)
              ? <Redirect to="/" />
              : <Login handleLoginSubmit= {this.handleLoginSubmit} /> }  />


      </div>
      </Router>
    );
  }
}

export default App;

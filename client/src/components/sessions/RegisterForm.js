import React, { Component } from 'react';
import axios from 'axios'
import './LoginForm.css'
import { MDBIcon } from "mdbreact";
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';


class RegisterForm extends Component {
  constructor() {
    super();
    this.state={
      email: '',
      password: '',
      password_confirmation: '',
      username: '',
      age: 20,
      description: '',
      websitelink: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }



// handleRegisterSubmit = (e) => {
//   const user = {
//     email: this.state.email,
//     password: this.state.password,
//     password_confirmation: this.state.password_confirmation
//   }
//   console.log(user)
//     axios.post(
//     `/api/users`,
//     {
//       user: user
//     })
//   .then(response => {
//     this.handleOnSubmit()
//     console.log(response)
//   })
//   .catch(error => console.log(error))

// }




  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
        [name]: val,
      });
    }


   handleOnSubmit = () => {

    let request = {"auth": {"email": this.state.email, "password": this.state.password}}
    console.log(request)

fetch('/api/user_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    .then(function(rsp){
      if (!rsp.ok) {
        throw Error(rsp.statusText);
      }
      return rsp.json()
      console.log(rsp)
    })
    .then((data) => localStorage.setItem("jwt", data.jwt))
    .catch(error => {console.log(error)});
  }



    render() {
      return(


        <div className="loginForm">
         <h1> TODOLIST </h1>
        <h2> GET THINGS DONE </h2>
       <form className="form" onSubmit={(event) =>
        this.props.handleRegisterSubmit(
          event,
          this.state)}>

        <br />
        <input
          name="email"
          placeholder="email"
          id="email"
          type="email"
          value={this.state.email}
          onChange={(event) => this.handleChange(event)}
        />
        <br /> <br />
        <br />
        <input
          name="username"
          placeholder="username"
          id="username"
          type="username"
          value={this.state.username}
          onChange={(event) => this.handleChange(event)}
        />
        <br /> <br />
        <input name="age" type='number' placeholder='Age'
            max={110} min={10} onChange={(event) => this.handleChange(event)} value={this.state.age} />
        <br />
        <input
          name="password"
          placeholder="password"
          id="password"
          type="password"
          value={this.state.password}
          onChange={(event) => this.handleChange(event)}
          />
           <br /> <br />
        <br />
        <input
          name="password_confirmation"
          id="password_confirmation"
          placeholder ="password confirmation"
          type="password"
          value={this.state.password_confirmation}
          onChange={(event) => this.handleChange(event)}
          />
        <br /><br /><br /> <br />
        <input
          name="description"
          placeholder="description"
          id="description"
          type="text"
          value={this.state.description}
          onChange={(event) => this.handleChange(event)}
        />
        <br /><br /><br /> <br />
        <input
          name="websitelink"
          placeholder="websitelink"
          id="websitelink"
          type="websitelink"
          value={this.state.websitelink}
          onChange={(event) => this.handleChange(event)}
        />
        <br /> <br />
        <br />
       <input className="submit" type="submit" value="REGISTER" />
          <br />

      </form>
           <p className="r-link"> You already have an account?  <Link to='/login' className="r-link">  Login <MDBIcon icon="long-arrow-alt-right"/>  </Link> </p>
            </div>
      )
    }
  }


export default RegisterForm;


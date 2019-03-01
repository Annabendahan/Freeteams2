import React, { Component } from 'react';
import axios from 'axios';
import { MDBIcon } from "mdbreact";
import {BrowserRouter as  Router, Link, Route, Redirect} from 'react-router-dom';

import './Request.css'



class Request extends Component {
  constructor(props) {
  super(props)
  this.state = {
    team: ''
  }
}



  componentDidMount = () =>{
  let token = "Bearer " + localStorage.getItem("jwt")

    const options = { method: 'GET',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': token },
    url: `/api/teams/${this.props.team_id}`,
     };
    axios(options)
  .then(response => {
    console.log(response)
    this.setState({team: response.data.team})
  })
  .catch(error => console.log(error))
}



  render() {


console.log(this.state.team.title)
console.log(this.state.team.title)

let team =    <Link to= {`/teams/${this.props.team_id}`}> <span>  {this.state.team.title} </span> </Link>


 return(
    <div className="request">
      {this.props.text}
       {this.props.answer}
       {this.props.status}


       <span> for team {team} </span>
    </div>
    )
}
}




export default Request;

import React, { Component } from 'react';
import { MDBIcon } from "mdbreact";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import update from 'immutability-helper';


class Request  extends Component {
  constructor(props) {
  super(props)
  this.state = {
    answer: '',
    status: '',

  }
}



handleInput = (e) => {

  this.setState({[e.target.name]: e.target.value})
}


answerHandler = (e) => {
e.preventDefault();
console.log(this)

  let token = "Bearer " + localStorage.getItem("jwt")
  let decoded = jwt_decode(localStorage.getItem("jwt"))
        const request = {
       answer: this.state.answer,
       status: this.state.status
        };

  axios.put(`/api/teams/${this.props.id}/requests/`,
   { request: request
    }, { headers: {'Authorization': token }}
  )
  .then(response => {
    console.log(response)
    const requests = update(this.state.requests, {
      $splice: [[0, 0, response.data]]
    })
    this.setState({
      requests: requests,
     })

   //this.setState({ requests: response.data})
 })
  .catch(error => console.log(error))
}



updateRequest = (team) => {
  return false;
  const teamIndex = this.state.myTeams.findIndex(x=> x.id === team.id)
  const myTeams = update(this.state.myTeams, {
    [teamIndex]: {$set: team}
  })
  this.setState({myTeams: myTeams, notification: 'All changes saved !', editingCourseId: null})
}

  render() {




  return(
    <div>
    REQUEST:
       {this.props.text}




    </div>
    )
  }
}

export default Request;

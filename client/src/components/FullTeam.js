import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as  Router, Link, Route, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import RequestForm from './RequestForm'
import jwt_decode from 'jwt-decode';
import update from 'immutability-helper';
import './FullTeam.css'


class FullTeam extends Component {
    constructor() {
    super();
    this.state = {
      team: '',
      teamLoaded: false,
      requests: [],
      text: '',
      answer: ' ',
      status: 'Pending',
      notification: ''
     }
   }


   componentDidMount () {
    let token = "Bearer " + localStorage.getItem("jwt")
      axios.get('/api/teams/' + this.props.match.params.id, {
        headers: { 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' ,
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Authorization': token
        }
      })
          .then(response => {
              this.setState({team: response.data.team, teamLoaded: true})
              console.log(response)
          })
          .catch(error => console.log(error))


          axios.get('/api/teams/' + this.props.match.params.id + '/requests' , {
        headers: { 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' ,
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Authorization': token
        }
      })
          .then(response => {
              this.setState({requests: response.data})
              console.log(response)
          })
          .catch(error => console.log(error))

     }


// getRequests = () => {
//   let token = "Bearer " + localStorage.getItem("jwt")

// }



requestHandler = (e) => {
e.preventDefault();

  let token = "Bearer " + localStorage.getItem("jwt")
  let decoded = jwt_decode(localStorage.getItem("jwt"))
        const request = {
       text: this.state.text,
       status: this.state.status,
        user_id: decoded.sub,
        team_id: this.props.match.params.id
        };

  axios.post(`/api/teams/${this.props.match.params.id}/requests/`,
   { request: request
    }, { headers: {'Authorization': token }}
  )
  .then(response => {
    console.log(response)
    const requests = update(this.state.requests, {
      $splice: [[0, 0, response.data]]
    })
    this.setState({
      requests: requests,  notification: 'Thank you for your request!', text: ''
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



answerRequest= (e, data) => {
e.preventDefault();
console.log(data)

  let token = "Bearer " + localStorage.getItem("jwt")
  let decoded = jwt_decode(localStorage.getItem("jwt"))


  axios.put(`/api/teams/${this.props.match.params.id}/requests/`,
   { request: data
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

   this.setState({ notification: 'Thank you for your request!'})
 })
  .catch(error => console.log(error))
}



handleInput = (e) => {

  this.setState({[e.target.name]: e.target.value})
}



render () {
  console.log(this.props)

  let decoded = jwt_decode(localStorage.getItem("jwt"))
  let notification = this.state.notification




  let requests = <div> <input name="text" type='text' placeholder= 'Your request'
            onChange={this.handleInput} value={this.state.text} />
            <button  onClick={(e) => this.requestHandler(e)} className="modif" > OK </button> </div>

  if (decoded.sub === this.state.team.user_id) {

    requests = this.state.requests.map((r) =>{
    return ( <div key={r.id} >
      <RequestForm
        text= {r.text}
        answer={r.answer}
        id={r.id}
        user_id ={r.user_id}
        answerRequest={this.answerRequest}
        />
        </div>
        )
       })
  }







  return(
    <div class="FullTeam">
    {notification}
    <h1> FullTeam </h1>
    <h3> {this.state.team.title} </h3>
    <p> {this.state.team.description} </p>
    <p> {this.state.team.location} </p>
    <p> {this.state.team.capacity} </p>




    <p> {requests} </p>

    </div>
    )


}}


export default withRouter(FullTeam);

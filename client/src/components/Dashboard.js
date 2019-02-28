import React, { Component } from 'react';
import axios from 'axios';
import MyTeam from './MyTeam';
import { MDBIcon } from "mdbreact";
import AddTeamForm from './AddTeamForm';
import {BrowserRouter as  Router, Link, Route, Redirect} from 'react-router-dom';


import jwt_decode from 'jwt-decode';
import update from 'immutability-helper';



class Dashboard extends Component {

  constructor(props) {
  super(props)
  this.state = {
    myTeams: [],
    editingTeamId: null,
    notification: null,
    greetings: false,
    todo: true,
    requests: []

  }
}



 componentDidMount() {

    let token = "Bearer " + localStorage.getItem("jwt")
    const options = { method: 'GET',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': token },
    url: '/api/my_teams',
     };
    axios(options)
  .then(response => {
    console.log(response)
    this.setState({myTeams: response.data})
  })
  .catch(error => console.log(error))
}


addC = () => {

}


addNewTeam = (e, data) => {
 e.preventDefault()
  let token = "Bearer " + localStorage.getItem("jwt")
  let decoded = jwt_decode(localStorage.getItem("jwt"))
        const team = {
       title: '',
        description: '',
        capacity: 0,
        user_id: decoded.sub
        };

  axios.post('/api/teams/',
   { team: team
    }, { headers: {'Authorization': token }}
  )

  .then(response => {
    console.log(response)
    const myTeams = update(this.state.myTeams, {
      $splice: [[0, 0, response.data]]
    })
    this.setState({
      notification: null,
      myTeams: myTeams,
      editingTeamId: response.data.id})
  })
  .catch(error => console.log(error))
}

deleteHandler = (id) => {
  alert("Are you sure you want to delete the team? ")
  let token = "Bearer " + localStorage.getItem("jwt")
  axios.delete(`api/teams/${id}`,  { headers: {'Authorization': token }})
  .then(response => {
    const teamIndex = this.state.myTeams.findIndex(x => x.id === id)
    const myTeams = update(this.state.myTeams, { $splice: [[teamIndex, 1]]})
    this.setState({myTeams: myTeams})
  })
  .catch(error => console.log(error))
}


updateTeam = (team) => {
  return false;
  const teamIndex = this.state.myTeams.findIndex(x=> x.id === team.id)
  const myTeams = update(this.state.myTeams, {
    [teamIndex]: {$set: team}
  })
  this.setState({myTeams: myTeams, notification: 'All changes saved !', editingCourseId: null})
}



enableEditing = (id) => {

  this.setState({ editingTeamId: id})
}





render() {


  let decoded = jwt_decode(localStorage.getItem("jwt"))
  let email = decoded.email
  let username = decoded.username
  let age = decoded.age



  let myTeams = this.state.myTeams.map((t) => {
    if (this.state.editingTeamId === t.id) {
      return(
        <div key={t.id} >
          < AddTeamForm
          team={t}
          key={t.id}
          updateTeam={this.updateTeam}/>
          </div>
          )
    } else {
     return(
        <div key={t.id} >
        <Link to= {`/teams/${t.id}`}> See </Link>
          < MyTeam
          title={t.title} category={t.category} description={t.description}
          capacity ={t.capacity} location={t.location}
          clicked={() => this.enableEditing(t.id)}
          erase={() => this.deleteHandler(t.id)} />
          </div>
          )}
        });

  return (
    <div>
    <h1> Dashboard </h1>


     <button className="newCourseButton" onClick={this.addNewTeam} >
         ADD A TASK <MDBIcon icon="plus"/>
      </button>


      <h2> My Requests </h2>

      <h2> My Teams  </h2>
      {myTeams}

      <h2> Profile </h2>
      <p> {email} </p>
      <p> {username} </p>
      {age} ans



   </div>
    )
  }
}



export default Dashboard;

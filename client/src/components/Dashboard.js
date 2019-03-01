import React, { Component } from 'react';
import axios from 'axios';
import MyTeam from './MyTeam';
import { MDBIcon } from "mdbreact";
import AddTeamForm from './AddTeamForm';
import Request from './Request'
import './Dashboard.css'
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
    requests: [],
    myR: [],
    display: 'myTeams'

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



  const options2 = { method: 'GET',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': token },
    url: '/api/my_requests',
     };
    axios(options2)
  .then(response => {
    console.log(response)
    this.setState({myR: response.data})
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


displayMyRequests = () => {
        this.setState({ display: 'myRequests'})
      }

      displayMyTeams = () => {
        this.setState({ display: 'myTeams'})
      }


      displayMyProfile = () => {
        this.setState({ display: 'myProfile'})
      }



enableEditing = (id) => {

  this.setState({ editingTeamId: id})
}





render() {


  let decoded = jwt_decode(localStorage.getItem("jwt"))
  let email = decoded.email
  let username = decoded.username
  let age = decoded.age
  let description = decoded.description
  let websitelink = decoded.websitelink

  let Profile = <div className= "Profile">
                  <p> {email} </p>
                  <p> {username} </p>
                  <p> {age} </p>
                  <p> {description} </p>
                  <p> {websitelink} </p>
                </div>



let myR = this.state.myR.map((m) => {
  return(
    <div key={m.id}>
    <Request
    text={m.text}
    team_id={m.team_id}
    />
    </div>
    )
})

  let myTeams = this.state.myTeams.map((t) => {
    if (this.state.editingTeamId === t.id) {
      return(
        <div key={t.id} className="team" >
          < AddTeamForm
          team={t}
          key={t.id}
          updateTeam={this.updateTeam}/>
          </div>
          )
    } else {
     return(
        <div key={t.id} className="team" >
          < MyTeam
          title={t.title} category={t.category} description={t.description}
          capacity ={t.capacity} location={t.location}
          clicked={() => this.enableEditing(t.id)}
          erase={() => this.deleteHandler(t.id)} />
           <Link to= {`/teams/${t.id}`}> See </Link>
          </div>
          )}
        });




        let tabs = ''
        let toDisplay = myR
        if (this.state.display === "myRequests") {
      toDisplay = myR
      tabs= <div className= "tabs">
        <span className="tab active" onClick={this.displayMyRequests}> My Requests </span>
        <span className="tab" onClick={this.displayMyTeams}> My Teams </span>
        <span className="tab " onClick={this.displayMyProfile}> My Profile </span>
      </div>
     } else if (this.state.display === "myTeams") {
      toDisplay = myTeams
      tabs = <div className= "tabs">
        <span className="tab " onClick={this.displayMyRequests}> My Requests </span>
        <span className="tab active" onClick={this.displayMyTeams}> My Teams </span>
        <span className="tab " onClick={this.displayMyProfile}> My Profile </span>
      </div>
     } else if (this.state.display === "myProfile") {
      toDisplay = Profile
      tabs = <div className= "tabs">
        <span className="tab " onClick={this.displayMyRequests}> My Requests </span>
        <span className="tab " onClick={this.displayMyTeams}> My Teams </span>
        <span className="tab active" onClick={this.displayMyProfile}> My Profile </span>
        </div>
     }






  return (
    <div>
    <h1> Dashboard </h1>
     <button className="newCourseButton" onClick={this.addNewTeam} >
         CREATE A NEW TEAM <MDBIcon icon="plus"/>
      </button>

      {tabs}
      <div className="toDisplay" > {toDisplay} </div>

   </div>
    )
  }
}



export default Dashboard;

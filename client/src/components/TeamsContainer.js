import React, { Component } from 'react';
import axios from 'axios';
import Team from './Team';
import { MDBIcon } from "mdbreact";
import {BrowserRouter as  Router, Link, Route, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import update from 'immutability-helper';



class TeamsContainer extends Component {

  constructor(props) {
  super(props)
  this.state = {
    teams: [],
    listLoaded: false,
    editingCourseId: null,
    notification: null,
    greetings: false,
    todo: true,
    search: ''

  }
}



 componentDidMount() {

    let token = "Bearer " + localStorage.getItem("jwt")

    const options = { method: 'GET',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': token },
    url: '/api/teams',
     };
    axios(options)
  .then(response => {
    console.log(response)
    this.setState({teams: response.data, listLoaded: true})
  })
  .catch(error => console.log(error))
}


handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
      }




render() {

  let teams = <p> Spinner </p>


  if (this.state.listLoaded === true) {
  if (this.state.search === '') {

  teams = this.state.teams.map((t) => {
     return( <div key={t.id} >

          < Team
          title={t.title} category={t.category} description={t.description}
          location={t.location}
          capacity ={t.capacity}

         /><Link to= {`/teams/${t.id}`}> See </Link>


          </div>)
         });
  } else {

    teams = this.state.teams.map( (t) => {
          if (t.title.toLowerCase().includes(this.state.search.toLowerCase())
              || t.description.toLowerCase().includes(this.state.search.toLowerCase())) {

          return( <div key={t.id} >

          < Team
          title={t.title} category={t.category} description={t.description}
          location={t.location}
          capacity ={t.capacity}
        /><Link to= {`/teams/${t.id}`}> See </Link>

          </div>)
            }

         });
  }
}




  return (
    <div>
    <h1> Teams </h1>
    <MDBIcon icon="search" className="search-i"/>
    <input className="search" name="search" type='text' placeholder= 'Title, Director name...'
            onChange={this.handleInput} value={this.state.search} />
  {teams}
   </div>
    )
  }
}



export default withRouter(TeamsContainer);

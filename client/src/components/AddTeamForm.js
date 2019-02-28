import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import update from 'immutability-helper';


class AddTeamForm extends Component {

     constructor(props) {
    super(props)
    this.state = {
      title: this.props.team.title,
      description: this.props.team.description,
      capacity: this.props.team.capacity,
      location: this.props.team.location
      //shouldGoToDash: false,
    }

}



handleBlur = () => {

  const team = {
    title: this.state.title,
    description: this.state.description,
    location: this.props.team.location,
    capacity: this.state.capacity,



  }
  let token = "Bearer " + localStorage.getItem("jwt")
  console.log(this.props)

  axios.put(
    `/api/teams/${this.props.team.id}`,
    {
      team: team
    }, { headers: {'Authorization': token }})
  .then(response => {
    console.log(response)
    this.props.updateTeam(response.data)
  })
  .catch(error => console.log(error))
}




handleInput = (e) => {

  this.setState({[e.target.name]: e.target.value})
}



render() {
  console.log(this)


      return (
 <form > <button  onClick={(e) => this.handleBlur(e)} className="modif" > OK </button>


        <p>  <input name="capacity" type='number' placeholder='Capacity'
            max={8} min={1} onChange={(e) => this.handleInput(e)} value={this.state.capacity} /> </p>

            <p> <input className='input' type="text"
              name="title" placeholder='Enter a Title'
              value={this.state.title} onChange={(e) => this.handleInput(e)} /> </p>


              <p> <input className='input' type="text"
              name="location" placeholder='Location'
              value={this.state.location} onChange={(e) => this.handleInput(e)} /> </p>


            <p> <textarea className='input' name="description"
              placeholder='Describe your team'
              value={this.state.description} onChange={(e) =>this.handleInput(e)}>
            </textarea></p>



         </form>




      )
    }

}



export default AddTeamForm;

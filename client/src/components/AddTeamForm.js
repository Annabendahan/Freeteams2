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
    location: this.state.location,
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



        <label>
          Quartier:
          <select name= "location" value={this.state.value} onChange={this.handleInput}>
            <option value="Paris 1">Paris 1</option>
            <option value="Paris 2">Paris 2</option>
            <option value="Paris 3">Paris 3</option>
            <option value="Paris 4">Paris 4</option>
            <option value="Paris 5">Paris 5</option>
            <option value="Paris 6">Paris 6</option>
            <option value="Paris 7">Paris 7</option>
            <option value="Paris 8">Paris 8</option>
            <option value="Paris 9">Paris 9</option>
            <option value="Paris 10">Paris 10</option>
            <option value="Paris 11">Paris 11</option>
            <option value="Paris 12">Paris 12</option>
            <option value="Paris 13">Paris 13</option>
            <option value="Paris 14">Paris 14</option>
            <option value="Paris 15">Paris 15</option>
            <option value="Paris 16">Paris 16</option>
            <option value="Paris 17">Paris 17</option>
            <option value="Paris 18">Paris 18</option>
            <option value="Paris 19">Paris 19</option>
            <option value="Paris 20">Paris 20</option>
          </select>
        </label>
        <input type="submit" value="Submit" />



            <p> <textarea className='input' name="description"
              placeholder='Describe your team'
              value={this.state.description} onChange={(e) =>this.handleInput(e)}>
            </textarea></p>



         </form>




      )
    }

}



export default AddTeamForm;

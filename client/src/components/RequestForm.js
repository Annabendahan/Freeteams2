import React, { Component } from 'react';
import { MDBIcon } from "mdbreact";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import update from 'immutability-helper';


class RequestForm  extends Component {
  constructor(props) {
  super(props)
  this.state = {
    answer: '',
    status: '',
    user: ''

  }
}



handleInput = (e) => {

  this.setState({[e.target.name]: e.target.value})
}



getUser = () => {
    let token = "Bearer " + localStorage.getItem("jwt")
      axios.get('/api/users/' + this.props.user_id, {
        headers: { 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' ,
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Authorization': token
        }
      })
          .then(response => {
              this.setState({user: response.data})
              console.log(response)
          })
          .catch(error => console.log(error))

        }



// answerHandler = (e) => {
// e.preventDefault();
// console.log(this)

//   let token = "Bearer " + localStorage.getItem("jwt")
//   let decoded = jwt_decode(localStorage.getItem("jwt"))
//         const request = {
//        answer: this.state.answer,
//        status: this.state.status
//         };

//   axios.put(`/api/teams/${this.props.id}/requests/`,
//    { request: request
//     }, { headers: {'Authorization': token }}
//   )
//   .then(response => {
//     console.log(response)
//     const requests = update(this.state.requests, {
//       $splice: [[0, 0, response.data]]
//     })
//     this.setState({
//       requests: requests,
//      })

//    //this.setState({ requests: response.data})
//  })
//   .catch(error => console.log(error))
// }



updateRequest = (team) => {
  return false;
  const teamIndex = this.state.myTeams.findIndex(x=> x.id === team.id)
  const myTeams = update(this.state.myTeams, {
    [teamIndex]: {$set: team}
  })
  this.setState({myTeams: myTeams, notification: 'All changes saved !', editingCourseId: null})
}

  render() {

console.log(this.props)
console.log(this.state.user.username)

let user = <p> {this.state.user.username} {this.state.user.email} {this.state.user.description} </p>




  return(
    <div>
    REQUEST:
      {this.props.text}
      {this.props.user_id}
       <form onSubmit={(e) => this.props.answerRequest(e, this.state)} >
       <input className="answer" name="answer" type='text' placeholder= 'Your answer'
            onChange={this.handleInput} value={this.state.answer} />
         <input className="answer" name="status" type='text' placeholder= 'Status'
            onChange={this.handleInput} value={this.state.status} />
        <input type="submit"/>

        </form>

        <button onClick={this.getUser} > User </button>
        {user}




    </div>
    )
  }
}

export default RequestForm;

import axios from 'axios';
import React, { Component } from 'react';
import { MDBIcon } from "mdbreact";
import Request from './Request'

class MyFullTeam extends Component {

  constructor(props) {
  super(props)
  this.state = {
    requests: []

  }
}



 componentDidMount() {

    let token = "Bearer " + localStorage.getItem("jwt")

    console.log(this.props.id)

    const options = { method: 'GET',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': token },
    url: `/api/teams/${this.props.id}/requests`,
     };
    axios(options)
  .then(response => {
    console.log(response)
    this.setState({requests: response.data})
  })
  .catch(error => console.log(error))
}


render() {

  let requests = this.state.requests.map((r) => {
    return <Request key={r.id}
            text= {r.text}
            />
  })


  return(
    <div>
      <h1> {this.props.title} </h1>
      <p> {this.props.description} </p>
       <span className="modifyButton" onClick={this.props.clicked}>
      <MDBIcon icon="pen"/>
    </span>

    <span className="deleteButton" onClick={this.props.erase}>
      <MDBIcon icon="times"/>
    </span>
    {requests}

    </div>
    )
}
}

export default MyFullTeam;

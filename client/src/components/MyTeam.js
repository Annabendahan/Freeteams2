import React from 'react'
import { MDBIcon } from "mdbreact";


const MyTeam = (props) => {

  return(
    <div className="team">
      <h3> {props.title} </h3>
      <p> {props.description} </p>
      <p> {props.capacity} </p>
      <p> {props.location} </p>


 <span className="deleteButton" onClick={props.erase}>
      <MDBIcon icon="times"/>
    </span>
    <span className="modifyButton" onClick={props.clicked}>
      <MDBIcon icon="pen"/>
    </span>

    </div>
    )
}

export default MyTeam;


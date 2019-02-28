import React from 'react'
import { MDBIcon } from "mdbreact";
import './Team.css'


const Team = (props) => {

  return(
    <div className="team">
      <h3> {props.title} </h3>
      <p> {props.description} </p>
      <p> {props.capacity} </p>
      <p> {props.location} </p>




    </div>
    )
}

export default Team;

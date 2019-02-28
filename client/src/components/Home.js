import React from 'react'
import { MDBIcon } from "mdbreact";
import {BrowserRouter as  Router, Link, Route, Redirect} from 'react-router-dom';


const Home = (props) => {
  return(
  <div className= 'Home'>
    <h1> HOME </h1>
    <Link to='/teams' className="Home-btn"> ALL TEAMS </Link>
  </div>
    )
}


export default Home;

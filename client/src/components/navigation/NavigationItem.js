import React from 'react';

import { NavLink } from 'react-router-dom'

const NavigationItem = (props) => (
  <p className="item">
    <NavLink
    to={props.link}
   > {props.children} </NavLink >
  </p>
  );


  export default NavigationItem;

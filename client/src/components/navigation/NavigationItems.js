import React from 'react';
import './NavigationItems.css'

import NavigationItem from './NavigationItem'

const NavigationItems = () => (
    <div className="items">
      <NavigationItem link="/" > Home </NavigationItem>
      <NavigationItem link="/teams"> Teams</NavigationItem>
      <NavigationItem link="/dashboard"> Dashboard</NavigationItem>
    </div>
  );


export default NavigationItems;

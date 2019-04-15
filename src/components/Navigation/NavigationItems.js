import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItems/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact> Burder Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>
);


export default navigationItems;
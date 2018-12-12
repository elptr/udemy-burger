import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
    {label: 'salad', type:'salad'},
    {label: 'bacon', type:'bacon'},
    {label: 'cheese', type:'cheese'},
    {label: 'meat', type:'meat'}

];

const buildControls = (props) => (

    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map( (ctrl) => {
            // console.log(props.disabled);
            return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                //type = {ctrl.type}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        })}
    <button disabled={!props.purchaseable} className={classes.OrderButton}>ORDER NOW</button>
    </div>
);


export default buildControls;
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
        {controls.map( (ctrl) => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                type = {ctrl.type}
            />
        ))}

    </div>
);


export default buildControls;
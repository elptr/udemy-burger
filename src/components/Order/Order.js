import React from 'react';
import classes from './Order.css';
// import Burger from '../../Burger/Burger';
// import Button from '../../UI/Button/Button';

const Order = ( props ) => {

    const ingredients =[];
    for (let ingredientName in props.ingredients){

        ingredients.push({
            name:ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return (
            <span style={{
                textTransform: 'capitalize',
                margin: '0 8px',
                border:'1px solid #ccc',
                padding:'5px'
            }}
                key={ig.name}>{ig.name} ({ig.amount})</span>
        )
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}



export default Order;
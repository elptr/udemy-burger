import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map( igKey => {
            return [...Array(props.ingredients[igKey])]
                .map( (_, i) => {
                    console.log(" igKey, _ , i =>  ", igKey,  _, i );
                    return <BurgerIngredient  key={igKey + i} type={igKey}/>;
                })
        });



    console.log(" props.ingredients = ", props.ingredients);
    console.log(" Object.keys(props.ingredients) = ", Object.keys(props.ingredients));
    console.log(" Object.keys(props.ingredients).map( igKey => {return [...Array(props.ingredients[igKey])]} ", Object.keys(props.ingredients).map( igKey => {return [...Array(props.ingredients[igKey])]}));
    console.log(" ", );
    console.log(" ", );
    console.log(" ", );

    return (
        <div className={classes.Burger}>
            <BurgerIngredient  type={"bread-top"}/>
            {transformedIngredients}
            <BurgerIngredient  type={"bread-bottom"}/>
        </div>

    );
};

export default burger;
import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map( igKey => {
            return [...Array(props.ingredients[igKey])]
                .map( (_, i) => {
                    //console.log(" igKey, _ , i =>  ", igKey,  _, i );
                    return <BurgerIngredient  key={igKey + i} type={igKey}/>;
                });
        }).reduce( (accumulator, currentVal) => {
            //console.log(' accumulator, currentVal, accumulator.concat(currentVal => ', accumulator, currentVal, accumulator.concat(currentVal));
            return accumulator.concat(currentVal)
            }, []);


    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }


    return (
        <div className={classes.Burger}>
            <BurgerIngredient  type={"bread-top"}/>
            {transformedIngredients}
            <BurgerIngredient  type={"bread-bottom"}/>
        </div>

    );
};

export default burger;
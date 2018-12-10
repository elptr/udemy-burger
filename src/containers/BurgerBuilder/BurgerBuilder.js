import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

const INGREDIENTS_PRICES = {
    salad:0.6,
    bacon:0.7,
    cheese:0.5,
    meat:1.3
};


class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4
    }

    addIngredients = (props) => {

    }

    removeIngredients = (props) => {

    }




    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls />
            </Aux>

        );
    }

}

export default BurgerBuilder;
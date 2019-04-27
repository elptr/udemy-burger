import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component{
    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients)  {
        const sum = Object.keys(ingredients)
            .map( (igKey) => {
                return ingredients[igKey];
            })
            .reduce( (sum, el) => {return sum + el}, 0);

        return sum > 0;

    }


    purchaseHandler  = () => {
        this.setState({purchasing:true});
    }
    purchaseCanselHandler = () => {
        this.setState({purchasing:false})
    }
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }


    render(){
        const disabledInfo = {...this.props.ings};

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummery = null;

        let burger = this.props.error
            ? <p> Ingredients can't be loaded </p>
            : <Spinner/>
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger
                        ingredients={this.props.ings}
                    />
                    <BuildControls
                        price={this.props.price}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummery =  <OrderSummery
                ingredients={this.props.ings}
                purchaseCanseled={this.purchaseCanselHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            />
        }



        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCanselHandler}
                >
                    {orderSummery}
                </Modal>
                {burger}
            </Aux>

        );
    }

}

const mapStateToProps = state => {
    // mapStateToProps holds the function that receive the state automatically
    // and return js object with what slide of state we r going to use in BurgerBuilder
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    // mapDispatchToProps holds the function that receive the dispatch function as argument
    // and return js object with props function mapping
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
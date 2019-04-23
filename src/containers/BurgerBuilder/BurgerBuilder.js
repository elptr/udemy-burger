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
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component{
    state = {
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount () {
        //remove .json at the end of next line to test what if you can not load ingredients
        // axios.get('https://udemy-burger-d7ae7.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     })
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

        const queryParam = [];

        for(let i in this.state.ingredients){
            queryParam.push( encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) );
        }
       // queryParam = ["bacon=1", "cheese=0", "meat=1", "salad=1"]

        queryParam.push('price=' + this.state.totalPrice);

        const queryString = queryParam.join('&');
        // queryString = bacon=1&cheese=0&meat=1&salad=1

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }


    render(){
        const disabledInfo = {...this.props.ings};

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummery = null;

        let burger = this.state.error
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


        if(this.state.loading){ //overwrite orderSummery if needed
            orderSummery = <Spinner />
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
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    // mapDispatchToProps holds the function that receive the dispatch function as argument
    // and return js object with props function mapping
    return {
        onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad:0.6,
    bacon:0.7,
    cheese:0.5,
    meat:1.3
};


class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        // {
        //     salad:0,
        //     bacon:0,
        //     cheese:0,
        //     meat:0
        // },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount () {
        //remove .json at the end of next line to test what if you can not load ingredients
        axios.get('https://udemy-burger-d7ae7.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true});
            })
    }

    updatePurchaseState (ingredients)  {
        //const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients)
            .map( (igKey) => {
                return ingredients[igKey];
            })
            .reduce( (sum, el) => {return sum + el}, 0)
        this.setState({purchaseable: sum > 0});

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;


        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;


        this.setState( function (prevState, props) {
            return {
                totalPrice: newPrice,
                ingredients: updatedIngredients
            }
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;


        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
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
        const disabledInfo = {...this.state.ingredients};

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummery = null;

        let burger = this.state.error
            ? <p> Ingredients can't be loaded </p>
            : <Spinner/>
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger
                        ingredients={this.state.ingredients}
                    />
                    <BuildControls
                        price={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummery =  <OrderSummery
                ingredients={this.state.ingredients}
                purchaseCanseled={this.purchaseCanselHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
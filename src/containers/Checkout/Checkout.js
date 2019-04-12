import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component{
    state = {
        ingredients:{
            salad: 1,
            meet: 1,
            cheese: 1
        }
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let param of query.entries()){
            // ['salad', '1']
            ingredients[param[0]] = +param[1];
        }
        //console.log(ingredients); //{bacon: 1, cheese: 1, meat: 1, salad: 1}
        this.setState({ingredients: ingredients})
    }
    onCheckoutCanceled = () => {
        console.log('onCheckoutCanceled');
        this.props.history.goBack();
    }

    onCheckoutContinued = () => {
        console.log('onCheckoutContinued');
        this.props.history.replace('/checkout/contact-data')
    }


    render() {

        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCanceled={this.onCheckoutCanceled}
                    onCheckoutContinued={this.onCheckoutContinued}
                />
            </div>
        );
    }

}

export default Checkout;
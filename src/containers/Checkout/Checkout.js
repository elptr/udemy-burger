import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';



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
        this.props.history.goBack();
    }

    onCheckoutContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }


    render() {
        console.log("this.props.match.path >>>> ", this.props.match.path + '/contact-data' );
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCanceled={this.onCheckoutCanceled}
                    onCheckoutContinued={this.onCheckoutContinued}
                />
                <Route
                    path={ this.props.match.path + '/contact-data' }
                    component={ContactData}
                />
            </div>
        );
    }

}

export default Checkout;
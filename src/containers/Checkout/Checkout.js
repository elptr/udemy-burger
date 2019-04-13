import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';



class Checkout extends Component{
    state = {
        ingredients:null,
        totalPrice:0
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()){
            // ['salad', '1']

            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]] = +param[1];
            }


        }
        //console.log(ingredients); //{bacon: 1, cheese: 1, meat: 1, salad: 1}
        this.setState({ ingredients: ingredients, totalPrice: price})
    }
    onCheckoutCanceled = () => {
        this.props.history.goBack();
    }

    onCheckoutContinued = () => {
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
                <Route
                    path={ this.props.match.path + '/contact-data' }
                    render={ (props) => (<ContactData
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        {...props}
                        //one method to have history object in ContactData - pass props
                        // another - wrap ContactData component
                        // withRouter helper method
                    />)}
                />
            </div>
        );
    }

}

export default Checkout;
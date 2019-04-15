import React, { Component } from 'react';
import Order from '../../components/Order/Order';
// import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';



class Orders extends Component{
    state = {

    }

    onCheckoutCanceled = () => {

    }

    onCheckoutContinued = () => {

    }


    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }

}

export default Orders;
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component{
    state={
        name:'',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false
    }
    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading:true});
        //alert('You continue!');
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'Max',
                address:{
                    street:"TestStreet",
                    zipCode:'43434',
                    country:"UK"
                },
                email:'test@test.com'
            },
            deliveryMethod:'fastest'
        }

        axios.post('/orders.json', order) //delete .json to check withErrorHandler
            .then(response =>{
                this.setState({loading:false});
                // console.log(response);
                this.props.history.push('/')
            })
            .catch(error =>{
                this.setState({loading:false});
                console.log(error);
            })
    }
    render() {
        let form = (
            <form>
                <Input inputtype='input' type='text' name='name' placeholder='Your name' />
                <Input inputtype='input' type='email' name='email' placeholder='Your email' />
                <Input inputtype='input' type='text' name='street' placeholder='Street' />
                <Input inputtype='input' type='text' name='postal' placeholder='Postal Code' />
                <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;
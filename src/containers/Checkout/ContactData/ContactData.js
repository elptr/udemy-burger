import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component{
    state={
        orderForm: {
            name: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Your Name'
                },
                value:''
            },
            street: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Street'
                },
                value:''
            },
            zipCode: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:''
            },
            country: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Country'
                },
                value:''
            },
            email: {
                elementType:'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:''
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig: {
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'},
                        ]
                },
                value:''
            },
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading:true});
        //alert('You continue!');
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.price,
            orderData:formData
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

    inputOnChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        let formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        onChange={(event) => this.inputOnChangeHandler(event, formElement.id)}
                    />
                ))}

                <Button btnType='Success'>Order</Button>
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
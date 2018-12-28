import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummery extends Component {
    componentWillUpdate(){
        console.log("order summery update");
    }
    render(){
        const ingredientsSummery = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>:
                        {this.props.ingredients[igKey]}
                    </li>
                );
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients </p>
                <ul>
                    {ingredientsSummery}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCanseled}>CANSEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }

};


export default OrderSummery;
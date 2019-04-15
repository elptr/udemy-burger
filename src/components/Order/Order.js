import React from 'react';
import classes from './Order.css';
// import Burger from '../../Burger/Burger';
// import Button from '../../UI/Button/Button';

const Order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad(1)</p>
            <p>Price: <strong>USD 5.45</strong></p>
            {/*<div style={{width: '100%', margin: 'auto'}}>*/}
                {/*<Burger ingredients={props.ingredients}/>*/}
            {/*</div>*/}
            {/*<Button btnType='Danger' clicked={props.onCheckoutCanceled}>CANCEL</Button>*/}
            {/*<Button btnType='Success' clicked={props.onCheckoutContinued}>CONTINUE</Button>*/}
        </div>
    )
}



export default Order;
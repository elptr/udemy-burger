import React, {Component} from 'react';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

import './App.css';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/" exact component={BurgerBuilder}/> /* put at the end to not to catch it in path*/
                </Switch>
            </Layout>

        );
    }
}

export default App;

import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css';


class App extends Component {
    //added for testing purposes to remove old interceptors
    //before new one is applied
    state = {
        show: true
    }

    //added for testing purposes to remove old interceptors
    //before new one is applied
    componentDidMount() {
        setTimeout( () => {
            this.setState({show: false})
        }, 5000)
    }

    render() {
        return (
            <Layout>
                {/*added for testing purposes to remove old interceptors*/}
                {/*before new one is applied*/}
                {this.state.show ? <BurgerBuilder/> : null}
            </Layout>

        );
    }
    }

export default App;

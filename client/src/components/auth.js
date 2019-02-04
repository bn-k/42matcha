import React, { Component } from "react";
// import {NavLink} from "react-router-dom";
// import App from 'app';
import {BrowserRouter, Route, Switch} from  'react-router-dom';
import Login from './login';

class Auth extends Component {
    constructor (props) {
        super(props);

        this.state = {
            user : undefined
        }

    }

    render () {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }

}

export default Auth;

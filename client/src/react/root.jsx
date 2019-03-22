import React from "react";
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom';
import {Provider} from 'react-redux';

import Login from "./login";
import Home from "./home";
import Register from "./register";
import Error from "./error";
import Navigation from "./navigation";

import PrivateRoute from './modules/private-route';
import PublicRoute from './modules/public-route';
import storeMatcha from '../redux/store/matcha-store';
import ValidEmail from './valid-email'


const Root = () => (
    <Provider store={storeMatcha}>
        <Router>
            <React.Fragment>
                <Navigation/>
                <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <Route path="/401" component={Error}/>
                    <Route path="/valid_email" component={ValidEmail}/>
                    <PublicRoute path="/login" component={Login}/>
                    <PublicRoute path="/register" component={Register}/>
                    <PublicRoute component={Error}/>
                </Switch>
            </React.Fragment>
        </Router>
    </Provider>
);

export default (Root)

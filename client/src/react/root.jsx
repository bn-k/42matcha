import React from "react";
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom';
import {Provider} from 'react-redux';

import Login from "./login";
import Home from "./home";
import User from "./user";
import Register from "./register";
import Error from "./error";
import Error401 from "./401";
import Navigation from "./navigation";

import PrivateRoute from './modules/private-route';
import PublicRoute from './modules/public-route';
import storeMatcha from './store/matcha-store';


const Root = () => (
    <Provider store={storeMatcha}>
        <Router>
            <div>
                <Navigation/>
                <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <Route path="/401" component={Error401}/>
                    <PrivateRoute path="/user" component={User}/>
                    <PublicRoute path="/login" component={Login}/>
                    <PublicRoute path="/register" component={Register}/>
                    <PublicRoute component={Error}/>
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default (Root)

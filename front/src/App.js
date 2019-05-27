import React from "react";
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store/matcha-store';

import PrivateRoute from './react/modules/private-route';
import PublicRoute from './react/modules/public-route';

import Entry from "./react/entry";
import Home from "./react/home";
import User from "./react/user";
import Profile from "./react/profile";
import Login from "./react/login";
import Register from "./react/register";
import Error from "./react/error";
import Navigation from "./react/navigation-protected";
import ValidEmail from './react/valid-email'
import Messenger from './react/messenger'
import Forgot from './react/forgot'
import Matchs from './react/matchs'
import History from './react/history'
import ResetPassword from './react/reset-password'
import Swipe from './react/swipe'

const App = () => (
    <Provider store={store}>
        <Router>
            <React.Fragment>
                <Navigation/>
                <Switch>
                    <Route exact path="/" component={Entry}/>
                    <PrivateRoute path="/home" component={Home}/>
                    <PrivateRoute path="/swipe" component={Swipe}/>
                    <PrivateRoute path="/matchs" component={Matchs}/>
                    <PrivateRoute path="/history" component={History}/>
                    <PrivateRoute path="/user" component={User}/>
                    <PrivateRoute path="/profile" component={Profile}/>
                    <PrivateRoute path="/messenger" component={Messenger}/>
                    <Route path="/401" component={Error}/>
                    <Route path="/valid_email" component={ValidEmail}/>
                    <PublicRoute path="/login" component={Login}/>
                    <PublicRoute path="/register" component={Register}/>
                    <PublicRoute path="/forgot" component={Forgot}/>
                    <PublicRoute path="/reset-password" component={ResetPassword}/>
                    <PublicRoute component={Error}/>
                </Switch>
            </React.Fragment>
        </Router>
    </Provider>
);

export default App

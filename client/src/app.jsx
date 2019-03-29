import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store/matcha-store';
import './public/css/style.css'

import PrivateRoute from './react/modules/private-route';
import PublicRoute from './react/modules/public-route';

import Entry from "./react/entry";
import Home from "./react/home";
import Login from "./react/login";
import Register from "./react/register";
import Error from "./react/error";
import Navigation from "./react/navigation";
import ValidEmail from './react/valid-email'


const App = () => (
    <Provider store={store}>
        <Router>
            <React.Fragment>
                <Navigation/>
                <Switch>
                    <Route exact path="/" component={Entry}/>
                    <PrivateRoute path="/home" component={Home}/>
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

ReactDOM.render(<App />, document.getElementById('app'));

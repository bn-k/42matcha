import React, { Component } from "react";
import {BrowserRouter, Route, Switch} from  'react-router-dom';

import Login from "./login";
import Logout from "./modules/logout";
import Auth from "./auth";
import Home from "./Home";
import User from "./user";
import Register from "./register";
import Error from "./error";
import Navigation from "./navigation";

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Navigation/>
                    <Switch>
                        <Route exact path="/" component={Auth}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/user" component={User}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/register" component={Register}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;


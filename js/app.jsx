import React, { Component } from "react";
import {BrowserRouter, Route, Switch} from  'react-router-dom';

import Home from "home";
import User from "user";
import Register from "register";
import Error from "js/error";
import Navigation from "navigation";

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Navigation/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/user" component={User}/>
                        <Route path="/register" component={Register}/>
                        <Route component={Error}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

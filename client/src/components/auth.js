import React, { Component } from "react";
// import {NavLink} from "react-router-dom";
// import App from 'app';
import {BrowserRouter, Route, Switch} from  'react-router-dom';
import Login from './login';
import { getJwt } from './modules/jwt';
import Home from "./home";

class Auth extends Component {
    constructor (props) {
        super(props);

        this.state = {
            user : undefined
        }

    }

    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/login');
        } else {
            fetch('/auth/getuser', {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer '+ jwt,
                    'Content-Type': 'application/json',
                }),
                // body: 'A=1&B=2',
            })
                .then(results => {
                    return results.json();
                }).then(data => {
                this.setState({user: "success"});
                console.log('user on mount',this.state.user);
                console.log('username: ', data['Username']);
                // localStorage.setItem("uuid", data['token']);
            });
        }
    }

    render () {
        if (this.state.user === undefined) {
            return (
                <div><p>
                    ...Loading
                </p></div>
            )
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default Auth;

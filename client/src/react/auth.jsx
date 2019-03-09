import React, { Component } from "react";
import {withRouter, Redirect} from "react-router-dom";
import storeMatcha from './store/matcha-store';

function auth() {
    console.log(storeMatcha.getState().login.loggedIn);
    return storeMatcha.getState().login.loggedIn
};

const Auth = withRouter(
    () =>
        auth ? (
            <Redirect
                to={{
                    pathname: "/home",
                    message: 'Welcome! ' + storeMatcha.getState().login.token + '!'
                }}
            />
        ) : (
            <Redirect
                to={{
                    pathname: "/login",
                    message: 'Welcome! ' + storeMatcha.getState().login.token + '!'
                }}
            />

        )
);

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
};

import {connect} from "react-redux";
export default connect(mapStateToProps)(Auth)

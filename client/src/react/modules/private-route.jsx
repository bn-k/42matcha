import React, {Component} from 'react';
import {Route, Redirect} from  'react-router-dom';
import storeMatcha from '../store/matcha-store';

function logged () {
    return storeMatcha.getState().login.loggedIn
}

const PrivateRoute= ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            logged() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const mapStateToProps = (state) => {
    return {
        login: state.login,
    };
};

import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
export default withRouter(connect(mapStateToProps,
    null,
    null,
    {
        pure: false
    }
    )(PrivateRoute))

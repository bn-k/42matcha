import React, {Component} from 'react';
import {Route, Redirect} from  'react-router-dom';

function admin() {
    // return storeMatcha.getState().login.loggedIn && storeMatcha.getState().login.data.user.admin;
    return false
}

const AdminRoute= ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            admin() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/401",
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
        users: state.users,
    };
};

import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
export default withRouter(connect(mapStateToProps)(AdminRoute))
import React from 'react';
import {Route, Redirect} from  'react-router-dom';
import store from '../../redux/store/matcha-store';
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";

function logged () {
    return store.getState().login.loggedIn
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

export default withRouter(connect(mapStateToProps)(PrivateRoute))

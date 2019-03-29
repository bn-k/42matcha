import React, {} from 'react';
import {Route, Redirect} from  'react-router-dom';
import store from '../redux/store/matcha-store'

function logged () {
    return store.getState().login.loggedIn
}

const PublicRoute= ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            logged(props) ? (
                <Redirect
                    to={{
                        pathname: "/home",
                        state: { from: props.location }
                    }}
                />
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

export default PublicRoute

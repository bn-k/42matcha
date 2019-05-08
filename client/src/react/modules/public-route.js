import React from 'react';
import {Route, Redirect} from  'react-router-dom';
import store from '../../redux/store/matcha-store'

function logged () {
    return store.getState().login.loggedIn
}

const PublicRoute= ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !logged(props) ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PublicRoute

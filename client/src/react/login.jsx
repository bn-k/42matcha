import React from 'react';
import storeMatcha from "./store/matcha-store";
import LoginForm from './react-form/login-form'

export const Login = withRouter(() => {
        return <LoginForm/>
});

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
};

import {withRouter, Redirect} from "react-router-dom"
import {connect} from "react-redux";
export default withRouter(connect(mapStateToProps)(Login))

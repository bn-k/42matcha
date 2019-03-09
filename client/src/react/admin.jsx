import React, {Component} from 'react'
import User from './admin-user-comp'
import storeMatcha from './store/matcha-store'
import {loadUsers} from "./action/admin-action";
import Grid from './admin-grid'

const Admin = withRouter((props) => {
    return <Grid/>
});

const mapStateToProps = (state) => {
    return {
        login: state.login,
        users: state.users
    };
};

import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
export default withRouter(connect(mapStateToProps)(Admin))

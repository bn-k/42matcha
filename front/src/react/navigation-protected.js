import React from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Navigation from "./navigation";


const Comp = (props) => {
    if (props.login.loggedIn) {
    return (
        <Navigation/>
    )
    } else {
        return null
    }
};

const mapStateToProps = (state) => {
    return {
        login: state.login,
    };
};

export default withRouter(connect(mapStateToProps)(Comp))

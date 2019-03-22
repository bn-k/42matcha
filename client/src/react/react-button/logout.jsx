import React, { Component } from "react";
import {connect} from "react-redux";
import {logoutAction} from '../../redux/action/login-action';


class Logout extends Component {
    constructor (props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    button () {
        return (
            <button className="button" onClick={e => this.submit(e)}>Logout</button>
        )
    }
    submit (e) {
        this.props.logoutAction(this.props.history);
    };
    render () {
        return (
            <React.Fragment>
                {this.button()}
            </React.Fragment>
            )
    }

}

import {withRouter} from "react-router-dom";
export default withRouter(connect(null, {logoutAction})(Logout));

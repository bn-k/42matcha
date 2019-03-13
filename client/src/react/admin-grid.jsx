import React, {Component} from 'react'
import User from './admin-user-comp'
import storeMatcha from './store/matcha-store'
import {loadUsers} from "./action/admin-action";

class Grid extends Component {
    componentDidMount() {
        storeMatcha.dispatch(loadUsers(this.props.login.data.user));
        if (typeof this.props.users[0] != undefined) {
            console.log("CDM =====>", this.props);
        }
    }
    grid() {
        if (typeof this.props.users[0] != undefined) {
            let users = [];
            this.props.users.map((user) => {
                users.push(<User key={user.id} id={user.id} username={user.username} password={user.password}/>)
            });
            return users
        }
    }
    render () {
        return (
            <div>
                {this.grid()}
            </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        users: state.users
    };
};

import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
export default withRouter(connect(mapStateToProps)(Grid))
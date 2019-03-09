import React, {Component} from 'react';

class User extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }
    render() {
        return (
            <div>
                <p>Id: {this.props.id}</p>
            </div>
        );
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
// export default withRouter(connect(mapStateToProps)(User));
export default (User);

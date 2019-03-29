import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.toggleMenu = this.toggleMenu.bind(this)
    }
    toggleMenu (e) {
        e.preventDefault();
        this.setState({toggle: !this.state.toggle});
        this.setState({isActive: (this.state.toggle ? '' : 'is-active')});
    }
    render () {
        if (this.props.login.loggedIn) {
            return (
                <React.Fragment>
                </React.Fragment>
            )
        } else {
            return (null)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
};

export default withRouter(connect(mapStateToProps)(Navigation))

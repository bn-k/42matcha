import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import {
    Button,
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Visibility,
} from 'semantic-ui-react'
import {logoutAction} from "../redux/action/login-action";


class Navigation extends Component {
    logout = () => {
        this.props.dispatch(logoutAction(this.props.history));
    };
    render() {
        if (this.props.login.loggedIn) {
            return (
                <div>
                    <Menu pointing>
                        <Container>
                            <Menu.Item
                                       header
                                       href={'/home'}
                                       active={this.props.location.pathname === '/home'}
                            >
                                <Image size='mini' src='/logo.png' style={{marginRight: '1.5em'}}/>
                                42Matcha
                            </Menu.Item>
                            <Menu.Item
                                href={'/user'}
                                active={this.props.location.pathname === '/user'}
                            >User</Menu.Item>
                            <Menu.Item
                                href={'/messenger'}
                                active={this.props.location.pathname === '/messenger'}
                            >Messenger</Menu.Item>
                            <Menu.Item onClick={this.logout}>Logout</Menu.Item>
                        </Container>
                    </Menu>
                </div>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
};

export default withRouter(connect(mapStateToProps)(Navigation))

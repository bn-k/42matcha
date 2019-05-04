import React, {Component} from "react";
import Notifications from './notifications'
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {HashRouter} from "react-router-dom";
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
    Responsive,
    Visibility, Popup,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {logoutAction} from "../../redux/action/login-action";


const trigger = (img, name) => (
    <span>
    <Image size={"mini"} avatar src={img}/>
  </span>
);

const Nav = (props) => (
    <Menu fluid widths={5} pointing secondary icon={props.icon} size={"huge"}>
        <Menu.Item
            header
            active={props.location.pathname === '/home'}
            onClick={() => props.history.push('/home')}
        >
            {props.buttons.home.name()}
        </Menu.Item>

        <Menu.Item
            header
            active={props.location.pathname === '/messenger'}
            onClick={() => props.history.push('/messenger')}
        >
            <Icon
                disabled={props.location.pathname === '/messenger'}
                name='chat'
            />
            {props.buttons.messenger.name}
        </Menu.Item>

        <Dropdown trigger={trigger(props.app.user.img1, props.app.user.username)} item >
            <Dropdown.Menu>
                <Dropdown.Item
                    active={props.location.pathname === '/user'}
                    onClick={() => props.history.push('/user')}
                >Settings</Dropdown.Item>
                <Dropdown.Item
                    active={props.location.pathname === '/matchs'}
                    onClick={() => props.history.push('/matchs')}
                >Matchs</Dropdown.Item>
                <Dropdown.Item
                    active={props.location.pathname === '/history'}
                    onClick={() => props.history.push('/history')}
                >History</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        <Notifications/>

        <Menu.Item
            header
            onClick={() => props.dispatch(logoutAction(props.history))}
        >
            <Icon name='log out'/>
            {props.buttons.logout.name}
        </Menu.Item>
    </Menu>
);

const mapStateToProps = (state) => {
    return {
        login: state.login,
        app: state.app
    };
};

export default withRouter(connect(mapStateToProps)(Nav))

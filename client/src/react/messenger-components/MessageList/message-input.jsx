import React, { Component } from 'react';
import Message from '../Message/index';
import jwtDecode from 'jwt-decode';
import './MessageList.css';
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {
    Divider,
    Segment,
    Container,
    Header,
    Input,
    Button,
    Dimmer,
    Loader,
    ButtonGroup,
    Form,
    Responsive,
    Grid,
    Card,
    Icon,
    Image,
    Label,
} from 'semantic-ui-react';
import {incrementMessageAction} from "../../../redux/action/messenger-action";


class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: "",
        };
        this.send = this.send.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    keyDown = (e) => {
        if (e.key === 'Enter') {
            this.send(e);
        }
    };
    send = (e) => {
        const token = localStorage.getItem('jwt');
        const msg = {
            id: this.props.messenger.i + 1,
            token: token,
            msg: this.state.new,
            author: this.props.login.id,
            timestamp: new Date().getTime(),
            to: this.props.messenger.suitorId,
        };
        const json = JSON.stringify(msg);
        this.props.messenger.ws.send(json);
        this.props.dispatch(incrementMessageAction(this.props.messenger));
        this.setState({new: ""});
    };
    handleChange = (e, data) => {
        this.setState({[data.name]: data.value});
    };
    render() {
        return(
            <Input
                style={{
                    position:"absolute",
                    bottom: "0px",
                    width: "100%",
                }}
                fluid
                placeholder='Write your message here...'
                type={"text"}
                name={"new"}
                value={this.state.new}
                onChange={this.handleChange}
                onKeyDown={e => this.keyDown(e)}
                autoComplete={'off'}
                label={{
                    icon: "send",
                    onClick: e => this.send(e),
                    position: "right"
                }}
                labelPosition='right'
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.people,
        login: state.login,
        messenger: state.messenger,
    };
};

export default withRouter(connect(mapStateToProps)(MessageInput))
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


class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: "",
        };
        this.send = this.send.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    send = (e, ws) => {
        const token = jwtDecode(localStorage.getItem('jwt'));
        console.log("Send: ", this.state.new);
        this.props.messenger.ws.send(this.state.new)
    };
    handleChange = (e, data) => {
        this.setState({[data.name]: data.value});
    };
    render() {
        return(
            <Input
                fluid
                placeholder='Write your message here...'
                type={"text"}
                name={"new"}
                value={this.state.new}
                onChange={this.handleChange}
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
        messenger: state.messenger,
    };
};

export default withRouter(connect(mapStateToProps)(MessageInput))
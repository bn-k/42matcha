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
import MessageInput from "./message-input";
import {incrementeMessageAction, incrementMessageAction} from "../../../redux/action/messenger-action";


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            new: "",
            i : 0,
        };
    }
    componentDidMount() {
        this.setState({i : this.state.messages.length});
    }
    renderMessages = () => (
        <>
            {this.state.messages.map((msg) => (
                <Message
                    key={msg.id}
                    isMine={msg.author == this.props.login.id}
                    startsSequence={true}
                    endsSequence={false}
                    showTimestamp={true}
                    data={msg}
                />
            ))}
        </>
    );
    componentDidUpdate () {
        this.props.messenger.ws.onmessage = (res) => {
            const json = res.data;
            const msg = JSON.parse(json);
            console.log(msg);
            if (this.props.login.id !== msg.author) {
                this.props.dispatch(incrementMessageAction(this.props.messenger));
            }
            const newMessage = {
                id: msg.id,
                author: msg.author,
                message: msg.msg,
                timestamp: msg.timestamp,
                to: this.props.people.suitorId,
            };
            this.setState(prevState => ({
                messages: [
                    ...prevState.messages,
                    newMessage,
                ]
            }));
        };
    }
    render() {
        return(
            <div className="message-list">
                <Segment className="message-list-container">{this.renderMessages()}</Segment>
                <MessageInput/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.people,
        login : state.login,
        messenger: state.messenger,
    };
};

export default withRouter(connect(mapStateToProps)(MessageList))
import React, { Component } from 'react';
import Message from '../Message';
import './MessageList.css';
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {Segment} from 'semantic-ui-react';
import MessageInput from "./message-input";
import {addMessageAction, incrementMessageAction} from "../../../redux/action/messenger-action";


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: "",
            i : 0,
        };
    }
    componentDidMount() {
        setTimeout(() => this.scrollToBottom(), 900)
    }
    renderMessages = () => (
        <>
            {this.props.messenger.messages.map((msg) => (
                <Message
                    key={msg.id}
                    isMine={msg.author === this.props.login.id}
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
            this.props.dispatch(addMessageAction(this.props.messenger, newMessage))
        };
        this.scrollToBottom();
    }
    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
    }
    render() {
        return(
            <div className="message-list">
                <Segment className="message-list-container">{this.renderMessages()}</Segment>
                <div style={{padding: "14px"}} ref={el => { this.el = el; }} />
                <MessageInput toConvList={this.props.toConvList}/>
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
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


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            new: "",
            i : 0,
        };
        this.send = this.send.bind(this);
    }
    componentDidMount() {
        this.setState({i : this.state.messages.length});
    }
    renderMessages = () => (
        <>
            {this.state.messages.map((msg) => (
                <Message
                    key={msg.id}
                    isMine={true}
                    startsSequence={true}
                    endsSequence={false}
                    showTimestamp={true}
                    data={msg}
                />
            ))}
        </>
    );
    send = (e) => {
        const token = jwtDecode(localStorage.getItem('jwt'));
        console.log("Send: ", this.state.new);
        this.props.messenger.ws.send(this.state.new)
    };
    componentWillUpdate () {
    }
    componentDidUpdate () {
        this.props.messenger.ws.onmessage = (msg) => {
            console.log("On Message: ", msg);
            this.setState({i : this.state.i + 1});
            this.setState(prevState => ({
                messages: [...prevState.messages,
                    {
                        id: this.state.i,
                        author: 'apple',
                        message: msg.data,
                        timestamp: new Date().getTime()
                    }
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
        messenger: state.messenger,
    };
};

export default withRouter(connect(mapStateToProps)(MessageList))
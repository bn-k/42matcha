import React, { Component } from 'react';
import Message from '../Message/index';

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

const url = "ws://localhost:81/api/ws";
const ws = new WebSocket(url);

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    id: 0,
                    author: 'apple',
                    message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
                    timestamp: new Date().getTime()
                },
                {
                    id: 1,
                    author: 'orange',
                    message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
                    timestamp: new Date().getTime()
                },
            ],

            new: "",
            i : 0,
        };
        this.handleChange = this.handleChange.bind(this);
        ws.onmessage = (msg) => {
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
    componentDidMount() {
        this.setState({i : this.state.messages.length})
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

    handleChange = (e, data) => {
        this.setState({[data.name]: data.value});
    };
    send = () => {
        this.setState({i : this.state.i + 1});
        ws.send(this.state.new);
    };
    render() {
        return(
            <div className="message-list">
                <div className="message-list-container">{this.renderMessages()}</div>
                <Container className={'compose'}>
                <Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Write your message here...'
                    type={"text"}
                    name={"new"}
                    value={this.state.new}
                    onChange={this.handleChange}
                />
                <Button onClick={this.send}>Send</Button>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.people,
    };
};

export default withRouter(connect(mapStateToProps)(MessageList))
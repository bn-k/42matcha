import React, { Component } from 'react';
import Compose from '../Compose/index';
import Toolbar from '../Toolbar/index';
import ToolbarButton from '../ToolbarButton/index';
import Message from '../Message/index';
import moment from 'moment';

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
                    id: 1,
                    author: 'apple',
                    message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
                    timestamp: new Date().getTime()
                },
                {
                    id: 2,
                    author: 'orange',
                    message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
                    timestamp: new Date().getTime()
                },
            ],
            new: "",
            i : 0,
        };
        this.handleChange = this.handleChange.bind(this);
        ws.onopen = (e) => {console.log("event: ", e)};
        ws.onmessage = (msg) => {
            console.log("msg received: ", msg);
            this.setState(prevState => {
                return {
                    ...prevState,
                    messages: [
                        {
                            id: 56,
                            author: 'apple',
                            message: "asfsd",
                            timestamp: new Date().getTime()
                        },
                    ]
                };
            });
        };
    }
    componentDidMount() {
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
        ws.send(this.state.new);
    };
    render() {
        return(
            <div className="message-list">
                <div className="message-list-container">{this.renderMessages()}</div>
                <Container >
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
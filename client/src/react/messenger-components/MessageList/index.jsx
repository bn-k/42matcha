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


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            suitor: -1,
            new: "",
            i : 0,
            url: "ws://localhost:81/api/ws/" + localStorage.getItem('jwt') + "/" + "-1",
            ws : null,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.setState({i : this.state.messages.length});
        this.setState({ws : new WebSocket(url)});
        this.state.ws.onmessage = (msg) => {
            this.setState({i : this.state.i + 1});
            console.log("On Message", msg)
            // this.setState(prevState => ({
            //     messages: [...prevState.messages,
            //         {
            //             id: this.state.i,
            //             author: 'apple',
            //             message: msg.data,
            //             timestamp: new Date().getTime()
            //         }
            //     ]
            // }));
        };
    }
    renderMessages = () => {
        this.state.messages.map((msg) => {
            console.log("render messages: ", msg);
        })
    };
    // renderMessages = () => (
    //     <>
    //         {this.state.messages.map((msg) => (
    //             <Message
    //                 key={msg.id}
    //                 isMine={true}
    //                 startsSequence={true}
    //                 endsSequence={false}
    //                 showTimestamp={true}
    //                 data={msg}
    //             />
    //         ))}
    //     </>
    // );

    handleChange = (e, data) => {
        this.setState({[data.name]: data.value});
    };
    send = () => {
        this.setState({i : this.state.i + 1});

        console.log(jwtDecode(localStorage.getItem('jwt')));
        const pack = {
            id: this.state.i,
            author: jwtDecode(localStorage.getItem('jwt').id),
            message: this.state.new,
            timestamp: new Date().getTime()
        };
        this.state.ws.send(pack);
    };
    render() {
        return(
            <div className="message-list">
                <Segment className="message-list-container">{this.renderMessages()}</Segment>
                <Container className={'compose'}>
                    <Input
                        fluid
                        placeholder='Write your message here...'
                        type={"text"}
                        name={"new"}
                        value={this.state.new}
                        onChange={this.handleChange}
                        label={{
                            icon: "send",
                            onClick: this.send(),
                            position: "right"
                        }}
                        labelPosition='right'
                    />
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
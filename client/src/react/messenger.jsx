import React, { Component } from 'react';
import ConversationList from './messenger-components/ConversationList/index';
import MessageList from './messenger-components/MessageList/index';
import '../public/css/Messenger.css';
import withRouter from "react-router/es/withRouter";
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
    Responsive,
    Grid,
    Card,
    Icon,
    Image,
    Label,
} from 'semantic-ui-react';

class Messenger extends Component {
    render() {
        return (
            <div className="messenger">
                <div className="scrollable sidebar">
                    <ConversationList />
                </div>

                <div className="scrollable content">
                    <MessageList />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.people,
    };
};

export default withRouter(connect(mapStateToProps)(Messenger))

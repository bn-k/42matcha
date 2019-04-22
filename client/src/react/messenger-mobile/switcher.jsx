import React, { Component } from 'react';
import ConversationList from './ConversationList/index';
import MessageList from './MessageList/message-list';
import './Messenger.css';
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
import store from "../../redux/store/matcha-store";
import {getMatchsAction} from "../../redux/action/matchs-action";
import {updateSuitorAction} from "../../redux/action/messenger-action";

class Switcher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            convList: true,
        };
        this.toConvList = this.toConvList.bind(this);
        this.toMsgList = this.toMsgList.bind(this);
    }
    toConvList () {
        this.setState({convList: true})
    }
    toMsgList () {
        this.setState({convList: false})
    }
    render() {
        return (
            <div className="messenger-mobile">
                {this.state.convList ?
                    <div className="scrollable sidebar"><ConversationList toMsgList={this.toMsgList}/></div> :
                    <div className="scrollable content"><MessageList toConvList={this.toConvList}/></div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.people,
        login: state.login,
        messenger: state.messenger,
        matchs: state.matchs,
    };
};

export default withRouter(connect(mapStateToProps)(Switcher))

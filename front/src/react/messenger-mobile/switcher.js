import React, { Component } from 'react';
import ConversationList from './ConversationList';
import MessageList from './MessageList/message-list';
import './Messenger.css';
import {withRouter} from "react-router";
import {connect} from "react-redux";

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

import React, { Component } from 'react';
import shave from 'shave';

import './ConversationListItem.css';
import connect from "react-redux/es/connect/connect";
import withRouter from "react-router/es/withRouter";
import {updateSuitorAction} from "../../../redux/action/messenger-action";

class ConversationListItem extends Component {
    constructor(props) {
        super(props);
        this.selectSuitor = this.selectSuitor.bind(this);
    }

    componentDidMount() {
        shave('.conversation-snippet', 20);
    }
    selectSuitor = (e, suitorId) => {
        this.props.dispatch(updateSuitorAction(this.props.messenger,suitorId, this.props.login.id))
    };
    render() {
        const { photo, name, text, id } = this.props.data;

        return (
            <div className="conversation-list-item">
                <img className="conversation-photo" src={photo} alt="conversation" />
                <div className="conversation-info">
                    <h1 className="conversation-title" onClick={e => this.selectSuitor(e, id)}>{ name }</h1>
                    <p className="conversation-snippet">{ text }</p>
                </div>
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

export default withRouter(connect(mapStateToProps)(ConversationListItem))

import React, { Component } from 'react';
import './ConversationList.css';
import './ConversationListItem.css';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {updateSuitorAction} from "../../../redux/action/messenger-action";

class ConversationList extends Component {
    selectSuitor = (e, suitorId) => {
        this.props.dispatch(updateSuitorAction(this.props.messenger, suitorId, this.props.login.id))
    };
    people = () => (
        <>
            {this.props.matchs.map((person) => (
                <div
                    className="conversation-list-item"
                    key={person.NodeIdentity}
                    onClick={e => this.selectSuitor(e, person.NodeIdentity)}
                >
                    <img className="conversation-photo" src={person.Properties.img1} alt="conversation" />
                    <div className="conversation-info">
                        <h1 className="conversation-title">{person.Properties.name}</h1>
                    </div>
                </div>
            ))}
        </>
    );
    render() {
        if (this.props.messenger.suitorId === -1) {
            return null
        } else {
            return (
                <div className="conversation-list">
                    {this.people()}
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        matchs: state.matchs,
        login: state.login,
        messenger: state.messenger,
    };
};

export default withRouter(connect(mapStateToProps)(ConversationList))

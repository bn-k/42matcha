import React, { Component } from 'react';
import ConversationSearch from '../ConversationSearch/index';
import ConversationListItem from '../ConversationListItem/index';
import Toolbar from '../Toolbar/index';
import ToolbarButton from '../ToolbarButton/index';
import axios from 'axios';
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
import './ConversationList.css';
import './ConversationListItem.css';
import withRouter from "react-router/es/withRouter";
import connect from "react-redux/es/connect/connect";
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
                            <p className="conversation-snippet">{ 'Hello world! This is a long message that needs to be truncated.' }</p>
                        </div>
                    </div>
            ))}
        </>
    );
    render() {
        return (
            <div className="conversation-list">
                <Toolbar
                    title="Messenger"
                    leftItems={[
                        <ToolbarButton key="cog" icon="cog" />
                    ]}
                    rightItems={[
                        <ToolbarButton key="add" icon="add circle" />
                    ]}
                />
                <ConversationSearch />
                {this.people()}
            </div>
        );
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

import React, { Component } from 'react';
import ConversationList from './messenger-components/ConversationList/index';
import MessageList from './messenger-components/MessageList/message-list';
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
import store from "../redux/store/matcha-store";
import {getMatchsAction} from "../redux/action/matchs-action";
import {updateSuitorAction} from "../redux/action/messenger-action";
import Switcher from "./messenger-mobile/switcher";

class Messenger extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        store.dispatch(getMatchsAction(this.props.messenger, this.props.login.id));
    }
    componentWillMount() {
        document.body.style.overflow = "hidden";
    }
    componentWillUnmount(){
        document.body.style.overflow = "";
    }
    render() {
        return (
            <div>
                <Responsive {...Responsive.onlyMobile}>
                    <Switcher mobile/>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <div className="messenger">
                        <div className="scrollable sidebar"><ConversationList/></div>
                        <div className="scrollable content"><MessageList/></div>
                    </div>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <div className="messenger">
                        <div className="scrollable sidebar"><ConversationList/></div>
                        <div className="scrollable content"><MessageList/></div>
                    </div>
                </Responsive>
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

export default withRouter(connect(mapStateToProps)(Messenger))

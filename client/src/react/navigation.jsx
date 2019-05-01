import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {HashRouter} from "react-router-dom";
import _ from 'lodash';
import {
    Button,
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Responsive,
    Visibility,
} from 'semantic-ui-react'
import {logoutAction} from "../redux/action/login-action";
import Nav from "./components/navbar";
import {computerButtons, mobileButtons} from "./components/nav-buttons";
import withSizes from 'react-sizes'
import publicIp from 'public-ip';
import {getPeopleAction} from "../redux/action/people-action";
import {getMatchsAction} from "../redux/action/matchs-action";

const sendPosition = (type, pos) => {
    fetch('/api/user/position', {
        headers:{
            'Authorization': localStorage.getItem('jwt'),
        },
        method: 'PUT',
        body: JSON.stringify({type: type, position: pos}),
        credentials: 'same-origin',
    })
};

class Navigation extends Component {
    constructor(props) {
        super(props);
        props.dispatch(getPeopleAction(this.props.people.filters));
        props.dispatch(getMatchsAction(this.props.messenger, this.props.login.id));
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.updatePosition, this.geoDeniedPosition);
        }
    }
    updatePosition(position) {
        sendPosition("gps", {lat: position.coords.latitude, long: position.coords.longitude})
    }
    geoDeniedPosition(err) {
        if (err.code == err.PERMISSION_DENIED) {
            (async () => {
                sendPosition("gps", await publicIp.v4())
            })();
        }
    }
    render() {
        if (this.props.login.loggedIn) {
            return (
                <div>
                    <Responsive {...Responsive.onlyMobile}>
                        <Nav buttons={mobileButtons} name={""} mobile/>
                    </Responsive>
                    <Responsive {...Responsive.onlyTablet}>
                        <Nav buttons={computerButtons} name={this.props.login.username} icon={"labeled"}/>
                    </Responsive>
                    <Responsive {...Responsive.onlyComputer}>
                        <Nav buttons={computerButtons}  name={this.props.login.username} icon={"labeled"}/>
                    </Responsive>
                </div>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        app: state.app,
        people: state.people,
        messenger: state.messenger,
        matchs: state.matchs,
    };
};

export default withRouter(connect(mapStateToProps)(Navigation))

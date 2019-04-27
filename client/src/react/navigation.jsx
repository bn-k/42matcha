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

const sendPosition = (type, pos) => {
    fetch('/api/user/position', {
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem('jwt'),
        },
        method: 'PUT',
        body: JSON.stringify({type: type, position: pos}),
        credentials: 'same-origin',
    })
};

class Navigation extends Component {
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
    logout = () => {
        this.props.dispatch(logoutAction(this.props.history));
    };
    render() {
        if (this.props.login.loggedIn) {
            return (
                <div>
                    <Responsive {...Responsive.onlyMobile}>
                        <Nav buttons={mobileButtons} mobile/>
                    </Responsive>
                    <Responsive {...Responsive.onlyTablet}>
                        <Nav buttons={computerButtons} icon={"labeled"}/>
                    </Responsive>
                    <Responsive {...Responsive.onlyComputer}>
                        <Nav buttons={computerButtons} icon={"labeled"}/>
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
    };
};

export default withRouter(connect(mapStateToProps)(Navigation))

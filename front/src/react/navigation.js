import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {
    Message,
    Responsive,
} from 'semantic-ui-react'
import Nav from "./components/navbar";
import {computerButtons, mobileButtons} from "./components/nav-buttons";
import publicIp from 'public-ip';
import env from "../env";
import {userAction} from "../redux/action/app-action";
const sendPosition = (type, pos) => {
    fetch(env.api + '/user/position', {
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
        if (props.login.loggedIn && props.app.user.username === null) {
            props.dispatch(userAction(props.app));
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.login.loggedIn && this.props.app.user.username === null) {
            this.props.dispatch(userAction(this.props.app));
        }
    }
    componentDidMount() {
        if (navigator.geolocation && this.props.login.loggedIn) {
            navigator.geolocation.getCurrentPosition(this.updatePosition, this.geoDeniedPosition);
        }
    }
    updatePosition = position => {
        sendPosition("gps", {lat: position.coords.latitude, long: position.coords.longitude})
    };
    geoDeniedPosition(err) {
        if (err.code === err.PERMISSION_DENIED) {
            (async () => {
                sendPosition("ip", await publicIp.v4())
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

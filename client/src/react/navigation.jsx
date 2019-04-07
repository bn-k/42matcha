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
import Measure from "react-measure";
import {navbarCss} from "../redux/action/app-action";
import withSizes from 'react-sizes'

@withSizes(({ height}) => ({ height: height }))
class Navigation extends Component {
    logout = () => {
        this.props.dispatch(logoutAction(this.props.history));

    };
    render() {
        if (this.props.login.loggedIn) {
            return (
                <Measure
                    bounds
                    onResize={contentRect => {
                        this.props.dispatch(navbarCss(this.props.app ,contentRect.entry.height, this.props.height));
                    }}
                >
                    {({ measureRef }) => (
                        <div ref={measureRef}>
                            <Responsive {...Responsive.onlyMobile}>
                                <Nav buttons={mobileButtons} mobile/>
                            </Responsive>
                            <Responsive {...Responsive.onlyTablet}>
                                <Nav buttons={mobileButtons} mobile/>
                            </Responsive>
                            <Responsive {...Responsive.onlyComputer}>
                                <Nav buttons={computerButtons} icon={"labeled"}/>
                            </Responsive>
                        </div>
                    )}
                </Measure>
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

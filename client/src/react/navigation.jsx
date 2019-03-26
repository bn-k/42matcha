import React, {Component} from "react";
import {NavLink} from "react-router-dom"
import ButtonLogout from "./react-button/logout";
import storeMatcha from '../redux/store/matcha-store';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive : '',
            toggle : false,
        };
        this.toggleMenu = this.toggleMenu.bind(this)
    }
    toggleMenu (e) {
        e.preventDefault();
        this.setState({toggle: !this.state.toggle});
        this.setState({isActive: (this.state.toggle ? '' : 'is-active')});
    }
    componentWillMount() {
        if (this.props.login.loggedIn) {
        }
    }
    nav () {
        if (this.props.login.loggedIn) {
            return (
                <React.Fragment>
                    <div className={"hero-head"}>
                        <nav className="navbar is-fixed-top is-black" role="navigation" aria-label="main navigation">
                            <div className="navbar-brand">
                                <NavLink className="navbar-item" to="/">
                                    <img src="http://cdn.onlinewebfonts.com/svg/img_296650.png"
                                         alt="Find partenaire(s) for having fun and/or make babies"
                                         height="28"/>
                                </NavLink>

                                <a role="button" className={"navbar-burger burger " + this.state.isActive} aria-label="menu" aria-expanded="false"
                                   data-target="nav-menu" onClick={(e) => this.toggleMenu(e)}>
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                </a>
                            </div>

                            <div id="nav-menu" className={"navbar-menu " + this.state.isActive}>
                                <div className="navbar-start">
                                    <a className="navbar-item" onClick={(e) => this.toggleMenu(e)}>
                                        Chill
                                    </a>
                                </div>

                                <div className="navbar-end">
                                    <div className="navbar-item has-dropdown is-hoverable">
                                        <a className="navbar-link">
                                            {/*{this.props.login.data.user.username}*/}
                                        </a>

                                        <div className="navbar-dropdown">
                                            <a className="navbar-item" onClick={(e) => this.toggleMenu(e)}>
                                                Settings
                                            </a>
                                            <hr className="navbar-divider"/>
                                            <a className="navbar-item" onClick={(e) => this.toggleMenu(e)}>
                                                Contact
                                            </a>
                                        </div>
                                    </div>
                                    <div className="navbar-item">
                                        <div className="buttons">
                                            <ButtonLogout/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </React.Fragment>
            )
        } else {
            return (null)
        }
    }
    render () {
        return (
            this.nav()
        )
    }
}

// Redux dependencies,setting and export

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
};

import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
export default withRouter(connect(mapStateToProps)(Navigation))

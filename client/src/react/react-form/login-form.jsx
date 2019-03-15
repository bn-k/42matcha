import React, {Component} from 'react';
import storeMatcha from '../store/matcha-store';
import {loginAction} from '../action/login-action';

class LoginForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            redirect: false,
            username: "",
            email: "",
            password: "",
        };
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }
    change (e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    submit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        storeMatcha.dispatch(loginAction(formData, this.props.history));
    };
    render () {
        console.log("Render Login Form");
        return (
            <section className="hero">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <form onSubmit={e => this.submit(e)}>
                                <div className="field">
                                    <label className="label">Username</label>
                                    <div className="control">
                                        <input className="input has-icons-left has-icons-right" type="text" name="username" onChange={e => this.change(e)} value={this.state.username}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input className="input" type="password" name="password" onChange={e => this.change(e)} value={this.state.password}/>
                                    </div>
                                </div>
                                <div className="field is-grouped is-centered">
                                    <div className="control">
                                        <button className="button is-link">Submit</button>
                                    </div>
                                    <div className="box">
                                        <p className="is-size-8">Not registered?</p>
                                        <a className="button is-text is-size-8" href={"/register"}>Register</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
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
export default withRouter(connect(mapStateToProps)(LoginForm))

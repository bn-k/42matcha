import React, {Component} from 'react';
import storeMatcha from '../store/matcha-store';
import {registerAction} from '../action/register-action';
import Calendar from 'react-calendar';

class Danger extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <article className={"message is-danger " + (!this.props.message.status ? "": " is-hidden")}>
                <div className="message-body">
                    {this.props.message.message}
                </div>
            </article>
        )
    }
}

class RegisterForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirm: "",
            firstname: "",
            lastname: "",
            admin: false,
            birthday: new Date()
        };
        this.changeDate = this.changeDate.bind(this);
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }
    change (e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    changeDate (date) {
        this.setState({birthday: date});
        console.log(this.state.birthday);
    }
    submit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        storeMatcha.dispatch(registerAction(formData, this.props.history));
    };
    snack () {
        const msgs = this.props.app.register.data.errs;
        let arr = [];
        for (var key in msgs) {
            console.log(key);
            arr.push(<Danger key={key} message={msgs[key]}/>);
        }
        return (arr)
    }
    render () {
        console.log("Render Register Form");
        return (
            <React.Fragment>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="column is-4 is-offset-4">
                                <form onSubmit={e => this.submit(e)}>
                                    <div className="field">
                                        <label className="label">Username</label>
                                        <div className="control">
                                            <input className="input is-bordered" type="text" name="username" placeholder="Choose a username" onChange={e => this.change(e)} value={this.state.username}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control">
                                            <input  className="input" type="text" name="email" placeholder="Your Email" onChange={e => this.change(e)} value={this.state.email}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control">
                                            <input  className="input" type="password" name="password" placeholder="Pick up a password" onChange={e => this.change(e)} value={this.state.password}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Confirm</label>
                                        <div className="control">
                                            <input  className="input" type="password" name="confirm" placeholder="Confirm your password" onChange={e => this.change(e)} value={this.state.confirm}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Firstname</label>
                                        <div className="control">
                                            <input  className="input" type="text" name="firstname" placeholder="Your Firstname" onChange={e => this.change(e)} value={this.state.firstname}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Lastname</label>
                                        <div className="control">
                                            <input  className="input" type="text" name="lastname" placeholder="Your Lastname" onChange={e => this.change(e)} value={this.state.lastname}/>
                                        </div>
                                    </div>
                                    <label className="label">Birthday</label>
                                    <input type="hidden" name="birthday" value={this.state.birthday}/>
                                    <Calendar
                                        className=""
                                        onChange={this.changeDate}
                                        value={this.state.birthday}
                                    />
                                    <br/>
                                    <button className="button is-big is-outlined is-primary">submit</button>
                                    <a className=""  href="/">  Already registered?</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <div id="snackbar" className="snackbar">
                    {this.snack()}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        app: state.app
    };
};

import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {registerData} from "../store/preloaded-state-store";
export default withRouter(connect(mapStateToProps)(RegisterForm))

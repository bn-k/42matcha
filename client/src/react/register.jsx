import React, {Component} from 'react';
import storeMatcha from '../redux/store/matcha-store';
import {registerAction} from '../redux/action/register-action';
import Calendar from 'react-calendar';

class Danger extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <article className={"message is-danger " + (!this.props.status ? "": " is-hidden")}>
                <div className="message-body">
                    {this.props.message}
                </div>
            </article>
        )
    }
}

class Register extends Component {
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
            birthday_iso: "",
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
        const ISO = date.toISOString();
        this.setState({birthday: date});
        this.setState({birthday_iso: ISO});
        console.log(this.state.birthday_iso);
    }
    submit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        storeMatcha.dispatch(registerAction(formData, this.props.history));
    };
    snack () {
        // const errors = this.props.app.register.data.errs;
        const errors = [];
        let arr = [];
        let key = 0;
        // if (this.props.app.register.data.fail) {
        if (1 != 1) {
            errors.forEach((err) => {
                console.log("err: ", err.message);
                arr.push(<Danger key={key} status={false} message={err.message}/>);
                key++;
            });
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
                                    <input type="hidden" name="birthday" value={this.state.birthday_iso}/>
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
export default withRouter(connect(mapStateToProps)(Register))

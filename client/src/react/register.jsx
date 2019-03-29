import React, {Component} from 'react';
import store from '../redux/store/matcha-store';
import {registerAction} from '../redux/action/register-action';
import {days, months, years, genders, interest} from "./modules/options-dates";
import {Message, Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

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
            gender: "",
            interest: "",
            geo: false,
            day: 1,
            month: 1,
            year: 1900,
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange = (e, data) => {
        this.setState({[data.name]: data.value});
    };
    handleToggle = (e, data) => {
        this.setState({[data.name]: data.checked});
    };
    submit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const birthday = new Date(this.state.year + "/" + this.state.month + "/" + this.state.day).toISOString();
        formData.append("username", this.state.username);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        formData.append("confirm", this.state.confirm);
        formData.append("firstname", this.state.firstname);
        formData.append("lastname", this.state.lastname);
        formData.append("gender", this.state.gender);
        formData.append("interest", this.state.interest);
        formData.append("geo", this.state.geo);
        formData.append("birthday", birthday);
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

        store.dispatch(registerAction(formData, this.props.history));
    };
    alertMessage(status, message) {
       if (status) {
           return (
               <Message negative size={"mini"}>
                       {message}
               </Message>
           )
       } else {
           return null;
       }
    }
    render () {
        const reg = this.props.register;
        return (
            <React.Fragment>
                <div className='register-form'>
                    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src='/logo.png' /> Create your account
                            </Header>
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input
                                        fluid
                                        label={"Username"}
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Username'
                                        type={"text"}
                                        name={"username"}
                                        value={this.state.username}
                                        error={!reg.username.status}
                                        onChange={this.handleChange}
                                    />
                                    {this.alertMessage(!reg.username.status, reg.username.message)}
                                    <Form.Input
                                        fluid
                                        label={"Email"}
                                        icon='mail'
                                        iconPosition='left'
                                        placeholder='Email'
                                        name={"email"}
                                        value={this.state.email}
                                        type={"email"}
                                        error={!reg.email.status}
                                        onChange={this.handleChange}
                                    />
                                    {this.alertMessage(!reg.email.status, reg.email.message)}
                                    <Form.Group>
                                        <Form.Input
                                            width={8}
                                            fluid
                                            label={"Password"}
                                            icon='lock'
                                            iconPosition='left'
                                            placeholder='Password'
                                            name={"password"}
                                            value={this.state.password}
                                            type='password'
                                            error={!reg.password.status}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Input
                                            width={8}
                                            fluid
                                            label={"Confirm"}
                                            icon='lock'
                                            iconPosition='left'
                                            placeholder='Password'
                                            name={"confirm"}
                                            value={this.state.confirm}
                                            type='password'
                                            error={!reg.confirm.status}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>
                                    {this.alertMessage(!reg.confirm.status || !reg.password.status,
                                        reg.password.message + reg.confirm.message)}
                                    <Form.Group>
                                        <Form.Input
                                            width={8}
                                            fluid
                                            label={"Firstname"}
                                            icon='user'
                                            iconPosition='left'
                                            type={"text"}
                                            placeholder='Firstname'
                                            name={"firstname"}
                                            value={this.state.firstname}
                                            error={!reg.firstname.status}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Input
                                            width={8}
                                            fluid
                                            label={"Lastname"}
                                            icon='user'
                                            iconPosition='left'
                                            placeholder='Lastname'
                                            name={"lastname"}
                                            value={this.state.lastname}
                                            type={"text"}
                                            error={!reg.lastname.status}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>
                                    {this.alertMessage(!reg.lastname.status || !reg.firstname.status,
                                        reg.lastname.message + reg.firstname.message)}
                                    <Form.Group>
                                        <Form.Select
                                            width={8}
                                            fluid label='Gender'
                                            options={genders}
                                            placeholder='-'
                                            name="gender"
                                            onChange={(e, data) => this.handleChange(e, data)}
                                        />
                                        <Form.Select
                                            width={8}
                                            fluid label='Interest'
                                            options={interest}
                                            placeholder='-'
                                            name="interest"
                                            onChange={(e, data) => this.handleChange(e, data)}
                                        />
                                    </Form.Group>
                                    <Segment size={"mini"} width={6}>
                                        <Form.Checkbox
                                            toggle
                                            label='I accept geolocation'
                                            name="geo"
                                            onChange={(e, data) => this.handleToggle(e, data)}
                                        />
                                    </Segment>
                                    <Form.Group label={"Birthday"}>
                                        <Form.Select
                                            width={5}
                                            fluid label='Day'
                                            options={days}
                                            placeholder='01'
                                            name="day"
                                            onChange={(e, data) => this.handleChange(e, data)}
                                        />
                                        <Form.Select
                                            width={5}
                                            fluid label='Month'
                                            options={months}
                                            placeholder='01'
                                            name="month"
                                            onChange={(e, data) => this.handleChange(e, data)}
                                        />
                                        <Form.Select
                                            width={6}
                                            fluid label='Year'
                                            options={years}
                                            placeholder='1900'
                                            name="year"
                                            onChange={(e, data) => this.handleChange(e, data)}
                                        />
                                    </Form.Group>
                                    <Button
                                        color='teal'
                                        fluid
                                        size='large'
                                        onClick={this.submit}
                                    >Register</Button>
                                </Segment>
                            </Form>
                            <Message>
                                Already registered? <a href='/login'>Sign In</a>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        register: state.register,
    };
};

import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
export default withRouter(connect(mapStateToProps)(Register))

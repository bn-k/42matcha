import React, {Component} from 'react';
import store from '../redux/store/matcha-store';
import {registerAction} from '../redux/action/register-action';
import {Message, Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

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
            geo: false,
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
        formData.append("username", this.state.username);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        formData.append("confirm", this.state.confirm);
        formData.append("firstname", this.state.firstname);
        formData.append("lastname", this.state.lastname);
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
                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.register-form {
      margin-top: 20px;
        height: 80%;
      }
    `}
                </style>
                <div className='register-form'>
                    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='pink' textAlign='center'>
                                <Image src={process.env.PUBLIC_URL + '/logo.png'} /> Create your account
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
                                    <Button
                                        color='pink'
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

export default withRouter(connect(mapStateToProps)(Register))

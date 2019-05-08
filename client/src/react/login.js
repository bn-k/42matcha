import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import store from '../redux/store/matcha-store';
import {loginAction} from '../redux/action/login-action';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class Login extends Component {
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
        const formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);

        store.dispatch(loginAction(formData, this.props.history));
    };
    alertMessage(status, message) {
        if (status) {
            return (
                <Message negative attached={"bottom"}>
                    {message}
                </Message>
            )
        } else {
            return null;
        }
    }
    render () {
        const lgn = this.props.login;
        return (
            <React.Fragment>
                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 80%;
      margin-top: 20px;
      }
    `}
                </style>
                <div className='login-form'>
                    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='pink' textAlign='center'>
                                <Image src={process.env.PUBLIC_URL + '/logo.png'} /> Login
                            </Header>
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input
                                        fluid
                                        label={"Username"}
                                        icon='user'
                                        type={"text"}
                                        iconPosition='left'
                                        placeholder='Username'
                                        name={"username"}
                                        value={this.state.username}
                                        error={lgn.err.status}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Input
                                        fluid
                                        label={"Password"}
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='********'
                                        type={"password"}
                                        name={"password"}
                                        value={this.state.password}
                                        error={lgn.err.status}
                                        onChange={this.handleChange}
                                    />
                                    <Button
                                        color='pink'
                                        fluid
                                        size='large'
                                        onClick={this.submit}
                                    >Login</Button>
                                </Segment>
                            </Form>
                            {this.alertMessage(lgn.err.status, lgn.err.message)}
                            <Message>
                                Not registered? <a href='/register'>Sign Up</a>
                            </Message>
                            <Message>
                                Forgot Password? <a href='/forgot'>Click Here</a>
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
        login: state.login
    };
};

export default withRouter(connect(mapStateToProps)(Login))

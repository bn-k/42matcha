import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {Button, Container, Input, Message, Segment} from 'semantic-ui-react'
import env from "../env";

class Forgot extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: "",
            done: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.message = this.message.bind(this);
    }
    handleChange = (e, data) => {
        this.setState({[data.name]: data.value});
    };
    submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", this.state.username);
        fetch(env.api + '/send_token', {
            method: 'POST',
            body: formData,
        });
        this.setState({done: true});
    };
    message () {
        if (this.state.done) {
            return (
                <>
                    <Container>
                        <Segment>
                            <Message>
                                <p>
                                    An email has been send to change your password.
                                </p>
                            </Message>
                            <Button
                                onClick={e =>this.props.history.push('/')}>Login</Button>
                        </Segment>
                    </Container>
                </>

            )
        }
    }
    render () {
        return (
            <>
                {this.message()}
                <Container>
                    <Segment>
                        <Input
                            fluid
                            icon='user'
                            type={"text"}
                            iconPosition='left'
                            placeholder='Username'
                            name={"username"}
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <Button
                            color='teal'
                            onClick={this.submit}
                        >Change Password</Button>
                    </Segment>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default withRouter(connect(mapStateToProps)(Forgot))

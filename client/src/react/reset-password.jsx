import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import store from "../redux/store/matcha-store";
import {Button, Container, Divider, Grid, Header, Input, Message, Segment} from "semantic-ui-react";
import {getJsonFromUrl} from "./valid-email";
import env from "../env";

const Mess = (props) => (
    <>
        <Message color={props.color}>
            <p>
                {props.text}
            </p>
        </Message>
    </>
);

class ResetPassword extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            done: false,
            error: false,
            reset_token: "",
            password: "",
            confirm: "",
            username:"",
        };
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }
    componentWillMount() {
        let url = getJsonFromUrl(this.props.location.search);
        this.setState({reset_token: url.reset_token});
    }
    save = (e) => {
        let formData = new FormData();
        formData.append('reset-token', this.state.reset_token);
        formData.append('password', this.state.password);
        formData.append('confirm', this.state.confirm);
        formData.append('username', this.state.username);
        fetch(env.api + '/reset_password', {
            method: 'PUT',
            body: formData,
        })
            .then(res => {
                if (res.status == 200) {
                    this.setState({done: true});
                } else {
                    this.setState({error: true});
                }
            });
    };
    handleChange = (e, data) => {
        this.setState({[data.name]: data.value});
    };
    error () {
        if (this.state.error) {
            return (
                <>
                    <Mess color={"red"} text={"Invalid password or token"}/>
                </>
            )
        }
    }
    done() {
        if (this.state.done) {
            return (
                <>
                    <Mess color={"green"} text={"Password has been changed"}/>
                </>
            )
        }
    }
    render () {
        return (
            <Container>
                <Segment>
                    <Grid key={"grid_password"}>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            {this.error()}
                            {this.done()}
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Grid.Row>
                                <Header as={'h4'}>Username</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Input fluid onChange={this.handleChange} name={"username"} value={this.state.username}/>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Grid.Row>
                                <Header as={'h4'}>New Password</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Input fluid key={2} type={'password'} onChange={this.handleChange} name={"password"} value={this.state.password}/>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Grid.Row>
                                <Header as={'h4'}>Confirm Password</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Input fluid key={3} type={'password'} onChange={this.handleChange} name={"confirm"} value={this.state.confirm}/>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Button onClick={this.save} color={"teal"}>Change Password</Button>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        people: state.people,
    };
};

export default withRouter(connect(mapStateToProps)(ResetPassword))

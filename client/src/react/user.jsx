import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {
    Divider,
    Segment,
    Container,
    Header,
    Input,
    Button,
    Dimmer,
    Loader,
    ButtonGroup,
    Responsive,
    Grid,
    Card,
    Icon,
    Image,
    Label,
} from 'semantic-ui-react';
import {disableFieldAction, enableFieldAction, userAction} from "../redux/action/app-action";

const fields = [
    {
        name: "position",
        title: "Position",
        entries: [
        ],
    },
    {
        name: "firstname",
        title: "Firstname",
        entries: [
            {type: (hc, s) => (<Input key={1} onChange={hc} name={"firstname"} value={s}/>)}
        ],
    },
    {
        name: "lastname",
        title: "Lastname",
        entries: [
            {type: (hc, s) => (<Input key={1} onChange={hc} name={"lastname"} value={s}/>)}
        ],
    },
    {
        name: "biography",
        title: "Biography",
        entries: [
            {type: (hc, s) => (<Input key={1} onChange={hc} name={"biography"} value={s}/>)}
        ],
    },
    {
        name: "password",
        title: "Password",
        entries: [
            {type: (hc, s) => (
                <>
                    <Grid>
                        <Grid.Column mobile={16} tablet={5} computer={5}>
                            <Grid.Row>
                                <Header as={'h4'}>Old Password</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Input type={'password'} key={1} onChange={hc} name={"old_password"} value={s}/>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={5} computer={5}>
                            <Grid.Row>
                                <Header as={'h4'}>New Password</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Input type={'password'} key={1} onChange={hc} name={"new_password"} value={s}/>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={5} computer={5}>
                            <Grid.Row>
                                <Header as={'h4'}>Confirm Password</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Input type={'password'} key={1} onChange={hc} name={"confirm"} value={s}/>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                    </>
                )}
        ],
    },
];

const Field = (props) => console.log("props: ", props) || (
    <>
        <Segment>
            <Grid>
                <Grid.Column mobile={8} tablet={10} computer={13}>
                    <Header as={'h3'}>{props.field.title}</Header>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={6} computer={3}>
                    <Button onClick={e => props.modify(e, props.field.name)}>Modify</Button>
                </Grid.Column>
            </Grid>
            <Divider/>
            {props.app.field === props.field.name ?
                <>
                    {props.field.entries.map((entry) => (
                        entry.type(props.handleChange, props.field.state)
                    ))}
                    <Divider/>
                    <Button onClick={e => props.save(e, props.field.name)}>Save</Button>
                </>
                :
                <>
                    <p>{props.app.user[props.field.name]}</p>
                </>
            }
        </Segment>
    </>
);

class User extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            new: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.modify = this.modify.bind(this);
        props.dispatch(userAction(props.app));
    }
    save = (e) => {

    };
    modify = (e, field) => {
        if (this.props.app.field === field) {
            this.props.dispatch(disableFieldAction(this.props.app))
        } else {
            this.props.dispatch(enableFieldAction(this.props.app, field))
        }
    };
    handleChange = (e, data) => {
        console.log("HANDLE CHANGE");
        this.setState({[data.name]: data.value});
        console.log(this.state)
    };
    render () {
        return (
            <Container className={"user"}>
                {fields.map((field) => (
                    <Field
                        {...this.props}
                        key={field.name}
                        handleChange={this.handleChange}
                        save={this.save}
                        modify={this.modify}
                        state={this.state}
                        field={field}
                    />
                ))}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        people: state.people,
        app: state.app,
    };
};

export default withRouter(connect(mapStateToProps)(User))

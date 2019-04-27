import React, {useCallback} from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {
    Divider,
    Segment,
    Container,
    Header,
    Input,
    Button,
    Dropdown,
    Dimmer,
    TextArea,
    Loader,
    ButtonGroup,
    Responsive,
    Form,
    Grid,
    Card,
    Icon,
    Image,
    Label,
} from 'semantic-ui-react';
import {
    addTagAction,
    disableFieldAction,
    enableFieldAction,
    userAction,
    userModifyAction
} from "../redux/action/app-action";

const fields = [
    {
        name: "firstname",
        title: "Firstname",
        view: (props) => (<p>{props.app.user[props.field.name]}</p>),
        entries: [
            {type: (hc, s) => (<Input fluid key={1} onChange={hc} name={"firstname"} value={s}/>)}
        ],
    },
    {
        name: "lastname",
        title: "Lastname",
        view: (props) => (<p>{props.app.user[props.field.name]}</p>),
        entries: [
            {type: (hc, s) => (<Input fluid key={1} onChange={hc} name={"lastname"} value={s}/>)}
        ],
    },
    {
        name: "biography",
        title: "Biography",
        view: (props) => (<p>{props.app.user[props.field.name]}</p>),
        entries: [
            {type: (hc, s) => (
                    <Form key={"form"}>
                        <TextArea key={1} onChange={hc} name={"biography"} value={s} placeholder='Tell us who you are'  style={{ minHeight: 100 }} />
                    </Form>
                )}
        ],
    },
    {
        name: "password",
        title: "Password",
        view: (props) => null,
        entries: [
            {type: (hc, s) => (
                    <Grid key={"grid_password"}>
                        <Grid.Column mobile={16} tablet={6} computer={6}>
                            <Grid.Row>
                                <Header as={'h4'}>Old Password</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Input fluid key={1} type={'password'} key={1} onChange={hc} name={"old_password"} value={s}/>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={5} computer={5}>
                            <Grid.Row>
                                <Header as={'h4'}>New Password</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Input fluid key={2} type={'password'} key={1} onChange={hc} name={"new_password"} value={s}/>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={5} computer={5}>
                            <Grid.Row>
                                <Header as={'h4'}>Confirm Password</Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Input fluid key={3} type={'password'} key={1} onChange={hc} name={"confirm"} value={s}/>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                )}
        ],
    },
    {
        name: "tags",
        title: "Tags",
        view: (props) => (<p>{props.app.user[props.field.name]}</p>),
        entries: [
            {type: (hc, s, props, htc) => (
                    <Grid.Column key={"tags"} mobile={16} tablet={16} computer={8}>
                        <Dropdown
                            placeholder='Tags'
                            fluid
                            search
                            multiple
                            selection
                            options={props.app.tagList}
                            value={props.state.body.tags}
                            name={"tags"}
                            onChange={htc}
                        />
                    </Grid.Column>
                )},
            {type: (hc, s, props) => (
                    <Grid.Column key={"add_tag"} mobile={16} tablet={16} computer={8}>
                        <Input
                            fluid
                            icon='tags'
                            iconPosition='left'
                            label={{
                                tag: true,
                                content: 'Add Tag',
                                onClick: props.addNewTag,
                                color: "teal",
                            }}
                            labelPosition='right'
                            placeholder='Enter tags'
                            value={s}
                            name={"newtag"}
                            onChange={hc}
                        />
                    </Grid.Column>
                )},
        ],
    },
    {
        name: "img1",
        title: "Profile Image",
        view: (props) => (<View {...props}/>),
        entries: [
            {type: (hc, s, props) => (
                    <Grid.Column key={"add_tag"} mobile={16} tablet={16} computer={8}>
                        <UploadImage hfc={props.hfc}/>
                    </Grid.Column>
                )},
        ],
    },
    {
        name: "img2",
        title: "Image 2",
        view: (props) => (<View {...props}/>),
        entries: [
            {type: (hc, s, props) => (
                    <Grid.Column key={"add_tag"} mobile={16} tablet={16} computer={8}>
                        <UploadImage hfc={props.hfc}/>
                    </Grid.Column>
                )},
        ],
    },
    {
        name: "img3",
        title: "Image 3",
        view: (props) => (<View {...props}/>),
        entries: [
            {type: (hc, s, props) => (
                    <Grid.Column key={"add_tag"} mobile={16} tablet={16} computer={8}>
                        <UploadImage hfc={props.hfc}/>
                    </Grid.Column>
                )},
        ],
    },
    {
        name: "img4",
        title: "Image 4",
        view: (props) => (<View {...props}/>),
        entries: [
            {type: (hc, s, props) => (
                    <Grid.Column key={"add_tag"} mobile={16} tablet={16} computer={8}>
                        <UploadImage hfc={props.hfc}/>
                    </Grid.Column>
                )},
        ],
    },
    {
        name: "img5",
        title: "Image 5",
        view: (props) => (<View {...props}/>),
        entries: [
            {type: (hc, s, props) => (
                    <Grid.Column key={"add_tag"} mobile={16} tablet={16} computer={8}>
                        <UploadImage hfc={props.hfc}/>
                    </Grid.Column>
                )},
        ],
    },
];

const View = (props) => (<Image src={props.app.user[props.field.name]} size={"medium"}/>);

const UploadImage = (props) => (
    <>
        <Label
            as="label"
            basic
            htmlFor="upload"
        >
            <Button
                icon="upload"
                label={{
                    basic: true,
                    content: 'Select file(s)'
                }}
                labelPosition="right"
            />
            <input
                hidden
                id="upload"
                multiple
                type="file"
                onChange={props.hfc}
            />
        </Label>
    </>
);
const Field = (props) => (
    <>
        <Segment>
            <Grid>
                <Grid.Column mobile={8} tablet={10} computer={13}>
                    <Header as={'h3'}>{props.field.title}</Header>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={6} computer={3}>
                    <Button fluid onClick={e => props.modify(e, props.field.name)}>Modify</Button>
                </Grid.Column>
            </Grid>
            <Divider/>
            {props.app.field === props.field.name ?
                <>
                    {props.field.entries.map((entry) => (
                        entry.type(props.handleChange, props.field.state, props, props.htc)
                    ))}
                    <Divider/>
                    <Button fluid basic color={"green"} onClick={e => props.save(e, props.field.name)}>Save</Button>
                </>
                :
                <>
                    {props.field.view(props)}
                </>
            }
        </Segment>
    </>
);

const init = {
    name: null,
    body: {tags:[]},
};
class User extends React.Component {
    constructor (props) {
        super(props);
        this.state = init;
        this.handleChange = this.handleChange.bind(this);
        this.addNewTag = this.addNewTag.bind(this);
        this.save = this.save.bind(this);
        this.modify = this.modify.bind(this);
        props.dispatch(userAction(props.app));
    }
    save = (e) => {
        console.log("Statte ======> ", this.state);

        let data = new FormData;
        var reader = new FileReader();
        reader.readAsDataURL(this.state.body.file);
        reader.onload = function (file) {
            console.log(reader.result);
            data.append('file', file.target.result);

            let init = {
                method: "PUT",
                body: data,
            };
            console.log("Init ================>", init);
            fetch('/api/img/asdf', init);
        };
        // this.props.dispatch(userModifyAction(this.props.app, this.state.body, this.state.name));
    };
    modify = (e, field) => {
        this.setState({body:{tags:[]}, name: field});
        if (this.props.app.field === field) {
            this.props.dispatch(disableFieldAction(this.props.app));
        } else {
            this.props.dispatch(enableFieldAction(this.props.app, field));
        }
    };
    handleChange = (e, data) => {
        console.log(this.state);
        this.setState({body: {...this.state.body, [data.name]: data.value}});
    };
    handleFileChange = (e) => {
        this.setState({body: {file: e.target.files[0]}});
    };
    handleTagChange = (e, data) => {
        console.log(this.state);
        this.setState({body: {tags: data.value}});
    };
    addNewTag = () => {
        const val = this.state.body.newtag;
        this.props.dispatch(addTagAction(this.props.app, { key: val, text: "#" + _.startCase(_.toLower(val)), value: val}));
    };
    render () {
        return (
            <Container className={"user"}>
                {fields.map((field) => (
                    <Field
                        {...this.props}
                        key={field.name}
                        handleChange={this.handleChange}
                        hfc={this.handleFileChange}
                        htc={this.handleTagChange}
                        addNewTag={this.addNewTag}
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

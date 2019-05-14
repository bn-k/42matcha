import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {
    Divider,
    Segment,
    Container,
    Header,
    Button,
    Grid,
    Icon,
    Image,
} from 'semantic-ui-react';
import {getAge, timeSince} from "./modules/utils";
import {peopleAction} from "../redux/action/people-action";
import {block, dislike, like} from "../redux/action/types-action";
import env from "../env";

const Online = (props) => (
    <>
        {props.online ? (
            <div style={{display: "inline"}}>
                <p><Icon name={"circle"} color={'teal'}/> Online</p>
            </div>
        ) : (
            <>
                <p>Last seen: {timeSince(props.lastConn)} ago</p>
            </>
        )}
    </>
);

class Profile extends React.Component {
    constructor (props) {
        super(props);
        if (props.app.profileId === -1) {
            props.history.push('/home');
            this.state = {
                loaded: false,
            };
        } else {
            this.state = {
                loaded: true,
                profile : props.people.data[props.app.i].Properties
            };
            fetch(env.api + '/visit/' + props.app.profileId, {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('jwt')
                }
            })
        }
        this.dislike = this.dislike.bind(this);
        this.like = this.like.bind(this);
        this.block= this.block.bind(this);
    }
    componentDidMount() {
        const url = "ws://localhost:8181/api/online/websocket/" + this.props.app.profileId;
        const socket = new WebSocket(url);
        const self = this;
        socket.onopen = () => {
            socket.onmessage = ({data}) => {
                data = JSON.parse(data);
                self.setState({
                    profile: {...self.state.profile, online: data}
                });
            };
        };
        this.setState({socket: socket})
    }
    componentWillUnmount() {
        if(this.state.socket) {
            this.state.socket.close()
        }
    }
    dislike = () => {
        this.props.dispatch(peopleAction(this.props.people, this.props.people.data[this.props.app.i].NodeIdentity, dislike));
        this.setState({profile: {...this.state.profile, relation: "DISLIKE"}})
    };
    like = () => {
        this.props.dispatch(peopleAction(this.props.people, this.props.people.data[this.props.app.i].NodeIdentity, like));
        this.setState({profile: {...this.state.profile, relation: "LIKE"}})
    };
    block = () => {
        this.props.dispatch(peopleAction(this.props.people, this.props.people.data[this.props.app.i].NodeIdentity, block));
        this.setState({profile: {...this.state.profile, relation: "BLOCK"}});
    };
    render () {
        const {profile} = this.state;
        return (
            this.state.loaded ? (
                <Container className={"profile"}>
                    <Grid>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Segment>
                                <Grid>
                                    <Grid.Column style={{padding: "3px"}} mobile={16} tablet={6} computer={6}>
                                        <p>{profile.ilike ? "Vous a déjà liké" : ""}</p>
                                    </Grid.Column>
                                    <Grid.Column  style={{padding: "3px"}} mobile={16} tablet={6} computer={6}>
                                        <Header as={"h3"}>Score {profile.rating}/100</Header>
                                    </Grid.Column>
                                    <Grid.Column  style={{padding: "3px"}} mobile={16} tablet={4} computer={4}>
                                        <Online online={profile.online} lastConn={profile.last_conn}/>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                        <Divider vertical/>
                        <Grid.Column mobile={16} tablet={8} computer={4}>
                            <Image circular size={"medium"} src={profile.img1} />
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Segment>
                                <Grid>
                                    <Grid.Row mobile={16} tablet={16} computer={16}>
                                        <Grid.Column mobile={16} tablet={8} computer={8}>
                                            <Header as={"h2"}>{profile.name}</Header>
                                        </Grid.Column>
                                        <Grid.Column mobile={16} tablet={4} computer={5}>
                                            <Header as={"h3"}>{profile.firstname} {profile.lastname}</Header>
                                        </Grid.Column>
                                        <Grid.Column mobile={16} tablet={4} computer={3}>
                                            <Header as={"h4"}>{getAge(profile.birthday)} years</Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row mobile={16} tablet={16} computer={16}>
                                        <Button.Group fluid>
                                            <Button
                                                disabled={profile.relation === "BLOCK"}
                                                color={"red"}
                                                onClick={this.block}
                                            ><Icon name={"ban"}/></Button>
                                            <Button.Or />
                                            <Button
                                                disabled={profile.relation === "DISLIKE"}
                                                color={"yellow"}
                                                onClick={this.dislike}
                                            ><Icon name={"thumbs down"}/></Button>
                                            <Button.Or />
                                            <Button
                                                disabled={profile.relation === "LIKE"}
                                                color={"green"}
                                                onClick={this.like}
                                            ><Icon name={"heart"}/></Button>
                                        </Button.Group>
                                    </Grid.Row>
                                    <Grid.Row mobile={16} tablet={16} computer={16}>
                                        <Grid.Column mobile={16} tablet={8} computer={8}>
                                            <Header as={"h3"}>{profile.genre}</Header>
                                        </Grid.Column>
                                        <Grid.Column mobile={16} tablet={4} computer={5}>
                                            <Header as={"h3"}>{profile.interest} </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={4}>
                            <p>{profile.biography}</p>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Segment>
                                <Grid>
                                    <Grid.Column mobile={16} tablet={8} computer={4}>
                                        <Image size={"big"} src={profile.img2} />
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={8} computer={4}>
                                        <Image size={"big"} src={profile.img3} />
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={8} computer={4}>
                                        <Image size={"big"} src={profile.img4} />
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={8} computer={4}>
                                        <Image size={"big"} src={profile.img5} />
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                    <Segment>
                        <Button fluid color={"red"} >Signaler le profil</Button>
                    </Segment>
                </Container>
            ):(null)
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        app: state.app,
        people: state.people,
    };
};

export default withRouter(connect(mapStateToProps)(Profile))

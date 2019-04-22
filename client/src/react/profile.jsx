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
import {getAge} from "./modules/utils";

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
        }
    }
    render () {
        const {profile} = this.state;
        console.log(profile);
        return (
            this.state.loaded ? (
                <Container className={"profile"}>
                    <Grid>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Segment>
                            <Grid>
                                <Grid.Column style={{padding: "1px"}} mobile={16} tablet={6} computer={6}>
                                    <p>Vous à déjà liké <Icon name={"heart"}/></p>
                                </Grid.Column>
                                <Grid.Column  style={{padding: "1px"}} mobile={16} tablet={6} computer={6}>
                                    <Header as={"h3"}>Score 67/100</Header>
                                </Grid.Column>
                                <Grid.Column  style={{padding: "1px"}} mobile={16} tablet={4} computer={4}>
                                    <p>Dernière connexion: il y a 3 jours</p>
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
                                                color={"red"}
                                            ><Icon name={"x"}/></Button>
                                            <Button.Or />
                                            <Button
                                                color={"yellow"}
                                            ><Icon name={"thumbs down"}/></Button>
                                            <Button.Or />
                                            <Button
                                                color={"green"}
                                            ><Icon name={"heart"}/></Button>
                                        </Button.Group>
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

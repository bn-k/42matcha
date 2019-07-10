import React, {Component} from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {distance, getAge} from "./modules/utils";
import {
    Segment,
    Container,
    Dimmer,
    Loader,
    Responsive,
    Card,
    Image,
} from 'semantic-ui-react';
import {updateProfileAction} from "../redux/action/app-action";
import {getPeopleAction} from "../redux/action/people-action";

export const IsLoading = (p) => {
    return (
        p.param ?
            <Segment style={{height: "30vh"}}>
                <Dimmer active>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
            </Segment>
            :
            null
    );
};

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        props.dispatch(getPeopleAction(props.people.filters, "false"));
        this.load = this.load.bind(this);
    }
    state = {
        i : 0,
    };
    handleClick (e, id, i) {
        this.props.dispatch(updateProfileAction(this.props.app, id, i));
        this.props.history.push('/profile');
    }
    people = () => (
        <>
            {this.props.people.data.map((person, i) => (
                <Card key={person.NodeIdentity} onClick={e => this.handleClick(e, person.NodeIdentity, i)}>
                    <Image src={person.Properties.img1} size='medium' style={{height: "68%"}}/>
                    <Card.Content>
                        <Card.Header>{person.Properties.username}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{getAge(person.Properties.birthday)}</span>
                            <p>{person.Properties.firstname} {person.Properties.lastname}</p>
                            <p>{Math.round(distance(this.props.app.user.latitude, this.props.app.user.longitude, person.Properties.latitude, person.Properties.longitude, "K"))} km</p>
                            <p>Score: {person.Properties.rating}</p>
                        </Card.Meta>
                    </Card.Content>
                </Card>
            ))}</>
    );
    load () {
        this.props.dispatch(getPeopleAction(this.props.people.filters, "false"))
    }
    render () {
        if (this.props.people.isLoading) {
            return (<IsLoading param={true}/>)
        } else {
            if (this.props.people.done) {
                return (
                    <Container className={"gallery"}>
                        <Responsive as={Segment} {...Responsive.onlyMobile}>
                                <Card.Group itemsPerRow={1}>{this.people()}</Card.Group>
                        </Responsive>
                        <Responsive as={Segment} {...Responsive.onlyTablet}>
                            <Card.Group itemsPerRow={3}>{this.people()}</Card.Group>
                        </Responsive>
                        <Responsive as={Segment} {...Responsive.onlyComputer}>
                            <Card.Group itemsPerRow={4}>{this.people()}</Card.Group>
                        </Responsive>
                    </Container>
                )
            } else {
                return (<p>{this.props.people.err}</p>)
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.people,
        login: state.login,
        app: state.app,
    };
};

export default withRouter(connect(mapStateToProps)(Gallery))

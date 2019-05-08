import React, {Component} from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {getAge} from "./modules/utils";
import {
    Segment,
    Container,
    Responsive,
    Card,
    Image,
} from 'semantic-ui-react';
import {updateProfileAction} from "../redux/action/app-action";
import {getMatchsAction} from "../redux/action/matchs-action";

class Matchs extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        props.dispatch(getMatchsAction(this.props.messenger, this.props.login.id));
    }
    componentDidMount() {
    }
    state = {
        i : 0,
    };
    handleClick (e, id, i) {
        this.props.dispatch(updateProfileAction(this.props.app, id, i));
        this.props.history.push('/profile');
    }
    matchs = () => (
        <>
            {this.props.matchs.map((person, i) => console.log(person) || (
                  <Card key={person.NodeIdentity} onClick={e => this.handleClick(e, person.NodeIdentity, i)}>
                      <Image src={person.Properties.img1} size='big'/>
                      <Card.Content>
                          <Card.Header>{person.Properties.username}</Card.Header>
                          <Card.Meta>
                              <span className='date'>{getAge(person.Properties.birthday).toString()}</span>
                              <p>{person.Properties.firstname} {person.Properties.lastname}</p>
                          </Card.Meta>
                      </Card.Content>
                  </Card>
            ))}</>
    );
    render () {
        return (
            <Container className={"gallery"}>
                <Responsive as={Segment} {...Responsive.onlyMobile}>
                    <Card.Group itemsPerRow={1}>{this.matchs()}</Card.Group>
                </Responsive>
                <Responsive as={Segment} {...Responsive.onlyTablet}>
                    <Card.Group itemsPerRow={3}>{this.matchs()}</Card.Group>
                </Responsive>
                <Responsive as={Segment} {...Responsive.onlyComputer}>
                    <Card.Group itemsPerRow={4}>{this.matchs()}</Card.Group>
                </Responsive>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        matchs: state.matchs,
        app: state.app,
        login : state.login,
        messenger: state.messenger,
    };
};

export default withRouter(connect(mapStateToProps)(Matchs))

import React, {Component} from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {getAge} from "./modules/utils";
import Match from "./match"
import {
    Segment,
    Container,
    Responsive,
    Card,
    Image,
    Header,
} from 'semantic-ui-react';
import {getMatchsAction} from "../redux/action/matchs-action";
import {getPeopleAction} from "../redux/action/people-action";

class Matchs extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            view : false,
            i : 0,
        };
        props.dispatch(getMatchsAction(this.props.messenger, this.props.login.id));
        if (!this.props.people.done) {
            props.dispatch(getPeopleAction(props.people.filters, "false"));
        }
    }
    handleClick (e, i) {
        this.setState({view: !this.state.view, i : i})
    }
    matchs = () => {
        if (this.props.matchs[0].NodeIdentity === -1) {
            return (
                <Header as={"h3"}>Sorry loser, you have no match...</Header>
            )
        } else  {
            if (this.state.view) {
                return (
                    <>
                        <Match suitor={this.props.matchs[this.state.i]} toggle={this.handleClick} />
                    </>
                )
            } else {
                return (
                    <>
                        {this.props.matchs.map((person, i) =>  (
                            <Card key={person.NodeIdentity} onClick={e => this.handleClick(e, i)}>
                                <Image src={person.Properties.img1} size='big'/>
                                <Card.Content>
                                    <Card.Header>{person.Properties.username}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{getAge(person.Properties.birthday).toString()}</span>
                                        <p>{person.Properties.firstname} {person.Properties.lastname}</p>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </>
                )
            }
        }
    };
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
        people: state.people,
        app: state.app,
        login : state.login,
        messenger: state.messenger,
    };
};

export default withRouter(connect(mapStateToProps)(Matchs))

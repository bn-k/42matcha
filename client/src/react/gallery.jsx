import React, {Component} from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {getAge} from "./modules/utils";
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

class Gallery extends Component {
    state = {
        i : 0,
    };
    people = () => (
        <>
            {this.props.people.data.map((person) => (
                  <Card key={person.NodeIdentity}>
                      <Image src={person.Properties.img1} size='big'/>
                      <Card.Content>
                          <Card.Header>{person.Properties.username}</Card.Header>
                          <Card.Meta>
                              <span className='date'>{getAge(person.Properties.birthday)}</span>
                          </Card.Meta>
                          <Card.Description>{person.Properties.biography}</Card.Description>
                      </Card.Content>
                  </Card>
              ))}
              </>
    );
    render () {
        return (

            <Container className={"gallery"}>
                <Dimmer active={this.props.people.isLoading}>
                    <Loader>Loading</Loader>
                </Dimmer>
                <Divider/>
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
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.people,
    };
};

export default withRouter(connect(mapStateToProps)(Gallery))

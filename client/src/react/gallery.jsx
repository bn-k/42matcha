import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import CustomDotGroup from "./components/custom-dot-group";
import "pure-react-carousel/dist/react-carousel.es.css";
import {getAge} from "./modules/utils";
import {
    Divider,
    Segment,
    Container,
    Header,
    Button,
    ButtonGroup,
    Grid,
    Card,
    Icon,
    Image,
} from 'semantic-ui-react';

const User = (properties) => (
    <Card
        image='/images/avatar/large/elliot.jpg'
        header={properties.username}
        meta='Friend'
        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
    />
);


class Gallery extends React.Component {
    state = {
        i : 0,
        group : [],
    };
    user = (props) => (
        <Card size='small'>
            <Image src={props.img1} size='medium'/>
            <Card.Content>
                <Card.Header>{props.username}</Card.Header>
                <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description>{props.biography}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='user' />
                    22 Friends
                </a>
            </Card.Content>
        </Card>
    );
    group = () => {
        const people = this.props.people.data;

        people.forEach((person) => {
            const id = person.NodeIdentity;
            const properties = person.Properties;
            this.state.group.push(this.user(person.Properties))
        });
    };
    render () {
        const id = this.props.people.data[this.state.i].NodeIdentity;
        const properties = this.props.people.data[this.state.i].Properties;
        return (
            <Container className={"gallery"}>
                <Divider/>
                {this.group()}
                <Card.Group>
                {this.state.group}
                </Card.Group>
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

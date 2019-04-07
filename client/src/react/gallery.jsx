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

const User = (username, img1, id) => (
    <Card>
        <Image src={img1}/>
        <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>
                <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user' />
                22 Friends
            </a>
        </Card.Content>
    </Card>
);


class Gallery extends React.Component {
    state = {
        i : 0,
    };
    group = () => {
        let arr = [];
    };
    user = (props) => (
        <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
            <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='user' />
                    22 Friends
                </a>
            </Card.Content>
        </Card>
    )

    render () {
        const id = this.props.people.data[this.state.i].NodeIdentity;
        const properties = this.props.people.data[this.state.i].Properties;
        return (
            <Container className={"gallery"}>
                {this.user(properties)}
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

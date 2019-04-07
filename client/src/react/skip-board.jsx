import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import CustomDotGroup from "./components/custom-dot-group";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
    Divider,
    Segment,
    Container,
    Header,
    Button,
    ButtonGroup,
    Grid,
} from 'semantic-ui-react';

const slide = (img, key) => (
    <Slide tag="a" index={0} key={key}>
        <Image src={img}/>
    </Slide>
);

const img = (props) => {
    let ret = {
        slides : [],
        i : 0,
    };
    if (props.img1 !== '')  {ret.slides.push(slide(props.img1, 1));ret.i++;}
    if (props.img2 !== '')  {ret.slides.push(slide(props.img2, 2));ret.i++;}
    if (props.img3 !== '')  {ret.slides.push(slide(props.img3, 3));ret.i++;}
    if (props.img4 !== '')  {ret.slides.push(slide(props.img4, 4));ret.i++;}
    if (props.img5 !== '')  {ret.slides.push(slide(props.img5, 5));ret.i++;}
    return ret;
};

class SkipBoard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            i : 0,
        };
    }
    like(e) {
        e.preventDefault();
        this.setState({i : this.state.i+1})
    }
    confused(e) {
        e.preventDefault();
        this.setState({i : this.state.i+1})
    }
    dislike (e) {
        e.preventDefault();
        this.setState({i : this.state.i+1})
    }
    render () {
        const id = this.props.people.data[this.state.i].NodeIdentity;
        const properties = this.props.people.data[this.state.i].Properties;
        const images = img(properties);
        const age = getAge(properties.birthday);
        return (
            <Container className={"skip-board"}>
                <Segment>
                    <Grid stackable columns={4}>
                        <Grid.Column style={{border: '5px solid pink'}} columns={2}>
                            <Grid.Column>
                                <Header>{properties.username}</Header>
                            </Grid.Column>
                            <Grid.Column>
                                <p>{age} years</p>
                            </Grid.Column>
                        </Grid.Column>
                        <Grid.Column>
                            <CarouselProvider
                                naturalSlideWidth={1}
                                naturalSlideHeight={1}
                                totalSlides={images.i}
                                className={this.carousel}
                            >
                                <Slider>
                                    {images.slides}
                                </Slider>
                                <CustomDotGroup slides={images.i} />
                            </CarouselProvider>
                        </Grid.Column>
                        <Grid.Column>
                            <ButtonGroup widths='3'>
                                <Button icon={"heart"} color={"red"} onClick={e => this.like(e)}/>
                                <Button.Or/>
                                <Button icon={"question"} color={"yellow"} onClick={e => this.confused(e)}/>
                                <Button.Or/>
                                <Button icon={"delete"} color={"blue"} onClick={e => this.dislike(e)}/>
                            </ButtonGroup>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <Header as={'h3'}>Biography</Header>
                                <p>{properties.biography}</p>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.people,
    };
};

export default withRouter(connect(mapStateToProps)(SkipBoard))

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

const getAge = (iso) =>  {
    const dateold = new Date(iso);
    const datenew = new Date();
    var ynew = datenew.getFullYear();
    var mnew = datenew.getMonth();
    var dnew = datenew.getDate();
    var yold = dateold.getFullYear();
    var mold = dateold.getMonth();
    var dold = dateold.getDate();
    var diff = ynew - yold;
    if(mold > mnew) diff--;
    else
    {
        if(mold == mnew)
        {
            if(dold > dnew) diff--;
        }
    }
    return diff;
};
const slide = (img, key) => (
    <Slide tag="a" index={0} key={key}>
        <Image src={img}/>
    </Slide>
);

const img = (props) => {
    let images = [];
    if (props.img1 !== '')  {images.push(slide(props.img1, 1))}
    if (props.img2 !== '')  {images.push(slide(props.img2, 2))}
    if (props.img3 !== '')  {images.push(slide(props.img3, 3))}
    if (props.img4 !== '')  {images.push(slide(props.img4, 4))}
    if (props.img5 !== '')  {images.push(slide(props.img5, 5))}
    return images
};

const countImg = (props) => {
    return (props.img1 !== '')+(props.img2 !== '')+(props.img3 !== '')+(props.img4 !== '')+(props.img5 !== '')
};

const ImageCarousel = (props) => (
    <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1}
        totalSlides={countImg(props)}
    >
        <Slider>
            {img(props)}
        </Slider>

        <CustomDotGroup slides={countImg(props)} />
        <Divider />
    </CarouselProvider>
);

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
        const age = getAge(properties.birthday);
        return (
            <Container
                className={"skip-board"}
            >
                <Grid>
                    <Segment>
                        <Grid.Row>
                            <Header>{properties.username}</Header>
                            <p>{age} years</p>
                            <ImageCarousel {...properties}/>
                        </Grid.Row>
                        <Grid.Row>
                            <Segment>
                                <p>{properties.biography}</p>
                            </Segment>
                        </Grid.Row>
                        <Grid.Row>
                            <ButtonGroup>
                                <Button icon={"heart"} onClick={e => this.like(e)}/>
                                <Button.Or/>
                                <Button icon={"question"} onClick={e => this.confused(e)}/>
                                <Button.Or/>
                                <Button icon={"delete"} onClick={e => this.dislike(e)}/>
                            </ButtonGroup>
                        </Grid.Row>
                    </Segment>
                </Grid>
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

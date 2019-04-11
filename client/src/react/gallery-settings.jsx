import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import "pure-react-carousel/dist/react-carousel.es.css";
import store from "../redux/store/matcha-store";
import {
    Divider,
    Segment,
    Container,
    Header,
    Button,
    ButtonGroup,
    Responsive,
    Grid,
    Card,
    Icon,
    Image,
} from 'semantic-ui-react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {getPeopleAction} from "../redux/action/people-action";

class GallerySettings extends React.Component {
    constructor(props) {
        super(props);
        this.zut = this.zut.bind(this);
    }

    zut(range) {
        console.log("=======", this.props.people);
        store.dispatch(getPeopleAction(this.props.people.filters));
        console.log(range[0]);
        console.log(range[1]);
    }
    intervalCol(title) {
       return (
           <Grid.Column>
               <Header as={'h4'}>{title}</Header>
               <Range
                   allowCross={false}
                   defaultValue={[0, 100]}
                   onChange={this.zut}
                   step={10}
                   style={{border: 'black'}}
                   trackStyle={[{ backgroundColor: 'black'}, { backgroundColor: 'black'}]}
                   handleStyle={[{ backgroundColor: 'white' , borderColor: 'red' }, { backgroundColor: 'white' , borderColor: 'red' }]}
                   railStyle={{ backgroundColor: 'gray'}}
               />
           </Grid.Column>
       )
    }
    render () {
        return (
            <Segment>
            <Grid columns={3}>
                {this.intervalCol("Age")}
                {this.intervalCol("Score")}
            </Grid>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.people,
    };
};

export default withRouter(connect(mapStateToProps)(GallerySettings))

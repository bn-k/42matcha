import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import store from "../redux/store/matcha-store";
import {getPeopleAction} from "../redux/action/people-action";
import { Container, Sticky} from "semantic-ui-react";
import Gallery from "./gallery";
import GallerySettings from "./gallery-settings";

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    render () {
        return (
            <Container>
            <GallerySettings/>
            <Gallery/>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default withRouter(connect(mapStateToProps)(Home))

import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import { Container} from "semantic-ui-react";
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

export default withRouter(connect()(Home))

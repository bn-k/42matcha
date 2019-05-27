import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {Container} from "semantic-ui-react";
import Gallery from "./gallery";
import GallerySettings from "./gallery-settings";
import Swipe from "./swipe";


class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            toggle: false,
        };
        this.toggle = this.toggle.bind(this)
    }
    toggle = () => {
        this.setState({toggle: !this.state.toggle})
    };
    render () {
        if (!this.state.toggle) {
            return (
                <Container>
                    <Swipe toggle={this.toggle}/>
                </Container>
            )
        } else {
            return (
                <Container>
                    <GallerySettings toggle={this.toggle}/>
                    <Gallery/>
                </Container>
            )
        }
    }
}

export default withRouter(connect()(Home))

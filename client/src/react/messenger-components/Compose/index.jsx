import React, { Component } from 'react';
import './Compose.css';
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
import withRouter from "react-router/es/withRouter";
import connect from "react-redux/es/connect/connect";
import ToolbarButton from "../ToolbarButton";

class Compose extends Component {
    render() {
        return (
            <div className="compose">
                <input
                    type="text"
                    className="compose-input"
                    placeholder="Type a message, @name"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        people: state.people,
    };
};

export default withRouter(connect(mapStateToProps)(Compose))

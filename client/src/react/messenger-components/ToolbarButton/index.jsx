import React, { Component } from 'react';
import './ToolbarButton.css';
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


export default class ToolbarButton extends Component {
  render() {
    const { icon } = this.props;
    return (
        <Icon className="toolbar-button" name={icon}/>
    );
  }
}
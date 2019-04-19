 import React from "react";
// import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import store from "../redux/store/matcha-store";
import {Container, Responsive, Menu, Segment, Divider, Image } from "semantic-ui-react";
import Nav from "./components/navbar";
import {computerButtons, mobileButtons} from "./components/nav-buttons";

class Comp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }

    // export default class MenuExampleSecondaryPointing extends Component {
    // state = { activeItem: 'home' }
    //
    // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render () {
        return (
            <Container className={"user"}>
                <p>User stuff here</p>
            </Container>
        )
        // if (this.props.login.loggedIn) {
        //     return (
        //         <div>
        //             <Menu pointing secondary>
        //                 <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        //                 <Menu.Item
        //                     name='messages'
        //                     active={activeItem === 'messages'}
        //                     onClick={this.handleItemClick}
        //                 />
        //                 <Menu.Item
        //                     name='friends'
        //                     active={activeItem === 'friends'}
        //                     onClick={this.handleItemClick}
        //                 />
        //                 <Menu.Menu position='right'>
        //                     <Menu.Item
        //                         name='logout'
        //                         active={activeItem === 'logout'}
        //                         onClick={this.handleItemClick}
        //                     />
        //                 </Menu.Menu>
        //             </Menu>
        //             <div>
        //                 <Divider hidden />
        //                 <Image.Group size='small'>
        //                     <Image src="https://picsum.photos/200/300" />
        //                     <Image src="https://picsum.photos/200/300" />
        //                     <Image src="https://picsum.photos/200/300" />
        //                     <Image src="https://picsum.photos/200/300" />
        //                 </Image.Group>
        //             </div>
        //
        //             <Segment>
        //                 <img src="https://picsum.photos/200/300" />
        //             </Segment>
        //         </div>
        //     )
        // } else {
        //     return (

        }

}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        people: state.people,
    };
};

export default withRouter(connect(mapStateToProps)(Comp))

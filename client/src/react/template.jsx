import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import store from "../redux/store/matcha-store";
import { Container} from "semantic-ui-react";

class Comp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }
    render () {
        return (
            <Container>
                <p>Nothing yet</p>
            </Container>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        people: state.people,
    };
};

export default withRouter(connect(mapStateToProps)(Comp))

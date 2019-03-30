import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import storeMatcha from "../redux/store/matcha-store";
import {getPeopleAction} from "../redux/action/people-action";
import SkipBoard from './skip-board';
import { Container} from "semantic-ui-react";

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        storeMatcha.dispatch(getPeopleAction());
    }
    render () {
        return (
            <Container className={"home"}>
                <SkipBoard/>
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

export default withRouter(connect(mapStateToProps)(Home))

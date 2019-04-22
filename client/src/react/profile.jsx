import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import { Container} from "semantic-ui-react";
import Grid from "semantic-ui-react/src/collections/Grid";

class Profile extends React.Component {
    constructor (props) {
        super(props);
        if (props.app.profileId === -1) {
            props.history.push('/home');
            this.state = {
                loaded: false,
            };
        } else {
            this.state = {
                loaded: true,
                profile : props.people.data[props.app.i].Properties
            };
        }
    }
    render () {
        const profile = this.state.profile;
        return (
            this.state.loaded ? (
            <Container className={"profile"}>
                <Grid>
                    <Grid>

                    </Grid>

                </Grid>
            </Container>
            ):(null)
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        app: state.app,
        people: state.people,
    };
};

export default withRouter(connect(mapStateToProps)(Profile))

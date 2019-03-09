import React from "react";

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            next: [],
        };
    }
    componentDidMount(){
        this.next()
    }
    next () {
        fetch('/api/next')
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({next: data});
        });
    }
    love () {
        this.next();
    }
    fuck () {
        this.next();
    }
    render () {
        return (
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <h3>{this.state.next['name']}</h3>
                            <img alt="rien" src="https://source.unsplash.com/user/erondu/300x450"/>
                            <br/>
                            <button onClick={() => this.next()}>love</button>
                            <button onClick={() => this.next()}>f***</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
};

import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
export default withRouter(connect(mapStateToProps)(Home))

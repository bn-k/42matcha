import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

export function getJsonFromUrl(url) {
    if(!url) url = window.location.search;
    let query = url.substr(1);
    let result = {};
    query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

class ValidEmail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            message : "",
            class : "",
        };
    }
    componentWillMount() {
        let url = getJsonFromUrl(this.props.location.search);
        fetch('/auth/valid_email/' + url.token)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({message: "Email successfully activated", class: " is-info"})
                } else if (res.status === 401) {
                    res.json().then((json) => {
                        this.setState({message: json.err, class: " is-danger"})
                    })
                }
            });
        setTimeout(() => {
            this.props.history.push('/');
        }, 2000)
    }
    snack () {
        return (
            <div id="snackbar" className="snackbar valid-email">
                <article className={"message  " + this.state.class}>
                    <div className="message-body">
                        <p>{this.state.message}</p>
                    </div>
                </article>
            </div>
        )
    }
    render () {
        return (
            <React.Fragment>
                {this.snack()}
            </React.Fragment>
        )
    }
}

export default withRouter(connect()(ValidEmail))
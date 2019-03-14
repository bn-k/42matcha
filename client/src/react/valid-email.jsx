import React, {Component} from 'react';

function getJsonFromUrl(url) {
    if(!url) url = location.search;
    var query = url.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

class ValidEmail extends Component {
    get () {
        const url = getJsonFromUrl(this.props.location.search);
        fetch('/auth/valid_email/' + url.token)
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    res.json().then((json) => {
                        return (
                            <div id="snackbar" className="snackbar">
                                <article className={"message is-info "}>
                                    <div className="message-body">
                                        <p>{json.status}</p>
                                    </div>
                                </article>
                            </div>
                        )
                    })
                } else if (res.status == 401) {
                    res.json().then((json) => {
                        conso
                        return (
                            <div id="snackbar" className="snackbar">
                                <article className={"message is-danger "}>
                                    <div className="message-body">
                                        <p>{json.err}</p>
                                    </div>
                                </article>
                            </div>
                        )
                    })
                }
            })
    }
    constructor (props) {
        super(props);
        this.state = {
        };
    }
    render () {
        return (
            <React.Fragment>
                {this.get()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
export default withRouter(connect(mapStateToProps)(ValidEmail))
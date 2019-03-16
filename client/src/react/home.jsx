import React from "react";

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            i : 0,
        };
    }
    age(iso)
    {
        const dateold = new Date(iso);
        const datenew = new Date();
        console.log(datenew, dateold);
        var ynew = datenew.getFullYear();
        var mnew = datenew.getMonth();
        var dnew = datenew.getDate();
        var yold = dateold.getFullYear();
        var mold = dateold.getMonth();
        var dold = dateold.getDate();
        var diff = ynew - yold;
        console.log("date: ", diff);
        if(mold > mnew) diff--;
        else
        {
            if(mold == mnew)
            {
                if(dold > dnew) diff--;
            }
        }
        return diff;
    }
    date() {
        const date = this.props.app.start.basic.dates[this.state.i];
        const age = this.age(date.birthday);
        return (
            <div>
                <p>{date.username}</p>
                <p>{age} years old</p>
                <p>{date.genre}</p>
                <img src={date.img1} alt=""/>
                <p>{date.biography}</p>
            </div>
        )
    }
    like(e) {
        e.preventDefault();
        this.setState({i : this.state.i+1})
    }
    dislike (e) {
        e.preventDefault();
        this.setState({i : this.state.i+1})
    }
    render () {
        return (
            <React.Fragment>
                <div className="hero-body is-success is-flex has-text-centered">
                    <div className="container date">
                        {this.date()}
                    </div>
                    <div className={"container"}>
                        <button className="button is-big is-rounded is-danger" onClick={e => this.like(e)}>
                            <span className={"icon"}><i className="fas fa-heart"></i></span>
                        </button>
                        <button className="button is-big is-rounded is-info">
                            <span className={"icon"} onClick={e => this.dislike(e)}><i className="fas fa-times"></i></span>
                        </button>
                    </div>
                </div>
                <div className="hero-foot has-text-centered">
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        app: state.app
    };
};

import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
export default withRouter(connect(mapStateToProps)(Home))

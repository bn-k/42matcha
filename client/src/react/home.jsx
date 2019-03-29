import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";

const getAge = (iso) =>  {
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
};

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            i : 0,
        };
    }
    date() {
        // const date;
        // const age = this.age(date.birthday);
        // return (
        //     <div>
        //         <p>{date.username}</p>
        //         <p>{age} years old</p>
        //         <p>{date.genre}</p>
        //         <img src={date.img1} alt=""/>
        //         <p>{date.biography}</p>
        //     </div>
        // )
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
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        home: state.home
    };
};

export default withRouter(connect(mapStateToProps)(Home))

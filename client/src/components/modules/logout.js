import React, {Component} from "react";

class Logout extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        localStorage.removeItem("uuid");
        this.props.history.push('login');
    }
    render () {
        return (
            <div></div>
        )
    }
}

export default Logout;
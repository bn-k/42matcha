import React from "react";

class Count extends React.Component {
    constructor () {
        super();
        this.state = {
            test: "test success",
            count: [],
        };
    }
    componentDidMount(){
        fetch('api/count')
            .then(results => {
                return results.json();
            }).then(data => {
                console.log(data);
            this.setState({count: data['count']});
        });
    }
    render () {
        return (
            <div>
                {this.state.test}
                {this.state.count}
            </div>
        )
    }
}

const User = () => {
    return (
        <div>
            <h1>User</h1>
            <Count/>
        </div>
    )
};

export default User;

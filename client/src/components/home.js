import React from "react";

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            test: "test",
            next: [],
        };
    }
    componentDidMount(){
        fetch('api/curr')
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({next: data});
            console.log(this.state.next)
        });
    }
    next () {
        fetch('api/next')
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({next: data});
            console.log(this.state.next)
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
            <div>
                <h3>{this.state.next['name']}</h3>
                <img src="https://picsum.photos/200/300" alt=""/>
                <button onClick={() => this.next()}>love</button>
                <button onClick={() => this.next()}>f***</button>
            </div>
        )
    }
}

export default Home;

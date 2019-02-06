import React, { Component } from "react";

class Login extends Component {
    constructor (props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
        };
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }
    change (e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    submit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        fetch('/auth/login', {
            method: 'POST',
            body: formData,
        }).then(results => {
                return results.json();
            }).then(data => {
            console.log(data['status']);
            localStorage.setItem("uuid", data['token']);
            this.props.history.push('/home');
        });
    }
    render () {
        return (
            <div>
                <form onSubmit={e => this.submit(e)}>
                    <label>Username</label><input type="text" name="username" onChange={e => this.change(e)} value={this.state.username}/>
                    <label>Email</label><input type="text" name="email" onChange={e => this.change(e)} value={this.state.email}/>
                    <label>Password</label><input type="password" name="password" onChange={e => this.change(e)} value={this.state.password}/>
                    <button>submit</button>
                </form>
            </div>
        )
    }

}

export default Login;

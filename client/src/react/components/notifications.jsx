import React from "react";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux";
import {
    Button,
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Responsive,
    Visibility, Popup,
} from 'semantic-ui-react'
import env from "../../env";

const Notification = (props) => (
    <Grid.Row>
        <Grid columns={2}>
            <Grid.Column width={13}>
                <Header as='h4'>
                    {props.notif.message}
                </Header>
            </Grid.Column>
            <Grid.Column width={3} textAlign='center'>
                <Button onClick={e => props.deleteMe(props.notif.id, e)}><Icon color={"teal"} name={"delete"}/></Button>
            </Grid.Column>
        </Grid>
    </Grid.Row>
);

const notificationsHistory = (id) => {
    let init = {
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': localStorage.getItem('jwt'),
        }
    };
    fetch(env.api + '/notifications/history/' + id, init)
        .then(res => {
            if (res.status === 200) {
                res.json().then(json => {
                    console.log("N History ====>", json)

                })
            }
        })
};

class Notifications extends React.Component {
    constructor (props) {
        console.log(notificationsHistory(props.login.id));
        const socket = new WebSocket("ws://localhost:8181/api/notifications/websocket/" + props.login.id);
        socket.onopen = (event) => {
            socket.onmessage = ({data}) => {
                data = JSON.parse(data);
                console.log("New Notification:", data);
                this.setState({tab: [
                        {
                            id: data.id,
                            author: data.author_id,
                            message: data.message,
                            subject: data.subject_id,
                        },
                        ...this.state.tab,
                    ]
                });
            };
        };
        super(props);
        this.state = {
            tab: [
                {
                    id: 8888888,
                    author: 23,
                    message: "You have a new match with Elza",
                    link: "/user",
                    subject: "fasdf",
                }
            ],
        };
        this.deleteMe = this.deleteMe.bind(this);
    }
    deleteMe = (id, e) => {
        e.preventDefault();
        console.log(id);
        this.setState({tab: this.state.tab.filter((obj) => {
                return obj.id !== id
            })})
    };
    render () {
        return (
            <Popup
                on={['click']}
                trigger={<Menu.Item header><Icon color={this.state.tab.length === 0 ? "black" : "red"} name='bell'/></Menu.Item>}
                position='bottom right'
                flowing
            >
                <Grid centered divided columns={1}>
                    <Container>
                        {this.state.tab.map((n, i) => (
                            <Notification deleteMe={this.deleteMe} key={i} notif={n} {...this.props}/>
                        ))}
                    </Container>
                </Grid>
            </Popup>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        people: state.people,
    };
};

export default withRouter(connect(mapStateToProps)(Notifications))

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
                <Button
                    circular
                    icon
                    negative
                    onClick={e => props.deleteMe(props.notif.id, e)}
                >
                    <Icon name={"delete"}/>
                </Button>
            </Grid.Column>
        </Grid>
        <Divider/>
    </Grid.Row>
);


const timeoutLength = 5500;
class Notifications extends React.Component {
    constructor (props) {
        const socket = new WebSocket("ws://localhost:8181/api/notifications/websocket/" + props.login.id);
        socket.onopen = (event) => {
            socket.onmessage = ({data}) => {
                data = JSON.parse(data);
                this.setState({
                    isOpen: false,
                    tab: [
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
        let init = {
            method: 'GET',
            headers:{
                'Authorization': localStorage.getItem('jwt'),
            }
        };
        fetch(env.api + '/notifications/history/' + props.login.id, init)
            .then(res => {
                if (res.status === 201) {
                } else if (res.status === 202) {
                } else if (res.status === 203) {
                } else if (res.status === 204) {
                } else if (res.status === 200) {
                    res.json().then(json => {
                        let tab = [];
                        json.map(notif => {
                            tab.push(
                                {
                                    id: notif.id,
                                    author: notif.author_id,
                                    message: notif.message,
                                    subject: notif.subject_id,
                                },
                            );
                            this.setState({tab: tab})
                        })
                    })
                }
            });
        super(props);
        this.state = {
            tab: [],
            socket : socket,
        };
        this.deleteMe = this.deleteMe.bind(this);
    }
    componentWillUnmount() {
        if(this.state.socket) {
            this.state.socket.close()
        }
    }

    deleteMe = (id, e) => {
        e.preventDefault();
        if (this.state.tab.length < 2 ) {
            this.setState({isOpen: false})
        }
        this.setState({tab: this.state.tab.filter((obj) => {
                return obj.id !== id
            })});
        fetch(env.api + '/notifications/' + id, {method:"DELETE"})
    };
    handleOpen = () => {
        if (this.state.tab.length > 0 ) {
            this.setState({ isOpen: true });
        }
    };
    handleClose = () => {
        this.setState({ isOpen: false })
        clearTimeout(this.timeout)
    };
    render () {
        return (
            <Popup
                on='click'
                open={this.state.isOpen}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
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

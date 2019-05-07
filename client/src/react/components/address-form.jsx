import React, {Component} from 'react'
import {Button, Container, Divider, Grid, Input, Message} from "semantic-ui-react";
import Mapp from "./map";
import env from "../../env";

const joinPlus = (s1, s2) => {
    if (s1 === '') {
       return s2
    } else if (s2 === '') {
        return s1
    } else {
        return  s1 + "+" + s2
    }
};

const joinAll = (tab) => {
    let s = "";
    tab.map(str => {
        s = joinPlus(s, str)
    });
    return s
};

export default class AddressForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            show: false,
            lat: 0,
            lng: 0,
            api_id: "",
            api_code: "",
            error: false,
            errMessage: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.geocoder = this.geocoder.bind(this);
        this.returnError = this.returnError.bind(this);
    }
    componentDidMount() {
        fetch(env.api + '/kwal').then(res => {
            res.json().then(json => {
                if (json) {
                json.map(a => {
                    this.setState({[a.name]: [a.value][0]});
                });
                }
            });
        });
    }
    handleChange = (e, data) => {
        this.setState({[data.name]: data.value})
    };
    handleError (error) {
        this.setState({error: true, errMessage: error});
        setTimeout(() => {
            this.setState({error: false, errMessage: ""})
        }, 2000)
    }
    returnError () {
       if (this.state.error) {
          return (
              <Message color={'yellow'}>{this.state.errMessage}</Message>
          )
       } else {return (null)}
    }
    geocoder() {
        const api = 'https://geocoder.api.here.com/6.2/geocode.json' +
            '?app_id=EezmdtOLkZ5krcljUzoQ' +
            '&app_code=GC4SmycFgOh8QsjPO_ytYQ' +
            '&searchtext=';
        const arr = [
            this.state.street.split(' ').join('+'),
            this.state.city.split(' ').join('+'),
            this.state.state.split(' ').join('+'),
            this.state.zip.split(' ').join('+'),
            this.state.country.split(' ').join('+')
        ];
        const data = joinAll(arr);
        if (data.length == 0) {
            this.handleError("Please fill the form")
        } else {
            const url = api + data;
            fetch(url).then(res => {
                if (res.status == 200) {
                    res.json().then(json => {
                        if (json.Response.View.length > 0) {
                            const pos = json.Response.View[0].Result[0].Location.DisplayPosition;
                            this.setState({
                                show: true,
                                lat: pos.Latitude,
                                lng: pos.Longitude
                            });
                            const ret = {name: "position", value: pos};
                            this.props.hc("", ret);
                        } else {
                            this.handleError("Sorry but we can't find your address")
                        }
                    })
                } else {
                    this.handleError("Sorry but we can't find your address")
                }
            })
        }
    }
    render () {
        return (
            <Container>
                <Grid key={"form"}>
                    {this.state.show ?
                        <Grid.Column mobile={16} tablet={5} computer={5}>
                            <Mapp lng={this.state.lng} lat={this.state.lat}/>
                        </Grid.Column>
                        : <></> }
                    <Grid.Column mobile={16} tablet={6} computer={6}>
                        <Grid.Row><Input label={"Street Address"} fluid key={1} type={'text'} onChange={this.handleChange} name={"street"} value={this.state.street}/></Grid.Row>
                        <Grid.Row><Input label={"City"} fluid key={1} type={'text'} onChange={this.handleChange} name={"city"} value={this.state.city}/></Grid.Row>
                        <Grid.Row><Input label={"State"} fluid key={1} type={'text'} onChange={this.handleChange} name={"state"} value={this.state.state}/></Grid.Row>
                        <Grid.Row><Input label={"Zip"} fluid key={1} type={'text'} onChange={this.handleChange} name={"zip"} value={this.state.zip}/></Grid.Row>
                        <Grid.Row><Input label={"Country"} fluid key={1} type={'text'} onChange={this.handleChange} name={"country"} value={this.state.country}/></Grid.Row>
                        <Divider/>
                        <Grid.Row><Button fluid onClick={this.geocoder}>Fetch</Button></Grid.Row>
                        <Divider/>
                        <>
                        {this.returnError()}
                        </>
                    </Grid.Column>
                </Grid>

            </Container>
        )
    }
}


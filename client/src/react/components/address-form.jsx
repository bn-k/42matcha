import React, {Component} from 'react'
import {Button, Container, Divider, Grid, Input} from "semantic-ui-react";
import Mapp from "./map";

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
        };
        this.handleChange = this.handleChange.bind(this);
        this.geocoder = this.geocoder.bind(this);
    }
    handleChange = (e, data) => {
        this.setState({[data.name]: data.value})
    };
    geocoder() {
        const url = 'https://geocoder.api.here.com/6.2/geocode.json' +
            '?app_id=EezmdtOLkZ5krcljUzoQ' +
            '&app_code=GC4SmycFgOh8QsjPO_ytYQ' +
            '&searchtext=' +
            this.state.street.split(' ').join('+') + '+' +
            this.state.city.split(' ').join('+') + '+' +
            this.state.state.split(' ').join('+') + '+' +
            this.state.zip.split(' ').join('+') + '+' +
            this.state.country.split(' ').join('+') + '+';
        fetch(url).then(res => {
            if (res.status == 200) {
                console.log("URL ========> ",url);
                res.json().then(json => {
                    console.log("Json => ", json);
                    if (json.Response.View.length > 0) {
                        const pos = json.Response.View[0].Result[0].Location.DisplayPosition;
                        this.setState({
                            show: true,
                            lat: pos.Latitude,
                            lng: pos.Longitude
                        });
                    } else {
                        console.log("URL ========> ",url);
                        console.log("MAKE ALERTE BAD REQUEST")
                    }
                })
            } else {
                console.log("URL ========> ",url);
                console.log("MAKE ALERTE BAD REQUEST")
            }
        })
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
                    </Grid.Column>
                </Grid>

            </Container>
        )
    }
}


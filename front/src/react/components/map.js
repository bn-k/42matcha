import React from 'react'
import {Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default class Mapp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: props.lat,
            lng: props.lng,
            zoom: 13
        }
    }

    render() {
        const position = [this.props.lat, this.props.lng];
        return (
            <Map  style={{witdth: "auto", height: "50vh"}}center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>
            </Map>
        );
    }
}

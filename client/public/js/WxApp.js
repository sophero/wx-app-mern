import React, { Component } from 'react';
import Geolocate from './Geolocate';
import CurrentWx from './CurrentWx';
import InputLocation from './InputLocation';

class WxApp extends Component {
    constructor() {
        super();
        this.state = {
            lat: null,
            lng: null,
            address: ""
        }
        this.setCoords = this.setCoords.bind(this);
    }

    render() {
        let currentWx;
        if (this.state.lat && this.state.lng) {
            currentWx =
                <CurrentWx
                    lat={this.state.lat}
                    lng={this.state.lng}
                    address={this.state.address}
                />
        }
        return(
            <div>
                <Geolocate setCoords={this.setCoords} />
                <InputLocation setCoords={this.setCoords} />
                {currentWx}
                <div>
                    Lat: {this.state.lat}
                </div>
                <div>
                    Lng: {this.state.lng}
                </div>
            </div>
        )
    }

    setCoords(props) {
        this.setState({
            lat: props.lat,
            lng: props.lng,
            address: props.address
        });
    }

}

export default WxApp;

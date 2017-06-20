import React, { Component } from 'react';
import axios from 'axios';
import Geolocate from './Geolocate';
import CurrentWx from './CurrentWx';

class WxApp extends Component {
    constructor() {
        super();
        this.state = {
            lat: null,
            lng: null
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
                />
        }
        return(
            <div>
                 <Geolocate setCoords={this.setCoords} />
                 <div>
                     Current coordinates:
                     Lat: {this.state.lat}
                     Lng: {this.state.lng}
                 </div>
                 {currentWx}
             </div>
        )
    }

    setCoords(props) {
        this.setState({
            lat: props.lat,
            lng: props.lng
        });
    }

}

export default WxApp;

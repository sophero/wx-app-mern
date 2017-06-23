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
            myLocLat: null,
            myLocLng: null,
            address: ""
        }
        this.setCoords = this.setCoords.bind(this);
    }

    render() {
        let currentWx;
        if (this.state.lat && this.state.lng) {
            var lat = Math.round(this.state.lat * 1000000) / 1000000;
            var lng = Math.round(this.state.lng * 1000000) / 1000000;
            if (this.state.myLocLat && this.state.myLocLng) {
                currentWx =
                    <CurrentWx
                        lat={this.state.lat}
                        lng={this.state.lng}
                        address={this.state.address}
                    />
            } else {
                currentWx =
                    <CurrentWx
                        lat={this.state.lat}
                        lng={this.state.lng}
                        address={this.state.address}
                    />
            }

        }
        return(
            <div>
                <Geolocate
                    setCoords={this.setCoords}
                    setMyLocCoords={this.setMyLocCoords}
                />
                <InputLocation setCoords={this.setCoords} />
                {currentWx}
                <div>
                    Lat: {lat}
                </div>
                <div>
                    Lng: {lng}
                </div>
                <div>
                    <a href="https://darksky.net/poweredby/" target="_blank">
                        <div style={{
                            backgroundImage: "url('https://darksky.net/dev/img/attribution/poweredby.png')",
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            width: 100,
                            height: 40
                        }}></div>
                    </a>
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

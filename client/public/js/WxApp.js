import React, { Component } from 'react';
// import axios from 'axios';
import Geolocate from './Geolocate';
// import CurrentWx from './CurrentWx';

class WxApp extends Component {
    constructor() {
        super();
        this.state = {
            lat: null,
            lng: null
        }
        this.setCoords = this.setCoords.bind(this);
        // this.getCurWx = this.getCurWx.bind(this);
    }

    render() {
        let currentWx;
        if (this.state.wx) {
            currentWx = <CurrentWx wx={this.state.wx} />
        }
        return(
            <div>
                 <h1> Still working...</h1>
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
        // }, this.getCurWx());
    }

    // getCurWx() {
    //     let url = `https://api.darksky.net/forecast/${darkSkyApiKey}/${this.state.lat},${this.state.lng}`;
    //
    //     axios.get(url).then((response) => {
    //         var cur = response.data.currently;
    //         this.setState({
    //             wx: {
    //                 temp: cur.temperature,
    //                 dewPoint: cur.dewPoint,
    //                 pressure: cur.pressure,
    //                 windBearing: cur.windBearing,
    //                 windSpeed: cur.windSpeed
    //             }
    //         });
    //     });
    // }
}

export default WxApp;

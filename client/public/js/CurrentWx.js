import React, { Component } from 'react';
import axios from 'axios';

class CurrentWx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: props.lat,
            lng: props.lng,
            address: props.address,
            wx: null
        }
        this.getCurWx = this.getCurWx.bind(this);
        this.windDirection = this.windDirection.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            lat: nextProps.lat,
            lng: nextProps.lng,
            address: nextProps.address
        }, this.getCurWx);
    }

    componentDidMount() {
        if (this.state.lat && this.state.lng) {
            this.getCurWx();
        }
    }

    render() {
        if (this.state.wx) {
            let windStr = this.windDirection(this.state.wx.windBearing);
            let tempC = this.fahrenheitToCelsius(this.state.wx.temp);
            let dewPointC = this.fahrenheitToCelsius(this.state.wx.dewPoint);
            let kph = this.mphToKph(this.state.wx.windSpeed);
            let knots = this.mphToKnots(this.state.wx.windSpeed);

            return(
                <div>
                    <h2>Current weather data</h2>
                    <div>Location: {this.state.address}</div>
                    <div>Temperature: {this.state.wx.temp} °F; {tempC} °C</div>
                    <div>Dewpoint: {this.state.wx.dewPoint} °F; {dewPointC} °C</div>
                    <div>MSLP: {this.state.wx.pressure} hPa</div>
                    <div>Wind direction: {windStr} {this.state.wx.windBearing}°</div>
                    <div>Wind speed: {knots} knots; {this.state.wx.windSpeed} mph; {kph} kph</div>
                </div>
            );
        } else {
            return( null );
        }

    }

    getCurWx() {
        axios
            .get(`/api/wx/${this.state.lat}/${this.state.lng}`)
            .then((response) => {
                this.setState({
                    wx: response.data.currentWx
                });
            });
    }

    fahrenheitToCelsius(f) {
        let c = (f - 32) * 5 / 9
        return (Math.round(c * 100) / 100);
    }

    windDirection(b) {
        let strArray = [
            "N",
            "NNW",
            "NW",
            "WNW",
            "W",
            "WSW",
            "SW",
            "SSW",
            "S",
            "ESE",
            "SE",
            "ESE",
            "E",
            "ENE",
            "NE",
            "NNE",
            "N"
        ];
        for (let k = 0; k < 17; k++) {
            let dir = 360 - (360 / 32) - k * (360 / 16);
            if (b > dir) {
                return strArray[k];
            }
        }
    }

    mphToKph(mph) {
        let kph = mph * 1.609344;
        return (Math.round(kph * 100) / 100);
    }

    mphToKnots(mph) {
        let knots = mph * 0.868976;
        return (Math.round(knots * 100) / 100);
    }

}

export default CurrentWx;

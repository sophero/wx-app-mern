import React, { Component } from 'react';
import axios from 'axios';
// import GIFParser from 'gifparser';
// const GIFEncoder = require('gif-enconder');

class CurrentWx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: props.lat,
            lng: props.lng,
            address: props.address,
            locTime: null,
            sunrise: null,
            sunset: null,
            timezoneName: null,
            wx: null
        }
        this.getCurWx = this.getCurWx.bind(this);
        this.getSunTime = this.getSunTime.bind(this);
        this.windDirection = this.windDirection.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            lat: nextProps.lat,
            lng: nextProps.lng,
            address: nextProps.address,
            myLocLat: nextProps.myLocLat,
            myLocLng: nextProps.myLogLng
        }, this.getCurWx);
    }

    componentDidMount() {
        if (this.state.lat && this.state.lng) {
            this.getCurWx();
        }
    }

    render() {
        console.log(this.state);
        if (this.state.wx) {
            let windStr = this.windDirection(this.state.wx.windBearing);
            let tempC = this.fahrenheitToCelsius(this.state.wx.temp);
            let dewPointC = this.fahrenheitToCelsius(this.state.wx.dewPoint);
            let kph = this.mphToKph(this.state.wx.windSpeed);
            let knots = this.mphToKnots(this.state.wx.windSpeed);
            let locTimes;

            if (this.state.sunrise && this.state.sunset && this.state.timezoneName && this.state.locTime) {
                locTimes =
                <div>
                    <div>As at {this.parseTime(this.state.locTime)} {this.state.timezoneName}</div>
                    <div>Sunrise: {this.parseTime(this.state.sunrise)}</div>
                    <div>Sunset: {this.parseTime(this.state.sunset)}</div>
                </div>
            }

            return(
                <div>
                    <h2>Location: {this.state.address}</h2>
                    {locTimes}
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

    // getRadar() {
    //     let { lat, lng } = this.state;
    //     axios.get(`/api/radar/${lat}/${lng}`).then((res) => {
    //         // let gifParser = new GIFParser()
    //         // console.log(res.data);
    //         // let parsedGIF = gifParser.parseFromArrayBuffer(res.data);
    //         // console.log(parsedGIF);
    //         // let gif = new GIFEncoder(300, 300);
    //         //
    //         // gif.addFrame(res.data);
    //         // gif.writeImageInfo();
    //         // gif.outputImage();
    //         // this.setState({
    //         //     radar: gif
    //         // });
    //     });
    // }

    getCurWx() {
        let { lat, lng } = this.state;
        axios.get(`/api/wx/${lat}/${lng}`).then((wxRes) => {
            this.setState({ wx: wxRes.data.curWx });

            let { sunrise, sunset, curTime } = wxRes.data;
            [sunrise, sunset, curTime].forEach(function(secs) {
                let d = new Date(secs * 1000);
                console.log(d.toString());
            });
            this.getSunTime(sunrise, sunset, curTime);
            // this.getRadar();
        });
    }

    getSunTime(sunrise, sunset, curTime) {

        let { lat, lng } = this.state;
        axios.get(`/api/timezone_offset/${lat}/${lng}/${curTime}`).then((res) => {
            let d = new Date();
            // obtaining user's timezone offset from date string
            let userOffset = parseInt(d.toString().split(' ')[5].substr(3), 10);
            userOffset *= 36; // converting from 0400 hrmin format to seconds

            // You always forget .data after your response variable!!!!
            let adjustment = res.data.offset - userOffset;

            let locTime = curTime + adjustment;
            let locSunrise = sunrise + adjustment;
            let locSunset = sunset + adjustment;

            [adjustment, locTime, locSunrise, locSunset].forEach(function(secs) {
                let d = new Date(secs * 1000);
                console.log(d.toString());
            });

            this.setState({
                locTime: locTime,
                timezoneName: res.data.timezoneName,
                sunrise: locSunrise,
                sunset: locSunset
            });

        });
    }

    fahrenheitToCelsius(f) {
        let c = (f - 32) * 5 / 9;
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

    parseTime(secs) {
        let d = new Date(secs * 1000);
        let hrs = d.getHours().toString();
        let mins = d.getMinutes();
        if (mins < 10) {
            mins = "0" + mins.toString();
        }
        return hrs + ":" + mins;
    }

}

export default CurrentWx;

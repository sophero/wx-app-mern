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
            let latLngDisplay;
            let containerStyles = {
                margin: "10px auto",
                textAlign: "center"
                // display: "flex",
                // justifyContent: "center",
                // flexWrap: "wrap"
            }
            if (this.state.lat && this.state.lng) {
                latLngDisplay =
                    <div>
                        <div>
                            Lat: {this.round(this.state.lat, 4)};
                            Lng: {this.round(this.state.lng, 4)}
                        </div>
                    </div>
            }
            if (this.state.sunrise && this.state.sunset && this.state.timezoneName && this.state.locTime) {
                locTimes =
                <div>
                    <div>At {this.parseTime(this.state.locTime)} {this.state.timezoneName}</div>
                    <div>
                        Local sunrise: {this.parseTime(this.state.sunrise)};
                        sunset: {this.parseTime(this.state.sunset)}
                    </div>
                </div>
            }


            return(
                <div>
                    <h1 style={{
                        textAlign: "center",
                        fontSize: "2.4em",
                        color: "#bbd9d0"
                    }}>
                        {this.state.address}
                    </h1>
                    <div style={containerStyles}>
                        {latLngDisplay}
                        {locTimes}
                        <div className="cur-wx-display">
                            <div className="cur-wx-display-elem">
                                Temperature:
                            </div>
                            <div className="cur-wx-display-elem emph">
                                {this.round(this.state.wx.temp, 1)} °F
                            </div>
                            <div className="cur-wx-display-elem emph">
                                {this.round(tempC, 1)} °C
                            </div>
                        </div>
                        <div className="cur-wx-display">
                            <div className="cur-wx-display-elem">
                                Dewpoint:
                            </div>
                            <div className="cur-wx-display-elem emph">
                                {this.round(this.state.wx.dewPoint, 1)} °F
                            </div>
                            <div className="cur-wx-display-elem emph">
                                {this.round(dewPointC, 1)} °C
                            </div>
                        </div>
                        <div className="cur-wx-display">
                            <div className="cur-wx-display-elem">
                                Wind speed:
                            </div>
                            <div className="cur-wx-display-elem">
                                {this.round(knots, 1)} knots
                            </div>
                            <div className="cur-wx-display-elem">
                                {this.round(this.state.wx.windSpeed, 1)} mph
                            </div>
                            <div className="cur-wx-display-elem">
                                {this.round(kph, 1)} kph
                            </div>
                        </div>
                        <div className="cur-wx-display">
                            <div className="cur-wx-display-elem">
                                Wind direction:
                            </div>
                            <div className="cur-wx-display-elem emph">
                                {windStr}
                            </div>
                            <div className="cur-wx-display-elem emph">
                                {this.state.wx.windBearing}°
                            </div>
                        </div>
                        <div className="cur-wx-display">
                            <div className="cur-wx-display-elem">
                                MSLP:
                            </div>
                            <div className="cur-wx-display-elem">
                                {this.round(this.state.wx.pressure, 1)} hPa
                            </div>
                        </div>
                    </div>
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

    round(num, places) {
        let val = 1;
        for (let k = 0; k < places; k++) {
            val *= 10;
        }
        return Math.round(num * val) / val;
    }

}

export default CurrentWx;

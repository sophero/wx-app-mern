import React, { Component } from 'react';
import axios from 'axios';

class CurrentWx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: props.lat,
            lng: props.lng,
            address: props.address,
            sunrise: null,
            sunset: null,
            timezoneName: null,
            timezoneTime: null,
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
            let sunTimes;

            if (this.state.sunrise && this.state.sunset) {
                sunTimes =
                <div>
                    <div>Sunrise: {this.parseTime(this.state.sunrise)} {this.state.timezoneName}</div>
                    <div>Sunset: {this.parseTime(this.state.sunset)} {this.state.timezoneName}</div>
                </div>
            }

            return(
                <div>
                    <h2>Current weather data</h2>
                    <div>Location: {this.state.address}</div>
                    <div>Temperature: {this.state.wx.temp} °F; {tempC} °C</div>
                    <div>Dewpoint: {this.state.wx.dewPoint} °F; {dewPointC} °C</div>
                    <div>MSLP: {this.state.wx.pressure} hPa</div>
                    <div>Wind direction: {windStr} {this.state.wx.windBearing}°</div>
                    <div>Wind speed: {knots} knots; {this.state.wx.windSpeed} mph; {kph} kph</div>
                    {sunTimes}
                </div>
            );
        } else {
            return( null );
        }

    }

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
        });
    }

    getSunTime(sunrise, sunset, curTime) {

        let { lat, lng } = this.state;
        axios.get(`/api/timezone_offset/${lat}/${lng}/${curTime}`).then((res) => {
            // adjustLocalTime(curTime, res.offset, res.sunrise, res.sunset);
            console.log(res);
            let d = new Date();
            // obtaining user's timezone offset from date string
            let userOffset = parseInt(d.toString().split(' ')[5].substr(3), 10);
            console.log('useroffset', userOffset);
            userOffset *= 36; // converting from 0400 hrmin time to seconds

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

    adjustLocalTime(userCurTime, locOffset, locSunrise, locSunset) {
        // let d = new Date();
        // // obtaining user's timezone offset from date string, converting to seconds
        // let userOffset = parseInt(d.toString().split(' ')[5].substr(3), 10);
        // userOffset *= 3600;
        // let adjustment = locOffset - userOffset;
        //
        // let locTime = userCurTime + adjustment;
        // locSunrise += adjustment;
        // locSunset += adjustment;
        // this.setState({
        //     locTime: locTime,
        //     sunrise: locSunrise,
        //     sunset: locSunset
        // });
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
        let mins = d.getMinutes().toString();
        if (mins < 10) {
            mins += "0";
        }
        return hrs + ":" + mins;
    }

}

export default CurrentWx;

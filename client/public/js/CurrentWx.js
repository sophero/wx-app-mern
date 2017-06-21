import React, { Component } from 'react';
import axios from 'axios';

class CurrentWx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: props.lat,
            lng: props.lng
        }
        this.getCurWx = this.getCurWx.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            lat: nextProps.lat,
            lng: nextProps.lng
        });
    }

    componentDidMount() {
        if (this.state.lat && this.state.lng) {
            this.getCurWx();
        }
    }

    render() {
        if (this.state.wx) {
            return(
                <div>
                    <h2>Current weather data</h2>
                    <div>Temperature: {this.state.wx.temp}</div>
                    <div>Dewpoint: {this.state.wx.dewPoint}</div>
                    <div>MSLP: {this.state.wx.pressure}</div>
                    <div>Wind direction: {this.state.wx.windBearing}</div>
                    <div>Wind speed: {this.state.wx.windSpeed}</div>
                </div>
            );
        } else {
            return( null );
        }

    }

    getCurWx() {
        axios
            .get(`http://localhost:3000/api/wx/${this.state.lat}/${this.state.lng}`)
            .then((response) => {
                this.setState({
                    wx: response.data.currentWx
                });
            });
    }

}

export default CurrentWx;

import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';

class Geolocate extends Component {
    constructor(props){
        super(props);
        this.handleSetCoords = this.handleSetCoords.bind(this);
    }

    render() {
        if (!this.props.isGeolocationAvailable) {
            return (
                <div>Sorry, geolocation is unavailable.</div>
            );
        } else {
            if (!this.props.isGeolocationEnabled) {
                return(
                    <div>Geolocation might be disabled.</div>
                );
            } else {
                if (this.props.coords) {
                    // this.handleSetMyLocCoords();
                    let lat = Math.round(this.props.coords.latitude * 1000000) / 1000000;
                    let lng = Math.round(this.props.coords.longitude * 1000000) / 1000000;
                    return(
                        <div>
                            <h2>Your location</h2>
                            <div>Latitude: {lat}</div>
                            <div>Longitude: {lng}</div>
                            <button onClick={this.handleSetCoords}>Use this location</button>
                        </div>
                    );
                } else {
                    return(
                        <div>Fetching location data..</div>
                    );
                }

            }
        }
    }

    handleSetCoords() {
        this.props.setCoords({
            lat: this.props.coords.latitude,
            lng: this.props.coords.longitude,
            address: "Your location"
        });
    }

}

export default geolocated({
    positionOptions: { enableHighAccuracy: false },
    userDecisionTimeout: 9000
})(Geolocate);

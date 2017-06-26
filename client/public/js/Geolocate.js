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
                    let lat = Math.round(this.props.coords.latitude * 10000) / 10000;
                    let lng = Math.round(this.props.coords.longitude * 10000) / 10000;
                    return(
                        <div>
                            <p style={{
                                fontSize: "1.2em",
                                margin: "0 0 15px 0",
                                padding: "0"
                            }}>or use your location:</p>
                            <div style={{
                                fontSize: "0.9em"
                            }}>
                                <div>Latitude: <span style={{ fontWeight: "bold", fontSize: "1.3em" }}>{lat}</span></div>
                                <div>Longitude: <span style={{ fontWeight: "bold", fontSize: "1.3em" }}>{lng}</span></div>
                            </div>
                            <button className="btn" style={{
                                width: "150px",
                                marginTop: "15px"
                            }} onClick={this.handleSetCoords}>Use your location</button>
                        </div>
                    );
                } else {
                    return(
                        <div
                            style={{
                                padding: "10px"
                            }}>Fetching location data..</div>
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

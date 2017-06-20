import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';

class Geolocate extends Component {
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <div>
              <table>
                <tbody>
                  <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
                  <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
                </tbody>
              </table>
              <button onClick={() => this.handleSetCoords()}>Use this location</button>
            </div>
          : <div>Getting the location data&hellip; </div>;
  }

  handleSetCoords() {
      this.props.setCoords({
          lat: this.props.coords.latitude,
          lng: this.props.coords.longitude
      });
  }

}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000
})(Geolocate);

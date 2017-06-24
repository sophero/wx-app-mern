import React, { Component } from 'react';
import axios from 'axios';

class InputLocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMsg: "",
            inputAddress: "Philadelphia, PA",
            address: "",
            lat: null,
            lng: null
        }
        this.updateInputAddress = this.updateInputAddress.bind(this);
        this.getCoords = this.getCoords.bind(this);
        this.handleSetCoords = this.handleSetCoords.bind(this);
    }

    render() {
        return(
            <div>
                <p>Enter address / location:</p>
                <input
                    type="text"
                    onChange={this.updateInputAddress}
                    value={this.state.inputAddress}
                    placeholder="Enter address/location"
                />
                <button onClick={this.getCoords}>Enter</button>
                <div>{this.state.errorMsg}</div>
            </div>
        );
    }

    updateInputAddress(event) {
        this.setState({ inputAddress: event.target.value });
    }

    getCoords() {
        let encodedAddress = encodeURIComponent(this.state.inputAddress);
        let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

        axios.get(geocodeUrl).then((response) => {
            if (response.data.status === 'ZERO_RESULTS') {
                // this.setState({ errorMsg: 'Unable to find address.' });
                throw new Error('Unable to find address.');
            }

            let { location } = response.data.results[0].geometry;
            console.log(location);
            console.log(response.data.results[0].formatted_address);
            this.setState({
                errorMsg: "",
                lat: location.lat,
                lng: location.lng,
                address: response.data.results[0].formatted_address
            },
            this.handleSetCoords);

        }).catch((error) => {
            if (error.code === 'ENOTFOUND') {
                this.setState({ errorMsg: 'Unable to connect to API servers.' });
            } else {
                this.setState({ errorMsg: error.message })
            }
        });
    }

    handleSetCoords() {
        this.props.setCoords({
            lat: this.state.lat,
            lng: this.state.lng,
            address: this.state.address
        });
    }
}

export default InputLocation;

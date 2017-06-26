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
        this.selectAll = this.selectAll.bind(this);
    }

    render() {
        return(
            <div>
                <p style={{
                    fontSize: "1.3em"
                }}>Enter address / location:</p>
                <input
                    type="text"
                    onClick={this.selectAll}
                    onChange={this.updateInputAddress}
                    value={this.state.inputAddress}
                    placeholder="Enter address/location"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "#e0e0e0",
                        fontSize: "1.3em",
                        fontFamily: "verdana",
                        width: "300px",
                        height: "40px",
                        textAlign: "center",
                        padding: "12px 5px",
                        border: "1px solid #bbd9d0",
                        borderRadius: "4px",
                        margin: "0 0 5px 0"
                    }}
                />
                <div>{this.state.errorMsg}</div>
                <button onClick={this.getCoords} className="btn">Enter</button>
            </div>
        );
    }

    selectAll(event) {
        return event.target.select();
    }

    updateInputAddress(event) {
        this.setState({ inputAddress: event.target.value });
    }

    getCoords() {
        let encodedAddress = encodeURIComponent(this.state.inputAddress);
        if (encodedAddress === "") {
            return;
        }
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

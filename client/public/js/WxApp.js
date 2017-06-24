import React, { Component } from 'react';
import Geolocate from './Geolocate';
import CurrentWx from './CurrentWx';
import InputLocation from './InputLocation';

class WxApp extends Component {
    constructor() {
        super();
        this.state = {
            lat: null,
            lng: null,
            address: "",
            locChosen: false
        }
        this.setCoords = this.setCoords.bind(this);
    }

    render() {
        let currentWx;
        let latLngDisplay;
        let locChosen;
        let chooseLocDivStyles;
        let overlay;

        let overlayStyle = {
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: "1"
        };

        let backgroundStyle = {
            color: "#fff",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: "0",
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Thai_rain_forest.jpg/1280px-Thai_rain_forest.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right"
        }

        if (this.state.lat && this.state.lng) {
            var lat = Math.round(this.state.lat * 1000000) / 1000000;
            var lng = Math.round(this.state.lng * 1000000) / 1000000;
            currentWx =
                <CurrentWx
                    lat={this.state.lat}
                    lng={this.state.lng}
                    address={this.state.address}
                />
            latLngDisplay =
                <div>
                    <div>
                        Lat: {lat}
                    </div>
                    <div>
                        Lng: {lng}
                    </div>
                </div>
            chooseLocDivStyles = {

            }
            overlayStyle.backgroundColor = "rgba(0, 0, 0, 0.6)";
            locChosen = true;
        } else {
            locChosen = false;
            overlayStyle.backgroundColor = "rgba(0, 0, 0, 0.2)";
            chooseLocDivStyles = {
                position: 'absolute',
		    	width: '80%',
		    	maxWidth: '600px',
                minWidth: '300px',
		    	height: '100%',
		    	maxHeight: '250px',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '2',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '10px'
            }
        }
        let inputLocation =
            <InputLocation
                setCoords={this.setCoords}
                locChosen={locChosen}
            />
        let geolocate =
            <Geolocate
                setCoords={this.setCoords}
                setMyLocCoords={this.setMyLocCoords}
                locChosen={locChosen}
            />

        return(
            <div style={backgroundStyle}>
                <div style={overlayStyle}>
                    <div style={chooseLocDivStyles}>
                        {geolocate}
                        {inputLocation}
                    </div>
                    {currentWx}
                    {latLngDisplay}
                    <div>
                        <a href="https://darksky.net/poweredby/" target="_blank">
                            <div style={{
                                backgroundImage: "url('https://darksky.net/dev/img/attribution/poweredby.png')",
                                backgroundPosition: 'center',
                                backgroundSize: 'contain',
                                width: 100,
                                height: 40
                            }}></div>
                        </a>
                    </div>
                    <div style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0"
                    }}>
                        <a href="https://commons.wikimedia.org/wiki/File:Thai_rain_forest.jpg" target="_blank" style={{
                            fontSize: "0.6em",
                            color: "#fff",
                            textDecoration: "none"
                        }}>
                            Background from Wikimedia Commons
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    setCoords(props) {
        this.setState({
            lat: props.lat,
            lng: props.lng,
            address: props.address,
            locChosen: true
        });
    }

}

export default WxApp;

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
        // #render variables
        let currentWx;
        let latLngDisplay;
        let locChosen;
        let chooseLocDivStyles;
        let chooseLocElementsStyle;
        let geolocateStyles;
        let inputLocationStyles;
        let darkSkyRef;
        let headerStyle;

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
            fontFamily: "Josefin Sans, sans-serif",
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
            var lat = Math.round(this.state.lat * 100000) / 100000;
            var lng = Math.round(this.state.lng * 100000) / 100000;
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
            darkSkyRef =
                <a href="https://darksky.net/poweredby/" target="_blank" style={{
                    position: "absolute",
                    right: "0",
                    top: "0"
                }}>
                    <div style={{
                        backgroundImage: "url('https://darksky.net/dev/img/attribution/poweredby-darkbackground.png')",
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        width: 120,
                        height: 48
                    }}></div>
                </a>
            chooseLocDivStyles = {
                display: "flex"
// #remember
            }
            overlayStyle.backgroundColor = "rgba(0, 0, 0, 0.5)";
            overlayStyle.animation = "darken 0.6s";

            headerStyle = {
                fontSize: "1.5em",
                margin: "6px 125px 10px 4px",
                color: "#bbd9d0",
                lineHeight: "1.5"
            }
            chooseLocElementsStyle = {
                width: "100vw"
            }
            locChosen = true;
        } else {
            locChosen = false;
            headerStyle = {
                fontSize: "1.5em",
                margin: "0 auto 20px auto",
                color: "#bbd9d0",
                lineHeight: "1.5"
            }
            overlayStyle.backgroundColor = "rgba(0, 0, 0, 0.2)";
            chooseLocDivStyles = {
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '2',
                width: '80%',
		    	maxWidth: '600px',
                minWidth: '300px',
                // height: '250px',
		    	minHeight: '200px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                borderRadius: '20px',
                textAlign: 'center',
                padding: '20px'
            }
        }
        let inputLocation =
            <InputLocation
                style={inputLocationStyles}
                setCoords={this.setCoords}
                locChosen={locChosen}
            />
        let geolocate =
            <Geolocate
                style={geolocateStyles}
                setCoords={this.setCoords}
                setMyLocCoords={this.setMyLocCoords}
                locChosen={locChosen}
            />

        // #return
        return(
            <div style={backgroundStyle}>
                <div style={overlayStyle}>
                    <div style={chooseLocDivStyles}>
                        <h1 style={headerStyle}>
                            Get current weather data anywhere on the planet.
                        </h1>
                        <div style={chooseLocElementsStyle}>
                            <div style={{
                                padding: "10px 0 5px 0",
                                width: "300px",
                                margin: "0 auto"
                            }}>{inputLocation}</div>
                            <div style={{
                                padding: "10px 0 5px 0",
                                width: "300px",
                                margin: "0 auto"
                            }}>{geolocate}</div>
                        </div>
                    </div>
                    {currentWx}
                    {latLngDisplay}
                    {darkSkyRef}
                    <div style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0"
                    }}>
                        <a href="https://commons.wikimedia.org/wiki/File:Thai_rain_forest.jpg" target="_blank" style={{
                            fontSize: "0.6em",
                            fontFamily: "sans-serif",
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

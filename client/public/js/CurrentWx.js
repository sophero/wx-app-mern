import React, { Component } from 'react';
import Geolocate from './Geolocate';

class CurrentWx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wx: props.wx
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ wx: nextProps.wx });
    }

    render() {
        return(
            <div>
                <div>Temperature: {this.state.wx.temp}</div>
                <div>Dewpoint: {this.state.wx.dewPoint}</div>
            </div>
        );
    }
}

export default CurrentWx;

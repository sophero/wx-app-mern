const mongoose = require('mongoose');
const Schema = mongoose.Schema;

RadarSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    time: Number,
    lat: Number,
    lng: Number
});

const Radar = mongoose.model('radar', RadarSchema);

module.exports = Radar;

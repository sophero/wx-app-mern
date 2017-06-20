const mongoose = require('mongoose');
const Schema = mongoose.Schema;

LocationSchema = new Schema({
    lat: Number,
    lng: Number,
    name: String
});

UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    locations: [LocationSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;

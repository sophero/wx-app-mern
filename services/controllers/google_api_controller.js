const axios = require('axios');
const googleMapsTimeZoneApiKey = process.env.GOOGLE_MAPS_TIME_ZONE_API_KEY;

module.exports = {

    timezoneOffset(req, res) {
        // time expected in SECONDS since midnight 1 January 1970
        let { lat, lng, time } = req.params;
        console.log(lat, lng, time);
        let url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${time}&key=${googleMapsTimeZoneApiKey}`
        axios.get(url).then((timeRes) => {
            console.log(timeRes);
            res.send({
                offset: parseInt(timeRes.data.dstOffset) + parseInt(timeRes.data.rawOffset),
                timezoneName: timeRes.data.timeZoneName
            });
        });
    }

};
